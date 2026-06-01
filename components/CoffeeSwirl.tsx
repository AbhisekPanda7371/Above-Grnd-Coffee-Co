"use client";
import React, { useEffect, useRef } from "react";

export default function CoffeeSwirl({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let rafId: number;
    let disposed = false;

    (async () => {
      const THREE = await import("three");
      if (disposed || !canvasRef.current) return;

      /* dimensions — wait one frame to ensure layout is settled */
      await new Promise(r => requestAnimationFrame(r));
      const parent = canvas.parentElement!;
      const rect   = parent.getBoundingClientRect();
      const W = rect.width  > 10 ? Math.round(rect.width)  : 560;
      const H = rect.height > 10 ? Math.round(rect.height) : 500;

      /* renderer */
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(W, H, false); /* false = don't set canvas CSS size */

      const scene  = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      /* ─── VERTEX ─── */
      const vert = `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position,1.0); }
      `;

      /* ─── FRAGMENT — dark espresso + cream swirl ─── */
      const frag = `
        precision highp float;
        varying vec2 vUv;
        uniform float uT;   /* time */
        uniform vec2  uRes;

        /* ── hash & smooth noise ── */
        vec2 hash2(vec2 p){
          p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
          return fract(sin(p)*43758.5453);
        }
        float noise(vec2 p){
          vec2 i=floor(p), f=fract(p);
          vec2 u=f*f*(3.0-2.0*f);
          return mix(mix(dot(hash2(i),            f-vec2(0,0)),
                         dot(hash2(i+vec2(1,0)),  f-vec2(1,0)),u.x),
                     mix(dot(hash2(i+vec2(0,1)),  f-vec2(0,1)),
                         dot(hash2(i+vec2(1,1)),  f-vec2(1,1)),u.x),u.y);
        }

        /* ── FBM 6 octaves ── */
        float fbm(vec2 p){
          float s=0.0,a=0.5;
          mat2 m=mat2(1.6,1.2,-1.2,1.6);
          for(int i=0;i<6;i++){ s+=a*noise(p); p=m*p; a*=0.5; }
          return s;
        }

        void main(){
          /* aspect-correct coords centred on 0 */
          float asp = uRes.x/uRes.y;
          vec2 uv = (vUv - 0.5) * vec2(asp, 1.0) * 1.8;

          float t = uT * 0.22;   /* visible speed */

          /* 3-layer domain warp */
          vec2 q = vec2( fbm(uv + vec2(0.0, 0.0) + t),
                         fbm(uv + vec2(5.2, 1.3) + t) );

          vec2 r = vec2( fbm(uv + 4.5*q + vec2(1.7, 9.2) + t*0.8),
                         fbm(uv + 4.5*q + vec2(8.3, 2.8) + t*0.8) );

          float f = fbm(uv + 4.0*r);

          /* sharpen contrast so dark/light are distinct */
          f = pow(clamp(f*1.4 - 0.1, 0.0, 1.0), 0.85);

          /* ── colour palette ── */
          /* 0 → near-black espresso,  1 → bright cream */
          vec3 col;
          col  = mix(vec3(0.06, 0.02, 0.004),   /* #0F0501 espresso     */
                     vec3(0.28, 0.10, 0.025),    /* #471A06 roast        */
                     smoothstep(0.0, 0.45, f));

          col  = mix(col,
                     vec3(0.62, 0.36, 0.10),     /* #9E5C1A caramel      */
                     smoothstep(0.35, 0.65, f));

          col  = mix(col,
                     vec3(0.94, 0.84, 0.66),     /* #F0D6A8 latte foam   */
                     smoothstep(0.55, 0.82, f));

          col  = mix(col,
                     vec3(0.99, 0.97, 0.93),     /* #FCF7ED bright cream */
                     smoothstep(0.78, 0.96, f));

          /* gold micro-glints */
          float g = smoothstep(0.90, 1.0, f);
          col = mix(col, vec3(0.79, 0.66, 0.30), g * 0.7);

          /* vignette — dark edges focus the eye centre */
          vec2 vig = vUv*2.0-1.0;
          float vg = 1.0 - dot(vig*vec2(0.5,0.6), vig*vec2(0.5,0.6));
          col *= clamp(vg * 1.25, 0.0, 1.0);

          gl_FragColor = vec4(col, 1.0);
        }
      `;

      const uniforms = {
        uT:   { value: 0.0 },
        uRes: { value: new THREE.Vector2(W, H) },
      };

      const mat  = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      scene.add(mesh);

      const clock = new THREE.Clock();

      const tick = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(tick);
        uniforms.uT.value = clock.getElapsedTime();
        renderer.render(scene, camera);
      };
      tick();

      const onResize = () => {
        const p  = canvas.parentElement;
        if (!p) return;
        const rc = p.getBoundingClientRect();
        const w  = rc.width  > 10 ? Math.round(rc.width)  : 560;
        const h  = rc.height > 10 ? Math.round(rc.height) : 500;
        renderer.setSize(w, h, false);
        uniforms.uRes.value.set(w, h);
      };
      window.addEventListener("resize", onResize);

      (canvas as any).__cleanup = () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", onResize);
        mat.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      (canvas as any).__cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display:"block", width:"100%", height:"100%", ...style }}
    />
  );
}
