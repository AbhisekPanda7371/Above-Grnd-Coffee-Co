"use client";
import React, { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;
const FPS          = 24;
const START_FRAME  = 61;   // 2.5s × 24fps = 60 → start frame 61
const END_FRAME    = 240;
const FILE_PREFIX  = "ezgif-frame-";

const src = (n: number) =>
  `/frames/${FILE_PREFIX}${String(n).padStart(3, "0")}.jpg`;

export default function CoffeeFrameAnim({
  className = "", style,
}: { className?: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    let rafId: number;
    let disposed = false;
    let loaded   = 0;
    let ready    = false;

    const count = END_FRAME - START_FRAME + 1;
    const imgs  = new Array<HTMLImageElement>(count);

    for (let i = 0; i < count; i++) {
      const img = new Image();
      img.src   = src(START_FRAME + i);
      img.onload  = () => { loaded++; if (loaded === count) ready = true; };
      img.onerror = () => { loaded++; if (loaded === count) ready = true; };
      imgs[i] = img;
    }

    const ctx      = canvas.getContext("2d")!;
    let   frame    = 0;
    let   dir      = 1;
    let   lastTs   = 0;
    const interval = 1000 / FPS;

    const draw = (ts: number) => {
      if (disposed) return;
      rafId = requestAnimationFrame(draw);
      if (!ready) return;
      if (ts - lastTs < interval) return;
      lastTs = ts;

      const img = imgs[frame];
      if (!img?.complete || !img.naturalWidth) return;

      const dpr = window.devicePixelRatio || 1;
      const cw  = wrap.clientWidth  || 560;
      const ch  = wrap.clientHeight || 540;
      // Render at device pixel ratio for sharp display on retina/HiDPI screens
      if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
        canvas.width        = Math.round(cw * dpr);
        canvas.height       = Math.round(ch * dpr);
        canvas.style.width  = cw + "px";
        canvas.style.height = ch + "px";
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, cw, ch);

      // High-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth  * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

      // Ping-pong
      frame += dir;
      if (frame >= count)  { frame = count - 2; dir = -1; }
      if (frame < 0)       { frame = 1;          dir =  1; }
    };

    rafId = requestAnimationFrame(draw);
    return () => { disposed = true; cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div ref={wrapRef} className={className}
      style={{ width:"100%", height:"100%", minHeight:480, position:"relative", ...style }}>
      <canvas ref={canvasRef}
        style={{
          display: "block",
          width:   "100%",
          height:  "100%",
          /* Blend warm frame bg into site cream — bg disappears */
          mixBlendMode: "multiply",
          /* Brighten significantly so the warm beige bg becomes near-white
             → multiply with cream site bg makes it vanish completely */
          filter: "brightness(1.55) contrast(1.12) saturate(1.18)",
          /* Radial mask — edges dissolve organically, no hard rectangle */
          maskImage: `radial-gradient(
            ellipse 78% 84% at 50% 50%,
            black    30%,
            rgba(0,0,0,0.92) 48%,
            rgba(0,0,0,0.55) 64%,
            rgba(0,0,0,0.15) 76%,
            transparent 88%
          )`,
          WebkitMaskImage: `radial-gradient(
            ellipse 78% 84% at 50% 50%,
            black    30%,
            rgba(0,0,0,0.92) 48%,
            rgba(0,0,0,0.55) 64%,
            rgba(0,0,0,0.15) 76%,
            transparent 88%
          )`,
        }}
      />
    </div>
  );
}
