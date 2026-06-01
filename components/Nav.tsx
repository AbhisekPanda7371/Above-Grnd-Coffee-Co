"use client";
import { useState, useEffect, useRef } from "react";
import { NAV_LINKS, WHATSAPP, BRAND } from "@/lib/constants";
import LogoIcon from "./LogoIcon";


export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false);
  const [open,       setOpen]       = useState(false);
  const [activeHref, setActiveHref] = useState("#");
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs     = useRef<(HTMLAnchorElement | null)[]>([]);

  /* scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* move the gold indicator pill under the active link */
  const moveIndicator = (el: HTMLAnchorElement | null) => {
    if (!el || !indicatorRef.current) return;
    const { offsetLeft, offsetWidth } = el;
    indicatorRef.current.style.left  = `${offsetLeft}px`;
    indicatorRef.current.style.width = `${offsetWidth}px`;
  };

  useEffect(() => {
    const idx = NAV_LINKS.findIndex(l => l.href === activeHref);
    moveIndicator(linkRefs.current[idx] ?? null);
  }, [activeHref]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        background: scrolled
          ? "rgba(255,252,248,0.72)"
          : "rgba(255,252,248,0.18)",
        backdropFilter:       "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderBottom: scrolled
          ? "1px solid rgba(201,168,76,0.2)"
          : "1px solid rgba(255,255,255,0.35)",
        boxShadow: scrolled ? "0 4px 32px rgba(44,24,16,0.07)" : "none",
      }}>

        {/* ── thin gold top accent line ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg,transparent 0%,rgba(201,168,76,0.55) 30%,rgba(201,168,76,0.9) 50%,rgba(201,168,76,0.55) 70%,transparent 100%)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}/>

        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem",
          height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* ── Brand ── */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            {/* Logo mark */}
            <div style={{
              width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
              background: "rgba(201,168,76,0.10)",
              border: "1.5px solid rgba(201,168,76,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 4px rgba(201,168,76,0.08)",
              transition: "box-shadow 0.3s ease",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 7px rgba(201,168,76,0.16)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 4px rgba(201,168,76,0.08)";
              }}
            >
              <LogoIcon size={32} />
            </div>

            <div>
              <div className="font-playfair" style={{
                fontSize: "1.1rem", fontWeight: 800, color: "#0d0d0d",
                letterSpacing: "0.02em", lineHeight: 1.1, fontStyle: "italic",
              }}>Above GRND</div>
              <div className="font-inter" style={{
                fontSize: "0.52rem", color: "#5c3d2e", letterSpacing: "0.22em",
                textTransform: "uppercase", fontWeight: 300, lineHeight: 1,
                marginTop: 2, opacity: 0.8,
              }}>Coffee Co. · Portland, OR</div>
            </div>
          </a>

          {/* ── Desktop links with sliding gold indicator ── */}
          <div className="nav-links-desktop" style={{
            display: "flex", alignItems: "center", gap: 0,
            position: "relative",
          }}>
            {/* sliding indicator */}
            <span ref={indicatorRef} style={{
              position: "absolute", bottom: -4, height: 2,
              background: "linear-gradient(90deg,rgba(201,168,76,0.4),#c9a84c,rgba(201,168,76,0.4))",
              borderRadius: 1,
              transition: "left 0.35s cubic-bezier(0.23,1,0.32,1), width 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.25s",
              opacity: 0,
            }}/>

            {NAV_LINKS.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                ref={el => { linkRefs.current[i] = el; }}
                className="font-inter"
                style={{
                  fontSize: "0.82rem", fontWeight: 400, color: "#0d0d0d",
                  textDecoration: "none", letterSpacing: "0.04em",
                  padding: "8px 20px",
                  opacity: activeHref === l.href ? 1 : 0.58,
                  transition: "opacity 0.2s ease, color 0.2s ease",
                  position: "relative",
                }}
                onClick={() => setActiveHref(l.href)}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.color = "#c9a84c";
                  moveIndicator(e.currentTarget as HTMLAnchorElement);
                  if (indicatorRef.current) indicatorRef.current.style.opacity = "1";
                }}
                onMouseLeave={e => {
                  const isActive = activeHref === l.href;
                  (e.currentTarget as HTMLElement).style.opacity = isActive ? "1" : "0.58";
                  (e.currentTarget as HTMLElement).style.color = "#0d0d0d";
                  const activeIdx = NAV_LINKS.findIndex(x => x.href === activeHref);
                  moveIndicator(linkRefs.current[activeIdx] ?? null);
                  if (indicatorRef.current) indicatorRef.current.style.opacity = activeIdx >= 0 ? "1" : "0";
                }}
              >{l.label}</a>
            ))}
          </div>

          {/* ── CTA + mobile toggle ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href={WHATSAPP.url("order")} target="_blank" rel="noopener noreferrer"
              className="nav-cta font-syne"
              style={{
                background: "#0d0d0d", color: "#fff",
                padding: "10px 26px", borderRadius: 50,
                fontSize: "0.78rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 8,
                transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                border: "1.5px solid transparent",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.color = "#0d0d0d";
                el.style.borderColor = "#0d0d0d";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#0d0d0d";
                el.style.color = "#fff";
                el.style.borderColor = "transparent";
                el.style.transform = "translateY(0)";
              }}
            >
              Book a Table
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="nav-hamburger"
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: 8, display: "flex", flexDirection: "column",
                gap: 5, alignItems: "flex-end",
              }}
              aria-label="Toggle menu"
            >
              {[22, 14, 18].map((w, i) => (
                <span key={i} style={{
                  display: "block", height: 1.5, background: "#0d0d0d", borderRadius: 2,
                  width: open ? 22 : w,
                  transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                  transform: open
                    ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                    : i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)"
                    : "scaleX(0)"
                    : "none",
                }}/>
              ))}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div style={{
          overflow: "hidden",
          maxHeight: open ? "320px" : "0",
          transition: "max-height 0.45s cubic-bezier(0.23,1,0.32,1)",
          background: "rgba(255,252,248,0.92)",
          backdropFilter: "blur(24px)",
          borderTop: open ? "1px solid rgba(201,168,76,0.15)" : "none",
        }}>
          <div style={{ padding: "1.8rem 2.5rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-playfair"
                style={{
                  fontSize: "1.6rem", fontWeight: 700, color: "#0d0d0d",
                  textDecoration: "none", fontStyle: "italic",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid rgba(201,168,76,0.1)",
                  transition: "color 0.2s ease, padding-left 0.3s ease",
                  display: "block",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "#c9a84c";
                  (e.currentTarget as HTMLElement).style.paddingLeft = "8px";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "#0d0d0d";
                  (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                }}
              >{l.label}</a>
            ))}
            <a href={WHATSAPP.url("order")} target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-dark font-syne"
              style={{ marginTop: "1.2rem", textAlign: "center" }}
            >Book a Table</a>
          </div>
        </div>
      </nav>

      <style>{`
        .nav-links-desktop { display: flex; }
        .nav-cta           { display: inline-flex; }
        .nav-hamburger     { display: none; }

        @media (max-width: 860px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta           { display: none !important; }
          .nav-hamburger     { display: flex !important; }
        }
      `}</style>
    </>
  );
}
