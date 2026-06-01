"use client";
import React, { useEffect, useRef } from "react";

export default function CoffeeCup3D({
  className = "", style,
}: { className?: string; style?: React.CSSProperties }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    let rafId: number, disposed = false;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      await new Promise(r => requestAnimationFrame(r));
      const rect = container.getBoundingClientRect();
      const W = rect.width  > 10 ? Math.round(rect.width)  : 580;
      const H = rect.height > 10 ? Math.round(rect.height) : 560;

      /* ── Renderer ── */
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.shadowMap.enabled   = true;
      renderer.shadowMap.type      = THREE.PCFSoftShadowMap;
      renderer.toneMapping         = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, W / H, 0.01, 100);
      camera.position.set(0, 2.2, 7.0);
      camera.lookAt(0, 0.2, 0);

      /* ══ LIGHTING ══ */
      scene.add(new THREE.AmbientLight(0xFFEDD8, 0.65));

      const key = new THREE.DirectionalLight(0xFFCE7A, 4.8);
      key.position.set(-3.5, 6, 3.5);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.bias = -0.0006;
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xC5DCFF, 1.3);
      fill.position.set(5, 2, -1);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(0xFF9944, 2.5);
      rim.position.set(0, 1, -6);
      scene.add(rim);

      const goldPt = new THREE.PointLight(0xC9A84C, 4.5, 14);
      scene.add(goldPt);

      /* ══ LATTE ART TEXTURE (heart + rosette) ══ */
      const lc2 = document.createElement("canvas");
      lc2.width = lc2.height = 512;
      const ctx = lc2.getContext("2d")!;

      // Espresso base — radial gradient
      const espGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      espGrad.addColorStop(0,   "#C07830");
      espGrad.addColorStop(0.5, "#7B3F10");
      espGrad.addColorStop(1,   "#3A1200");
      ctx.fillStyle = espGrad;
      ctx.fillRect(0, 0, 512, 512);

      // Foam ring
      const foamGrad = ctx.createRadialGradient(256,256,160, 256,256,248);
      foamGrad.addColorStop(0,   "rgba(240,215,170,0)");
      foamGrad.addColorStop(0.7, "rgba(240,215,170,0.25)");
      foamGrad.addColorStop(1,   "rgba(240,215,170,0.6)");
      ctx.fillStyle = foamGrad;
      ctx.beginPath(); ctx.arc(256,256,248,0,Math.PI*2); ctx.fill();

      // Rosette stem
      ctx.strokeStyle = "rgba(248,232,200,0.90)";
      ctx.lineWidth = 7; ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(256, 390);
      ctx.bezierCurveTo(256, 300, 256, 200, 256, 130);
      ctx.stroke();

      // Rosette leaves
      const leafPairs = [
        [256,340, 196,295, 210,248, 256,290],
        [256,340, 316,295, 302,248, 256,290],
        [256,280, 188,240, 205,196, 256,240],
        [256,280, 324,240, 307,196, 256,240],
        [256,225, 196,188, 210,152, 256,192],
        [256,225, 316,188, 302,152, 256,192],
      ];
      ctx.lineWidth = 6;
      leafPairs.forEach(([x0,y0,cx1,cy1,cx2,cy2,x1,y1]) => {
        ctx.beginPath(); ctx.moveTo(x0,y0);
        ctx.bezierCurveTo(cx1,cy1, cx2,cy2, x1,y1); ctx.stroke();
      });

      // ❤ Heart at top
      ctx.fillStyle = "rgba(248,232,200,0.92)";
      ctx.beginPath();
      const hx = 256, hy = 130, hs = 32;
      ctx.moveTo(hx, hy + hs * 0.4);
      ctx.bezierCurveTo(hx, hy, hx - hs, hy, hx - hs, hy + hs * 0.35);
      ctx.bezierCurveTo(hx - hs, hy + hs * 0.75, hx, hy + hs * 1.1, hx, hy + hs * 1.3);
      ctx.bezierCurveTo(hx, hy + hs * 1.1, hx + hs, hy + hs * 0.75, hx + hs, hy + hs * 0.35);
      ctx.bezierCurveTo(hx + hs, hy, hx, hy, hx, hy + hs * 0.4);
      ctx.fill();

      const latteTex = new THREE.CanvasTexture(lc2);

      /* ══ CUP GEOMETRY ══ */
      const cupGroup = new THREE.Group();
      scene.add(cupGroup);

      const ceramicMat = new THREE.MeshPhysicalMaterial({
        color: 0xD8D0C5, roughness: 0.18, metalness: 0,
        clearcoat: 0.9, clearcoatRoughness: 0.08,
      });

      // Body — wide squat lathe profile
      const bodyPts: any[] = [];
      for (let i = 0; i <= 36; i++) {
        const t = i / 36;
        const y = t * 2.0 - 0.7;
        const r = 1.22 + t * 0.18 - Math.sin(t * Math.PI) * 0.06;
        bodyPts.push(new THREE.Vector2(r, y));
      }
      const bodyMesh = new THREE.Mesh(
        new THREE.LatheGeometry(bodyPts, 80), ceramicMat
      );
      bodyMesh.castShadow = bodyMesh.receiveShadow = true;
      cupGroup.add(bodyMesh);

      // Rim torus
      const rimMesh = new THREE.Mesh(
        new THREE.TorusGeometry(1.38, 0.032, 16, 80), ceramicMat
      );
      rimMesh.position.y = 1.32; rimMesh.castShadow = true;
      cupGroup.add(rimMesh);

      // Coffee surface — latte art
      const surfMesh = new THREE.Mesh(
        new THREE.CircleGeometry(1.3, 80),
        new THREE.MeshStandardMaterial({ map: latteTex, roughness: 0.38, metalness: 0.04 })
      );
      surfMesh.rotation.x = -Math.PI / 2;
      surfMesh.position.y = 1.28;
      cupGroup.add(surfMesh);

      // Handle
      const handleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.38, 0.8, 0),
        new THREE.Vector3(2.0,  0.8, 0),
        new THREE.Vector3(2.22, 0.4, 0),
        new THREE.Vector3(2.22,-0.1, 0),
        new THREE.Vector3(2.0, -0.45,0),
        new THREE.Vector3(1.38,-0.42,0),
      ]);
      const handleMesh = new THREE.Mesh(
        new THREE.TubeGeometry(handleCurve, 30, 0.062, 12, false), ceramicMat
      );
      handleMesh.castShadow = true;
      cupGroup.add(handleMesh);

      // Saucer
      const saucerPts: any[] = [
        new THREE.Vector2(0.1, 0), new THREE.Vector2(1.7, 0),
        new THREE.Vector2(1.85,-0.04), new THREE.Vector2(1.78,-0.12),
        new THREE.Vector2(1.0, -0.15), new THREE.Vector2(0.12,-0.12),
        new THREE.Vector2(0.1, 0),
      ];
      const saucerMesh = new THREE.Mesh(
        new THREE.LatheGeometry(saucerPts, 80), ceramicMat
      );
      saucerMesh.position.y = -0.72;
      saucerMesh.castShadow = saucerMesh.receiveShadow = true;
      cupGroup.add(saucerMesh);

      // Water droplets on cup body
      const dotMat = new THREE.MeshPhysicalMaterial({
        color: 0xD0C5B8, roughness: 0.15, clearcoat: 1.0,
      });
      for (let i = 0; i < 18; i++) {
        const a = Math.random() * Math.PI * 2;
        const h = Math.random() * 1.6 - 0.5;
        const r = 1.22 + h * 0.06 + 0.02;
        const drop = new THREE.Mesh(new THREE.SphereGeometry(0.022 + Math.random()*0.018, 8, 8), dotMat);
        drop.position.set(Math.cos(a)*r, h, Math.sin(a)*r);
        cupGroup.add(drop);
      }

      /* ══ ANIMATED LIQUID STREAMS ══
         Each stream is a custom BufferGeometry.
         Every frame: vertices are displaced by sin/cos(time)
         creating flowing, organic liquid motion.
      ══ */

      const makeStream = (
        mat: any,
        angleStart: number,
        angleSpan: number,
        radiusBase: number,
        heightBase: number,
        heightPeak: number,
        waveAmp: number,
        waveFreq: number,
        phaseOffset: number,
        radSegs: number,
        hSegs: number
      ) => {
        const positions = new Float32Array(radSegs * hSegs * 3);
        const normals   = new Float32Array(radSegs * hSegs * 3);
        const uvs       = new Float32Array(radSegs * hSegs * 2);
        const indices: number[] = [];

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("normal",   new THREE.BufferAttribute(normals,   3));
        geo.setAttribute("uv",       new THREE.BufferAttribute(uvs,       2));

        for (let hi = 0; hi < hSegs - 1; hi++) {
          for (let ri = 0; ri < radSegs - 1; ri++) {
            const a = hi * radSegs + ri;
            const b = hi * radSegs + ri + 1;
            const c = (hi+1) * radSegs + ri + 1;
            const d = (hi+1) * radSegs + ri;
            indices.push(a, b, d,  b, c, d);
          }
        }
        geo.setIndex(indices);

        // Solidify
        const sol = new THREE.Mesh(geo, mat);
        sol.castShadow = true;
        scene.add(sol);

        // Back face (thickness)
        const sol2 = new THREE.Mesh(geo, mat.clone());
        (sol2.material as any).side = THREE.BackSide;
        scene.add(sol2);

        const updateStream = (t: number) => {
          const pos = geo.attributes.position.array as Float32Array;
          for (let hi = 0; hi < hSegs; hi++) {
            const ht = hi / (hSegs - 1);  // 0 base → 1 top

            for (let ri = 0; ri < radSegs; ri++) {
              const rt = ri / (radSegs - 1);  // 0 → 1 across arc

              const angle = angleStart + rt * angleSpan;

              // Radius grows outward + wave pulsation
              const edgeSin = Math.sin(rt * Math.PI);
              const r = radiusBase
                + ht * 1.6
                + edgeSin * 0.35
                + Math.sin(rt * Math.PI * 2.5 + t * 1.4 + phaseOffset) * waveAmp * 0.4;

              // Height profile: starts at base, rises to peak, then curls
              let h: number;
              if (ht < 0.6) {
                h = heightBase + (heightPeak - heightBase) * (ht / 0.6);
              } else {
                const curl = (ht - 0.6) / 0.4;
                h = heightPeak - curl * (heightPeak - heightBase) * 0.55;
              }

              // ANIMATION — vertex wave displacement
              h += Math.sin(rt * Math.PI * waveFreq + t * 2.0 + phaseOffset) * waveAmp * ht;
              const rWave = r + Math.sin(ht * Math.PI * 3 + t * 1.8 + phaseOffset) * waveAmp * 0.3;

              // Angular flow — the stream sweeps in rotation direction
              const flowAngle = angle + Math.sin(ht * 2.5 + t * 0.9) * 0.12;

              const idx = (hi * radSegs + ri) * 3;
              pos[idx]     = Math.cos(flowAngle) * rWave;
              pos[idx + 1] = h;
              pos[idx + 2] = Math.sin(flowAngle) * rWave;

              const uidx = (hi * radSegs + ri) * 2;
              uvs[uidx]   = rt;
              uvs[uidx+1] = ht;
            }
          }
          geo.attributes.position.needsUpdate = true;
          geo.attributes.uv.needsUpdate = true;
          geo.computeVertexNormals();
        };

        return { updateStream, sol, sol2, geo };
      };

      // Coffee stream mat — glossy caramel
      const coffeeMat = new THREE.MeshPhysicalMaterial({
        color: 0xB86020, roughness: 0.04, metalness: 0.05,
        clearcoat: 1.0, clearcoatRoughness: 0.02,
        side: THREE.DoubleSide,
      });

      // Milk stream mat — glossy white
      const milkMat = new THREE.MeshPhysicalMaterial({
        color: 0xF8F4EE, roughness: 0.03, metalness: 0.0,
        clearcoat: 1.0, clearcoatRoughness: 0.01,
        side: THREE.DoubleSide,
      });

      // Main coffee sweep — right side, flows counter-clockwise
      const coffeeStream = makeStream(
        coffeeMat,
        -0.5, Math.PI * 1.05,   // sweeps ~190° on right
        1.5, -0.9, 2.2,
        0.18, 3.0, 0.0,
        40, 28
      );

      // Coffee lower base wave
      const coffeeBase = makeStream(
        coffeeMat,
        0.1, Math.PI * 0.85,
        1.6, -1.0, 0.85,
        0.12, 2.5, 0.8,
        34, 20
      );

      // Main milk sweep — left side, flows clockwise (opposite)
      const milkStream = makeStream(
        milkMat,
        Math.PI * 0.6, Math.PI * 1.05,  // sweeps ~190° on left
        1.5, -0.9, 2.4,
        0.20, 3.2, Math.PI,
        40, 28
      );

      // Milk lower base wave
      const milkBase = makeStream(
        milkMat,
        Math.PI * 0.75, Math.PI * 0.82,
        1.65, -1.0, 0.9,
        0.13, 2.8, Math.PI * 0.6,
        34, 20
      );

      /* ══ DROPLETS ══ */
      const droplets: { mesh: any; initPos: { x: number; y: number; z: number }; speed: number; phase: number }[] = [];

      const addDroplet = (x: number, y: number, z: number, r: number, milk: boolean) => {
        const mat = new THREE.MeshPhysicalMaterial({
          color: milk ? 0xF5F0E8 : 0xA05018,
          roughness: 0.02, clearcoat: 1.0, clearcoatRoughness: 0.01,
          transparent: true, opacity: 0.92,
        });
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 12), mat);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        scene.add(mesh);
        droplets.push({ mesh, initPos: { x, y, z }, speed: 0.3 + Math.random()*0.4, phase: Math.random()*Math.PI*2 });
      };

      const dropData = [
        [-2.8, 1.8, 0.5, 0.11, true],  [-2.4,-0.5, 0.6, 0.09, true],
        [-3.2, 0.4, 0.2, 0.07, true],  [-1.8, 2.4,-0.3, 0.08, true],
        [ 2.9,-0.8, 0.4, 0.10, false], [ 2.5, 1.2,-0.3, 0.08, false],
        [ 3.3, 0.2, 0.5, 0.07, false], [ 2.1,-1.8, 0.3, 0.09, false],
        [ 0.5, 3.0, 0.2, 0.08, true],  [-0.6,-2.9, 0.4, 0.09, false],
        [ 1.2, 2.6,-0.4, 0.07, true],  [-1.0,-2.6, 0.5, 0.08, false],
      ];
      dropData.forEach(([x,y,z,r,milk]) => addDroplet(x as number,y as number,z as number,r as number,milk as boolean));

      // Micro droplets
      for (let i = 0; i < 55; i++) {
        const a = Math.random()*Math.PI*2;
        const d = 1.8 + Math.random()*3.2;
        const h = Math.random()*3.0 - 0.8;
        addDroplet(
          Math.cos(a)*d + (Math.random()-0.5)*0.3,
          h,
          Math.sin(a)*d + (Math.random()-0.5)*0.3,
          0.014 + Math.random()*0.048,
          Math.random() > 0.45
        );
      }

      /* ══ GSAP ENTRANCE ══ */
      cupGroup.position.y = -3;
      cupGroup.rotation.y = -Math.PI * 0.5;
      cupGroup.scale.setScalar(0.1);

      (async () => {
        const { gsap } = await import("gsap");
        if (disposed) return;
        gsap.timeline({ delay: 0.25 })
          .to(cupGroup.scale,    { x:1, y:1, z:1,     duration:1.5, ease:"back.out(1.4)" }, 0)
          .to(cupGroup.position, { y:0,               duration:1.5, ease:"power3.out"     }, 0)
          .to(cupGroup.rotation, { y:0,               duration:1.5, ease:"power3.out"     }, 0);
      })();

      /* ══ RENDER LOOP ══ */
      const clock = new THREE.Clock();

      const tick = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();

        // Update animated liquid streams every frame
        coffeeStream.updateStream(t);
        coffeeBase.updateStream(t);
        milkStream.updateStream(t);
        milkBase.updateStream(t);

        // Cup: slow rotation so latte art + handle visible from front
        cupGroup.rotation.y = Math.sin(t * 0.18) * 0.35;  // gentle sway not full spin
        cupGroup.position.y = Math.sin(t * 0.9) * 0.06;
        cupGroup.rotation.z = Math.sin(t * 0.42) * 0.015;

        // Gold orbiting light — moving specular on glossy splash
        goldPt.position.set(
          Math.sin(t * 0.55) * 4.5,
          2.5 + Math.sin(t * 0.35) * 0.7,
          Math.cos(t * 0.55) * 4.5
        );
        goldPt.intensity = 4.0 + Math.sin(t * 1.15) * 0.9;

        // Key light gentle sway
        key.position.x = -3.5 + Math.sin(t * 0.28) * 0.7;
        key.intensity  = 4.6 + Math.sin(t * 0.5)   * 0.4;

        // Droplets float gently
        droplets.forEach(d => {
          d.mesh.position.y = d.initPos.y + Math.sin(t * d.speed + d.phase) * 0.08;
          d.mesh.position.x = d.initPos.x + Math.cos(t * d.speed * 0.7 + d.phase) * 0.04;
        });

        renderer.render(scene, camera);
      };
      tick();

      const onResize = () => {
        const rc = container.getBoundingClientRect();
        const w = rc.width > 10 ? Math.round(rc.width) : 580;
        const h = rc.height> 10 ? Math.round(rc.height): 560;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      (container as any).__cup3d = () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        latteTex.dispose();
      };
    })();

    return () => {
      disposed = true;
      (container as any)?.__cup3d?.();
      container?.querySelector("canvas")?.remove();
    };
  }, []);

  return (
    <div ref={mountRef} className={className}
      style={{ width:"100%", height:"100%", minHeight:500, display:"block", position:"relative", ...style }}
    />
  );
}
