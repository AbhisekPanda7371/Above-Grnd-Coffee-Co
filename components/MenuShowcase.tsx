"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { WHATSAPP, MENU_ITEMS as menuItems } from "@/lib/constants";

export default function MenuShowcase() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;

      gsap.fromTo(".menu-head", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });

      gsap.fromTo(".menu-card", { opacity: 0, y: 55, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7,
        stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".menu-grid", start: "top 82%" },
      });
    };
    initGSAP();
  }, []);

  return (
    <section id="menu" ref={ref} style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div className="menu-head" style={{ textAlign: "center", marginBottom: "4.5rem", opacity: 0 }}>
          <div className="font-inter" style={{
            fontSize: "0.68rem", letterSpacing: "0.38em", textTransform: "uppercase",
            color: "#c9a84c", marginBottom: "1rem", fontWeight: 400,
          }}>— Our Menu —</div>
          <h2 className="font-playfair" style={{
            fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 800,
            color: "#0d0d0d", lineHeight: 1.06,
            letterSpacing: "-0.01em", fontStyle: "italic",
          }}>Crafted With Intention</h2>
          <p className="font-inter" style={{
            fontSize: "0.97rem", color: "#3d2b1f", marginTop: "1.2rem",
            maxWidth: 480, margin: "1.2rem auto 0", lineHeight: 1.85, fontWeight: 300,
          }}>
            Every drink and bite is a deliberate expression of culture, craft, and character.
          </p>
        </div>

        {/* Grid */}
        <div className="menu-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="menu-card"
              style={{
                background: "rgba(255,255,255,0.32)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1.5px solid rgba(255,255,255,0.65)",
                borderRadius: 24,
                overflow: "hidden",
                opacity: 0,
                cursor: "default",
                position: "relative",
                transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-10px)";
                el.style.boxShadow = `0 32px 64px rgba(44,24,16,0.18), 0 0 0 1.5px ${item.accent}55`;
                el.style.borderColor = `${item.accent}66`;
                el.style.background = "rgba(255,255,255,0.52)";
                const reveal = el.querySelector(".card-reveal") as HTMLElement;
                if (reveal) { reveal.style.opacity = "1"; reveal.style.transform = "translateY(0)"; }
                const img = el.querySelector(".card-img-inner") as HTMLElement;
                if (img) img.style.transform = "scale(1.08)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = "rgba(255,255,255,0.65)";
                el.style.background = "rgba(255,255,255,0.32)";
                const reveal = el.querySelector(".card-reveal") as HTMLElement;
                if (reveal) { reveal.style.opacity = "0"; reveal.style.transform = "translateY(8px)"; }
                const img = el.querySelector(".card-img-inner") as HTMLElement;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              {/* Image banner */}
              <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                {/* Colour wash */}
                <div style={{
                  position: "absolute", inset: 0, zIndex: 1,
                  background: `linear-gradient(135deg,${item.accent}22 0%,rgba(253,246,238,0.15) 100%)`,
                }}/>

                {/* Photo */}
                <div className="card-img-inner" style={{
                  position: "absolute", inset: 0,
                  transition: "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
                }}>
                  <Image src={item.img} alt={item.name} fill sizes="360px"
                    style={{ objectFit: "cover" }}/>
                </div>

                {/* Gradient fade into card body */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 80, zIndex: 2,
                  background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.85))",
                }}/>

                {/* Tag pill */}
                <div className="font-syne" style={{
                  position: "absolute", top: 14, left: 14, zIndex: 3,
                  background: "rgba(255,255,255,0.78)", backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: `1px solid ${item.accent}55`,
                  borderRadius: 50, padding: "5px 14px",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: item.accent,
                }}>{item.tag}</div>
              </div>

              {/* Body */}
              <div style={{ padding: "1.4rem 1.6rem 1.6rem" }}>
                <h3 className="font-playfair" style={{
                  fontSize: "1.08rem", fontWeight: 700,
                  color: "#0d0d0d", marginBottom: 8, lineHeight: 1.3,
                }}>{item.name}</h3>

                <p className="font-inter" style={{
                  fontSize: "0.78rem", color: "#5c3d2e",
                  lineHeight: 1.72, fontWeight: 300, marginBottom: 14,
                }}>{item.desc}</p>

                {/* Static detail line */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: item.accent, flexShrink: 0,
                  }}/>
                  <span className="font-inter" style={{
                    fontSize: "0.68rem", color: item.accent,
                    letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500,
                  }}>{item.detail}</span>
                </div>

                {/* Hover-reveal row */}
                <div className="card-reveal" style={{
                  marginTop: 16,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  opacity: 0,
                  transform: "translateY(8px)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }}>
                  <span className="font-inter" style={{
                    fontSize: "0.72rem", color: "#3d2b1f", fontWeight: 300, letterSpacing: "0.02em",
                  }}>Available in-store · Order via DM</span>
                  <span style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: item.accent,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: "0.85rem", flexShrink: 0,
                  }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order strip */}
        <div style={{
          marginTop: "4.5rem",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "2rem", alignItems: "center",
          background: "rgba(255,255,255,0.28)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1.5px solid rgba(255,255,255,0.6)",
          borderRadius: 28, padding: "3rem",
        }} className="order-strip">
          <div>
            <div className="font-inter" style={{
              fontSize: "0.68rem", letterSpacing: "0.32em", textTransform: "uppercase",
              color: "#c9a84c", marginBottom: "1rem", fontWeight: 400,
            }}>Order Online</div>
            <h3 className="font-playfair" style={{
              fontSize: "clamp(1.6rem,3vw,2.6rem)", fontWeight: 700,
              color: "#0d0d0d", marginBottom: "1rem", lineHeight: 1.15, fontStyle: "italic",
            }}>Order via WhatsApp<br/>or Instagram DM</h3>
            <p className="font-inter" style={{
              fontSize: "0.92rem", color: "#3d2b1f", lineHeight: 1.82,
              maxWidth: 360, marginBottom: "2rem", fontWeight: 300,
            }}>
              Skip the queue. Message us directly and we&apos;ll have your order
              ready when you arrive — the boutique way.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={WHATSAPP.url("order")}
                target="_blank" rel="noopener noreferrer" className="font-syne"
                style={{
                  background: "#25D366", color: "#fff",
                  padding: "13px 30px", borderRadius: 50,
                  fontSize: "0.78rem", fontWeight: 700,
                  letterSpacing: "0.06em", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(37,211,102,0.35)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a href="https://ig.me/m/abovegrndpdx"
                target="_blank" rel="noopener noreferrer" className="font-syne"
                style={{
                  background: "rgba(255,255,255,0.5)", color: "#0d0d0d",
                  padding: "13px 30px", borderRadius: 50,
                  fontSize: "0.78rem", fontWeight: 700,
                  letterSpacing: "0.06em", textDecoration: "none",
                  border: "1.5px solid rgba(255,255,255,0.85)",
                  backdropFilter: "blur(10px)",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "transform 0.25s, background 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.82)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.5)";
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#0d0d0d">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>

          <div style={{ position: "relative", height: 280 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 20, overflow: "hidden" }}>
              <Image src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85"
                alt="Above GRND cafe atmosphere" fill sizes="40vw"
                style={{ objectFit: "cover" }}/>
              <div style={{ position: "absolute", inset: 0, background: "rgba(245,230,210,0.15)" }}/>
            </div>
            <div className="float" style={{
              position: "absolute", bottom: -20, right: -12,
              width: 110, height: 110, borderRadius: "50%", overflow: "hidden",
              border: "4px solid rgba(255,255,255,0.95)",
              boxShadow: "0 16px 40px rgba(44,24,16,0.22)",
              animationDelay: "0.5s",
            }}>
              <Image src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&q=85"
                alt="Latte art" width={110} height={110}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}/>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .order-strip { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
