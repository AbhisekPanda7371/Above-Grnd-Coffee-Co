"use client";
import { useEffect, useRef } from "react";

export default function ThreeCoffee() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    let animId: number;
    let cleanupFn: (() => void) | null = null;

    const init = async () => {
      const THREE = await import("three");
      const { gsap } = await import("gsap");
      if (!mountRef.current) return;

      const W = mountRef.current.clientWidth  || 520;
      const H = mountRef.current.clientHeight || 540;

      // ── Renderer ────────────────────────────────────────────────────────
      const scene    = new THREE.Scene();
      const camera   = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
      camera.position.set(0, 1.0, 7.8);
      camera.lookAt(0, 0.2, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled  = true;
      renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
      renderer.toneMapping        = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.45;
      mountRef.current.appendChild(renderer.domElement);

      // ── Latte-art texture (rosette leaf) ────────────────────────────────
      const lc  = document.createElement("canvas");
      lc.width  = lc.height = 512;
      const cx  = lc.getContext("2d")!;

      const bg = cx.createRadialGradient(256, 256, 10, 256, 256, 256);
      bg.addColorStop(0,   "#CC8B3E");
      bg.addColorStop(0.4, "#8B521A");
      bg.addColorStop(1,   "#3A1500");
      cx.fillStyle = bg;
      cx.beginPath(); cx.arc(256, 256, 253, 0, Math.PI * 2); cx.fill();

      cx.save();
      cx.translate(256, 270);
      cx.strokeStyle = "rgba(232,192,135,0.9)";
      cx.lineCap = "round";
      for (let i = 0; i < 7; i++) {
        cx.lineWidth = 2.8 - i * 0.28;
        cx.beginPath();
        cx.ellipse(0, -i * 25 + 20, 13 + (6 - i) * 3.5, 9 + (6 - i) * 2.5, 0, 0, Math.PI * 2);
        cx.stroke();
      }
      cx.strokeStyle = "rgba(232,192,135,0.7)";
      cx.lineWidth   = 2.5;
      cx.beginPath(); cx.moveTo(0, 190); cx.lineTo(0, -160); cx.stroke();
      cx.restore();
      cx.strokeStyle = "rgba(255,255,255,0.12)";
      cx.lineWidth   = 5;
      cx.beginPath(); cx.arc(256, 256, 246, 0, Math.PI * 2); cx.stroke();
      const latteTexture = new THREE.CanvasTexture(lc);

      // ── Cup ─────────────────────────────────────────────────────────────
      const ceramicMat = new THREE.MeshPhysicalMaterial({
        color: 0xf2ede5, roughness: 0.05, metalness: 0.0,
        clearcoat: 1.0, clearcoatRoughness: 0.06, side: THREE.DoubleSide,
      });

      const cupGroup = new THREE.Group();
      cupGroup.scale.setScalar(0); // GSAP entrance

      const outerWall = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 0.84, 1.88, 72, 1, true), ceramicMat
      );
      cupGroup.add(outerWall);

      const innerWall = new THREE.Mesh(
        new THREE.CylinderGeometry(1.04, 0.79, 1.86, 72, 1, true), ceramicMat.clone()
      );
      innerWall.scale.setScalar(0.97);
      cupGroup.add(innerWall);

      const cupBottom = new THREE.Mesh(
        new THREE.CylinderGeometry(0.84, 0.84, 0.06, 64), ceramicMat
      );
      cupBottom.position.set(0, -0.95, 0);
      cupGroup.add(cupBottom);

      const coffeeSurface = new THREE.Mesh(
        new THREE.CircleGeometry(1.03, 64),
        new THREE.MeshStandardMaterial({ map: latteTexture, roughness: 0.28 })
      );
      coffeeSurface.rotation.x = -Math.PI / 2;
      coffeeSurface.position.y  = 0.92;
      cupGroup.add(coffeeSurface);

      const handle = new THREE.Mesh(
        new THREE.TorusGeometry(0.45, 0.09, 20, 64, Math.PI), ceramicMat
      );
      handle.position.set(1.24, 0.12, 0);
      handle.rotation.set(0, -Math.PI / 2, Math.PI / 2);
      cupGroup.add(handle);

      const saucer = new THREE.Mesh(
        new THREE.CylinderGeometry(1.78, 1.64, 0.13, 64), ceramicMat
      );
      saucer.position.set(0, -1.06, 0);
      cupGroup.add(saucer);

      const goldRim = new THREE.Mesh(
        new THREE.TorusGeometry(1.72, 0.022, 8, 64),
        new THREE.MeshStandardMaterial({ color: 0xc9a84c, metalness: 0.95, roughness: 0.07 })
      );
      goldRim.rotation.x = Math.PI / 2;
      goldRim.position.set(0, -0.99, 0);
      cupGroup.add(goldRim);

      cupGroup.rotation.y = 0.35;
      scene.add(cupGroup);

      // ── Particle ribbon paths (closed loops — zero restart) ──────────────
      // Coffee: dark espresso, sweeps in from bottom-left, wraps over the top
      const coffeeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-3.6, -1.6,  1.0),
        new THREE.Vector3(-2.2, -0.3,  1.4),
        new THREE.Vector3(-0.7,  1.0,  0.9),
        new THREE.Vector3( 0.3,  1.8,  0.2),
        new THREE.Vector3( 1.4,  1.1, -0.6),
        new THREE.Vector3( 2.9, -0.1, -0.9),
        new THREE.Vector3( 3.2, -1.6, -0.1),
        new THREE.Vector3( 1.8, -2.7,  0.6),
        new THREE.Vector3(-0.1, -3.0,  1.0),
        new THREE.Vector3(-2.1, -2.3,  0.9),
      ], true, "catmullrom", 0.5);

      // Milk: cream white, mirror sweep from top-right, wraps under bottom
      const milkCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3( 3.6,  1.6, -1.0),
        new THREE.Vector3( 2.2,  0.3, -1.4),
        new THREE.Vector3( 0.7, -1.0, -0.9),
        new THREE.Vector3(-0.3, -1.8, -0.2),
        new THREE.Vector3(-1.4, -1.1,  0.6),
        new THREE.Vector3(-2.9,  0.1,  0.9),
        new THREE.Vector3(-3.2,  1.6,  0.1),
        new THREE.Vector3(-1.8,  2.7, -0.6),
        new THREE.Vector3( 0.1,  3.0, -1.0),
        new THREE.Vector3( 2.1,  2.3, -0.9),
      ], true, "catmullrom", 0.5);

      // Gold accent: wider outer orbit
      const goldCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3( 4.4,  0.4,  0.3),
        new THREE.Vector3( 2.8,  3.2, -0.5),
        new THREE.Vector3(-0.5,  4.0, -0.8),
        new THREE.Vector3(-3.8,  1.6, -0.2),
        new THREE.Vector3(-4.4, -1.0,  0.6),
        new THREE.Vector3(-2.2, -3.4,  0.8),
        new THREE.Vector3( 1.0, -4.0,  0.3),
        new THREE.Vector3( 3.8, -1.8, -0.3),
      ], true, "catmullrom", 0.5);

      // ── Instanced meshes for each particle stream ─────────────────────
      const N_COFFEE = 110;
      const N_MILK   = 90;
      const N_GOLD   = 24;

      const sphereGeo = new THREE.SphereGeometry(1, 8, 8);

      const pCoffeeMat = new THREE.MeshPhysicalMaterial({
        color: 0x170600, roughness: 0.08, metalness: 0.1,
        clearcoat: 1.0, clearcoatRoughness: 0.02,
        sheen: 1.0, sheenRoughness: 0.06,
        sheenColor: new THREE.Color(0x5C2A08),
      });
      const coffeeIM = new THREE.InstancedMesh(sphereGeo, pCoffeeMat, N_COFFEE);
      coffeeIM.castShadow = true;
      scene.add(coffeeIM);

      const pMilkMat = new THREE.MeshPhysicalMaterial({
        color: 0xF4EEE5, roughness: 0.04, metalness: 0.0,
        clearcoat: 1.0, clearcoatRoughness: 0.01,
        sheen: 0.8, sheenRoughness: 0.04,
        sheenColor: new THREE.Color(0xFFFFFF),
      });
      const milkIM = new THREE.InstancedMesh(sphereGeo, pMilkMat, N_MILK);
      scene.add(milkIM);

      const pGoldMat = new THREE.MeshStandardMaterial({
        color: 0xE8C84A, metalness: 0.88, roughness: 0.12,
        emissive: new THREE.Color(0xB89030), emissiveIntensity: 0.25,
      });
      const goldIM = new THREE.InstancedMesh(sphereGeo, pGoldMat, N_GOLD);
      scene.add(goldIM);

      // t-offsets: each particle starts at a different position on the closed curve
      const coffeeTs = Array.from({ length: N_COFFEE }, (_, i) => i / N_COFFEE);
      const milkTs   = Array.from({ length: N_MILK   }, (_, i) => i / N_MILK  );
      const goldTs   = Array.from({ length: N_GOLD   }, (_, i) => i / N_GOLD  );

      // Shared dummy for matrix updates
      const dummy = new THREE.Object3D();

      // ── Steam particles ──────────────────────────────────────────────────
      const steam: {
        mesh: { position: { x:number; y:number; z:number } };
        mat: { opacity: number };
        startY: number; maxY: number; vel: number;
        phase: number; bx: number; bz: number; maxOp: number;
      }[] = [];
      for (let i = 0; i < 20; i++) {
        const geo = new THREE.SphereGeometry(0.04 + Math.random() * 0.05, 7, 7);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
        const mesh = new THREE.Mesh(geo, mat);
        const bx  = (Math.random() - 0.5) * 0.75;
        const bz  = (Math.random() - 0.5) * 0.75;
        const sy  = 0.94 + Math.random() * 0.18;
        steam.push({
          mesh, mat, startY: sy,
          maxY: sy + 1.0 + Math.random() * 0.9,
          vel: 0.004 + Math.random() * 0.005,
          phase: Math.random() * Math.PI * 2,
          bx, bz, maxOp: 0.1 + Math.random() * 0.14,
        });
        scene.add(mesh);
      }

      // ── Lights ───────────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xfff8f0, 0.9));

      const keyLight = new THREE.DirectionalLight(0xfffaea, 3.0);
      keyLight.position.set(5, 9, 6);
      keyLight.castShadow = true;
      scene.add(keyLight);

      const goldFill = new THREE.PointLight(0xd4a840, 4.5, 20);
      goldFill.position.set(-5, 3.5, 3.5);
      scene.add(goldFill);

      const warmRim = new THREE.PointLight(0xffb060, 2.2, 14);
      warmRim.position.set(0, -5, 5);
      scene.add(warmRim);

      const backLight = new THREE.PointLight(0x7b5e4a, 1.4, 14);
      backLight.position.set(0, 3, -7);
      scene.add(backLight);

      // ── GSAP entrance ────────────────────────────────────────────────────
      // Cup springs in, then particles fade in via opacity on materials
      gsap.to(cupGroup.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: "back.out(1.5)", delay: 0.1 });
      // Fade particle materials opacity from 0→1
      pCoffeeMat.transparent = true; pCoffeeMat.opacity = 0;
      pMilkMat.transparent   = true; pMilkMat.opacity   = 0;
      pGoldMat.transparent   = true; pGoldMat.opacity   = 0;
      gsap.to(pCoffeeMat, { opacity: 1, duration: 1.4, ease: "power2.out", delay: 0.7 });
      gsap.to(pMilkMat,   { opacity: 1, duration: 1.4, ease: "power2.out", delay: 0.9 });
      gsap.to(pGoldMat,   { opacity: 1, duration: 1.2, ease: "power2.out", delay: 1.1 });

      // ── Animation loop ────────────────────────────────────────────────────
      const clock = new THREE.Clock();
      const COFFEE_SPEED = 0.038; // loops per second
      const MILK_SPEED   = 0.030;
      const GOLD_SPEED   = 0.018;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Cup: gentle float + sway
        cupGroup.position.y = Math.sin(t * 0.6) * 0.13;
        cupGroup.rotation.y = 0.35 + Math.sin(t * 0.28) * 0.16;

        // ── Coffee particles: flow along closed curve ────────────────────
        for (let i = 0; i < N_COFFEE; i++) {
          // advance t (wraps automatically via % 1)
          const pt = (coffeeTs[i] + t * COFFEE_SPEED) % 1;
          const pos = coffeeCurve.getPoint(pt);
          // size: larger in middle of path, smaller at "ends" for organic feel
          const sizeT = 0.5 + 0.5 * Math.sin(pt * Math.PI * 2 + t * 0.3 + i * 0.18);
          const size  = (0.055 + 0.065 * sizeT);
          dummy.position.copy(pos);
          dummy.scale.setScalar(size);
          dummy.updateMatrix();
          coffeeIM.setMatrixAt(i, dummy.matrix);
        }
        coffeeIM.instanceMatrix.needsUpdate = true;

        // ── Milk particles ──────────────────────────────────────────────
        for (let i = 0; i < N_MILK; i++) {
          const pt  = (milkTs[i] + t * MILK_SPEED) % 1;
          const pos = milkCurve.getPoint(pt);
          const sizeT = 0.5 + 0.5 * Math.sin(pt * Math.PI * 2 - t * 0.25 + i * 0.22);
          const size  = (0.05 + 0.06 * sizeT);
          dummy.position.copy(pos);
          dummy.scale.setScalar(size);
          dummy.updateMatrix();
          milkIM.setMatrixAt(i, dummy.matrix);
        }
        milkIM.instanceMatrix.needsUpdate = true;

        // ── Gold accent particles ────────────────────────────────────────
        for (let i = 0; i < N_GOLD; i++) {
          const pt  = (goldTs[i] + t * GOLD_SPEED) % 1;
          const pos = goldCurve.getPoint(pt);
          const pulse = 0.06 + 0.05 * Math.abs(Math.sin(t * 2.2 + i * 0.8));
          dummy.position.copy(pos);
          dummy.scale.setScalar(pulse);
          dummy.updateMatrix();
          goldIM.setMatrixAt(i, dummy.matrix);
        }
        goldIM.instanceMatrix.needsUpdate = true;

        // Gold light breathes
        goldFill.intensity = 4.0 + Math.sin(t * 0.8) * 0.7;

        // Steam
        for (const p of steam) {
          p.mesh.position.y += p.vel;
          p.mesh.position.x  = p.bx + Math.sin(t * 0.85 + p.phase) * 0.1;
          p.mesh.position.z  = p.bz + Math.cos(t * 0.7  + p.phase) * 0.08;
          const prog = (p.mesh.position.y - p.startY) / (p.maxY - p.startY);
          p.mat.opacity = prog < 0.25
            ? (prog / 0.25) * p.maxOp
            : (1 - prog)    * p.maxOp;
          if (p.mesh.position.y >= p.maxY) {
            p.mesh.position.y = p.startY;
            p.mat.opacity     = 0;
          }
        }

        renderer.render(scene, camera);
      };

      animate();

      // Resize
      const onResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      cleanupFn = () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        coffeeIM.dispose();
        milkIM.dispose();
        goldIM.dispose();
        renderer.dispose();
        if (mountRef.current?.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    };

    init();
    return () => cleanupFn?.();
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
    />
  );
}
