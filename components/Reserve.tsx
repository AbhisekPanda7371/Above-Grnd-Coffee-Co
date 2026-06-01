"use client";
import { useEffect, useRef } from "react";
import { WHATSAPP, HOURS } from "@/lib/constants";

export default function Reserve() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap }         = await import("gsap");
      const { ScrollTrigger }= await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;

      gsap.fromTo(".reserve-text",
        { opacity:0, y:40 },
        { opacity:1, y:0, duration:0.9, ease:"power3.out",
          scrollTrigger:{ trigger:ref.current, start:"top 75%" } }
      );
      gsap.fromTo(".reserve-map",
        { opacity:0, y:30, scale:0.97 },
        { opacity:1, y:0, scale:1, duration:1.0, ease:"power3.out",
          scrollTrigger:{ trigger:ref.current, start:"top 72%" }, delay:0.15 }
      );
    })();
  }, []);

  const WA_URL = `https://wa.me/917653904858?text=${encodeURIComponent(
    "Hello Above GRND Coffee Co.! I'd like to reserve a table.\n\n- Name: \n- Date & Time: \n- No. of Guests: "
  )}`;

  return (
    <section id="reserve" ref={ref} style={{
      padding:"6rem 0 0",
      background:"rgba(255,255,255,0.14)",
      backdropFilter:"blur(10px)",
      WebkitBackdropFilter:"blur(10px)",
      borderTop:"1px solid rgba(255,255,255,0.4)",
    }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem" }}>

        {/* ── TOP: text + CTA ── */}
        <div className="reserve-text reserve-grid" style={{
          display:"grid", gridTemplateColumns:"1fr auto",
          alignItems:"center", gap:"3rem", marginBottom:"3rem",
        }}>

          <div>
            <div className="font-jost" style={{
              fontSize:"0.68rem", letterSpacing:"0.35em",
              textTransform:"uppercase", color:"#C9A84C", marginBottom:"1rem",
            }}>
              Let&apos;s Talk
            </div>

            <h2 className="font-playfair" style={{
              fontSize:"clamp(2rem,5vw,3.8rem)", fontWeight:800,
              color:"#0d0d0d", lineHeight:1.08,
              marginBottom:"1.2rem", fontStyle:"italic",
            }}>
              Reserve a Table<br />
              <span style={{ fontStyle:"normal" }}>or Place an Order</span>
            </h2>

            <p className="font-jost" style={{
              fontSize:"0.95rem", color:"#3d2b1f",
              lineHeight:1.9, maxWidth:500, fontWeight:400,
              marginBottom:"2rem",
            }}>
              Skip the queue — message us directly and we&apos;ll have your
              order ready when you arrive. Reserve a table or simply say hello.
              The best hospitality starts with a real conversation.
            </p>

            {/* Hours */}
            <div style={{ display:"flex", gap:"2.5rem", flexWrap:"wrap" }}>
              {HOURS.map(h => (
                <div key={h.day}>
                  <div className="font-jost" style={{
                    fontSize:"0.6rem", color:"#C9A84C",
                    letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:3,
                  }}>{h.day}</div>
                  <div className="font-cormorant" style={{
                    fontSize:"1rem", fontWeight:700, color:"#2C1810",
                  }}>{h.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            aria-label="Reserve a table via WhatsApp"
            style={{
              background:"#2C1810", color:"#fff",
              padding:"18px 38px", borderRadius:50,
              fontSize:"0.85rem", fontWeight:700,
              letterSpacing:"0.08em", textTransform:"uppercase",
              textDecoration:"none", whiteSpace:"nowrap",
              transition:"all 0.3s ease",
              boxShadow:"0 12px 40px rgba(44,24,16,0.22)",
              display:"flex", alignItems:"center", gap:10,
            }}
            onMouseEnter={e=>{
              const el = e.currentTarget as HTMLElement;
              el.style.background="#C9A84C";
              el.style.transform="translateY(-2px)";
              el.style.boxShadow="0 16px 48px rgba(201,168,76,0.35)";
            }}
            onMouseLeave={e=>{
              const el = e.currentTarget as HTMLElement;
              el.style.background="#2C1810";
              el.style.transform="translateY(0)";
              el.style.boxShadow="0 12px 40px rgba(44,24,16,0.22)";
            }}
          >
            {/* WhatsApp icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.113 1.528 5.836L0 24l6.336-1.513A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.804 9.804 0 01-5.01-1.376l-.36-.214-3.732.891.932-3.628-.235-.372A9.78 9.78 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
            Book a Table
          </a>
        </div>

        {/* ── MAP ── */}
        <div className="reserve-map" style={{
          borderRadius:"24px 24px 0 0", overflow:"hidden",
          boxShadow:"0 -8px 48px rgba(44,24,16,0.1)",
          border:"1.5px solid rgba(255,255,255,0.7)",
          borderBottom:"none",
          height:380, position:"relative",
        }}>
          {/* Glass overlay strip at top */}
          <div style={{
            position:"absolute", top:0, left:0, right:0, height:48,
            background:"rgba(253,246,238,0.88)",
            backdropFilter:"blur(12px)",
            borderBottom:"1px solid rgba(201,168,76,0.2)",
            display:"flex", alignItems:"center", padding:"0 20px",
            gap:10, zIndex:2,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 18" fill="#C9A84C" aria-hidden="true">
              <path d="M7 0C4.24 0 2 2.24 2 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z"/>
              <circle cx="7" cy="5" r="2" fill="rgba(255,252,248,0.9)"/>
            </svg>
            <span className="font-jost" style={{
              fontSize:"0.72rem", color:"#2C1810",
              letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600,
            }}>Above GRND Coffee Co. — Portland, OR</span>
            <a href="https://share.google/taYMsld1CVQcTkvct"
              target="_blank" rel="noopener noreferrer"
              className="font-jost"
              style={{
                marginLeft:"auto", fontSize:"0.65rem", color:"#C9A84C",
                textDecoration:"none", fontWeight:600, letterSpacing:"0.08em",
                transition:"opacity 0.2s",
              }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.opacity="0.7"; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.opacity="1"; }}
            >Open in Maps ↗</a>
          </div>

          {/* Google Maps iframe */}
          <iframe
            title="Above GRND Coffee Co. location"
            src="https://maps.google.com/maps?q=Portland,+OR+97201&output=embed&z=14&iwloc=&t=&hl=en"
            width="100%"
            height="100%"
            style={{ border:"none", display:"block", marginTop:0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Map showing Above GRND Coffee Co. location in Portland, OR"
          />
        </div>
      </div>

      <style>{`
        @media(max-width:640px){
          .reserve-grid { grid-template-columns: 1fr !important; }
          .reserve-grid > a { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
