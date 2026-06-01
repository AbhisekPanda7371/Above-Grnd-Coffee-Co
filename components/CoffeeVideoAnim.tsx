"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * CoffeeVideoAnim
 * ───────────────
 * Smooth ping-pong: frames 61→240 (start→end) then 240→61 (end→start), repeat.
 *
 * Uses ImageBitmap for GPU-resident frames = fast drawImage, no re-decode.
 * CSS mix-blend-mode + saturate kills golden tint.
 * Radial mask-image dissolves edges — zero box/container feel.
 */

const FRAME_START = 61;   // ≈ 2.5s at 24fps
const FRAME_END   = 240;
const FPS         = 26;
const PREFIX      = "/frames/ezgif-frame-";

const src = (n: number) =>
  `${PREFIX}${String(n).padStart(3, "0")}.jpg`;

export default function CoffeeVideoAnim({
  className = "", style,
}: { className?: string; style?: React.CSSProperties }) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready,   setReady]   = useState(false);
  const [pct,     setPct]     = useState(0);   // loading 0–100

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx  = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let disposed = false;
    let rafId:   number;

    const count   = FRAME_END - FRAME_START + 1;
    const bitmaps = new Array<ImageBitmap | null>(count).fill(null);
    let   loaded  = 0;

    /* ── Pre-load all frames as ImageBitmap (GPU memory, fast draw) ── */
    for (let i = 0; i < count; i++) {
      const n   = FRAME_START + i;
      const idx = i;
      fetch(src(n))
        .then(r => r.blob())
        .then(blob => createImageBitmap(blob, {
          resizeQuality: "high",
        }))
        .then(bmp => {
          if (disposed) { bmp.close(); return; }
          bitmaps[idx] = bmp;
          loaded++;
          setPct(Math.round((loaded / count) * 100));
          if (loaded === count) setReady(true);
        })
        .catch(() => {
          loaded++;
          if (loaded === count) setReady(true);
        });
    }

    /* ── Render loop ── */
    let frame  = 0;
    let dir    = 1;         // 1 = forward (start→end), -1 = reverse (end→start)
    let lastTs = 0;
    const ms   = 1000 / FPS;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!wrap || !canvas) return;
      const cw = wrap.clientWidth  || 560;
      const ch = wrap.clientHeight || 520;
      const pw = Math.round(cw * dpr);
      const ph = Math.round(ch * dpr);
      if (canvas.width === pw && canvas.height === ph) return;
      canvas.width        = pw;
      canvas.height       = ph;
      canvas.style.width  = cw + "px";
      canvas.style.height = ch + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      if (disposed) return;
      rafId = requestAnimationFrame(draw);
      if (loaded < 10) return;           // wait for at least 10 frames
      if (ts - lastTs < ms) return;
      lastTs = ts;

      const bmp = bitmaps[frame];
      if (!bmp) { frame = (frame + dir + count) % count; return; }

      const cw = wrap.clientWidth  || 560;
      const ch = wrap.clientHeight || 520;

      ctx.clearRect(0, 0, cw, ch);

      /* Cover-fit */
      const scale = Math.max(cw / bmp.width, ch / bmp.height);
      const dw    = bmp.width  * scale;
      const dh    = bmp.height * scale;
      ctx.drawImage(bmp, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

      /* Advance + ping-pong */
      frame += dir;
      if (frame >= count)  { frame = count - 2; dir = -1; }  // hit end → reverse
      if (frame < 0)       { frame = 1;          dir =  1; }  // hit start → forward
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      bitmaps.forEach(b => b?.close());
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}
      style={{ width:"100%", height:"100%", minHeight:480,
               position:"relative", isolation:"isolate", ...style }}>

      {/* ── Loading skeleton ── */}
      {!ready && (
        <div style={{
          position:"absolute", inset:0,
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          gap:16, zIndex:2,
        }}>
          <svg width="160" height="160" viewBox="0 0 220 220" fill="none"
            style={{ animation:"skPulse 1.8s ease-in-out infinite", opacity:0.6 }}>
            <path d="M70 160 L78 100 H142 L150 160 Q150 175 110 175 Q70 175 70 160Z"
              fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5"/>
            <ellipse cx="110" cy="100" rx="32" ry="9"
              fill="rgba(201,168,76,0.25)" />
            <path d="M150 120 Q172 120 172 140 Q172 160 150 160"
              fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="8" strokeLinecap="round"/>
            <path d="M70 145 Q30 130 18 108 Q12 86 42 78 L65 96"
              fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.28)" strokeWidth="1"/>
            <path d="M150 140 Q190 125 202 103 Q208 81 178 76 L156 94"
              fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.28)" strokeWidth="1"/>
            <path d="M94 88 Q91 73 95 58" stroke="rgba(201,168,76,0.3)"
              strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M110 85 Q107 70 111 54" stroke="rgba(201,168,76,0.3)"
              strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M126 88 Q123 73 127 58" stroke="rgba(201,168,76,0.3)"
              strokeWidth="2.5" strokeLinecap="round"/>
          </svg>

          {/* Progress bar */}
          <div style={{
            width:120, height:3, borderRadius:2,
            background:"rgba(201,168,76,0.15)", overflow:"hidden",
          }}>
            <div style={{
              height:"100%", borderRadius:2,
              background:"#c9a84c",
              width:`${pct}%`,
              transition:"width 0.2s ease",
            }}/>
          </div>
          <span className="font-jost" style={{
            fontSize:"0.65rem", color:"rgba(44,24,16,0.45)",
            letterSpacing:"0.15em", textTransform:"uppercase",
          }}>Loading {pct}%</span>
        </div>
      )}

      {/* ── Canvas ── */}
      <canvas ref={canvasRef} style={{
        display:   "block",
        width:     "100%",
        height:    "100%",
        opacity:   ready ? 1 : 0,
        transition:"opacity 0.9s ease",

        /* GPU background removal:
           multiply blends warm beige frame bg into cream site bg → invisible.
           saturate(0.78) removes leftover golden cast.
           brightness(1.38) whitens the bg just enough for multiply.         */
        mixBlendMode: "multiply",
        filter: "brightness(1.38) saturate(0.78) contrast(1.04)",

        /* Radial fade — edges dissolve, zero box/container feel */
        maskImage: `radial-gradient(
          ellipse 78% 84% at 50% 50%,
          black 26%, rgba(0,0,0,.9) 44%,
          rgba(0,0,0,.5) 60%, rgba(0,0,0,.1) 74%, transparent 86%
        )`,
        WebkitMaskImage: `radial-gradient(
          ellipse 78% 84% at 50% 50%,
          black 26%, rgba(0,0,0,.9) 44%,
          rgba(0,0,0,.5) 60%, rgba(0,0,0,.1) 74%, transparent 86%
        )`,
      }}/>

      <style>{`
        @keyframes skPulse { 0%,100%{opacity:.35} 50%{opacity:.75} }
      `}</style>
    </div>
  );
}
