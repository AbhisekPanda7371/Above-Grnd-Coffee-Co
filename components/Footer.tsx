"use client";
import { BRAND, WHATSAPP } from "@/lib/constants";
import LogoIcon from "./LogoIcon";

const COLS = [
  {
    title: "Our Services",
    links: [
      { label: "Specialty Coffee",  href: "#menu"    },
      { label: "Espresso Bar",      href: "#menu"    },
      { label: "Shaah Tea",         href: "#menu"    },
      { label: "Pastry & Bites",    href: "#menu"    },
      { label: "Catering",          href: WHATSAPP.url("general") },
    ],
  },
  {
    title: "Our Company",
    links: [
      { label: "About Us",          href: "#featured" },
      { label: "Our Story",         href: "#featured" },
      { label: "Sustainability",    href: "#featured" },
      { label: "Contact",           href: "#reserve"  },
      { label: "Careers",           href: WHATSAPP.url("general") },
    ],
  },
  {
    title: "Visit Us",
    links: [
      { label: "Portland, OR",      href: "https://maps.google.com/?q=Portland,OR" },
      { label: "Book a Table",      href: WHATSAPP.url("reserve") },
      { label: "Instagram",         href: BRAND.instagram },
      { label: "Gift Cards",        href: WHATSAPP.url("general") },
      { label: "Reserve a Table",   href: "#reserve" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" style={{
      background:         "rgba(255,255,255,0.38)",
      backdropFilter:     "blur(20px)",
      WebkitBackdropFilter:"blur(20px)",
      borderTop:          "1px solid rgba(255,255,255,0.58)",
      padding:            "4.5rem 0 2rem",
    }}>
      <div className="footer-grid" style={{
        maxWidth:1280, margin:"0 auto", padding:"0 2rem",
        display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr 1fr",
        gap:"3rem", marginBottom:"3rem",
      }}>

        {/* Brand column */}
        <div>
          <a href="#" aria-label="Above GRND Coffee Co. home" style={{
            display:"flex", alignItems:"center", gap:10,
            textDecoration:"none", marginBottom:"0.9rem",
          }}>
            <LogoIcon size={36} />
            <span className="font-playfair" style={{
              fontSize:"1.15rem", fontWeight:800, color:"#0d0d0d",
              letterSpacing:"0.02em", fontStyle:"italic",
            }}>Above GRND</span>
          </a>

          <p className="font-jost" style={{
            fontSize:"0.83rem", color:"#6B4C3B",
            lineHeight:1.8, maxWidth:230, marginBottom:"1.6rem", fontWeight:400,
          }}>
            Wake up to something special.<br />
            Rooted in culture. Risen in craft.<br />
            Portland, OR.
          </p>

          {/* Social links */}
          <div style={{ display:"flex", gap:10 }} role="list" aria-label="Social media links">
            {[
              {
                label: "Instagram",
                href:  BRAND.instagram,
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                ),
              },
              {
                label: "WhatsApp",
                href:  WHATSAPP.url("general"),
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.113 1.528 5.836L0 24l6.336-1.513A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.804 9.804 0 01-5.01-1.376l-.36-.214-3.732.891.932-3.628-.235-.372A9.78 9.78 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                ),
              },
            ].map(s => (
              <a key={s.label} href={s.href}
                target="_blank" rel="noopener noreferrer"
                role="listitem" aria-label={`${s.label} — Above GRND`}
                style={{
                  width:38, height:38, borderRadius:"50%",
                  background:"rgba(44,24,16,0.1)",
                  border:"1px solid rgba(44,24,16,0.15)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#2C1810", textDecoration:"none",
                  transition:"all 0.25s ease",
                }}
                onMouseEnter={e=>{
                  const el = e.currentTarget as HTMLElement;
                  el.style.background="#C9A84C";
                  el.style.color="#fff";
                  el.style.borderColor="#C9A84C";
                  el.style.transform="translateY(-2px)";
                }}
                onMouseLeave={e=>{
                  const el = e.currentTarget as HTMLElement;
                  el.style.background="rgba(44,24,16,0.1)";
                  el.style.color="#2C1810";
                  el.style.borderColor="rgba(44,24,16,0.15)";
                  el.style.transform="translateY(0)";
                }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {COLS.map(col => (
          <div key={col.title}>
            <h3 className="font-cormorant" style={{
              fontSize:"0.85rem", fontWeight:700, color:"#2C1810",
              letterSpacing:"0.06em", textTransform:"uppercase",
              marginBottom:"1.3rem",
            }}>{col.title}</h3>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.7rem" }}>
              {col.links.map(link => (
                <li key={link.label}>
                  <a href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-jost"
                    style={{
                      fontSize:"0.83rem", color:"#6B4C3B",
                      textDecoration:"none", transition:"color 0.2s ease",
                      lineHeight:1.5, fontWeight:400, display:"inline-block",
                    }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color="#C9A84C"; }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color="#6B4C3B"; }}
                  >{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth:1280, margin:"0 auto",
        padding:"1.5rem 2rem 0",
        borderTop:"1px solid rgba(44,24,16,0.08)",
        display:"flex", justifyContent:"space-between",
        alignItems:"center", flexWrap:"wrap", gap:"1rem",
      }}>
        <p className="font-jost" style={{
          fontSize:"0.72rem", color:"#6B4C3B", opacity:0.75,
        }}>
          &copy; {year} Above GRND Coffee Co. All rights reserved. Portland, OR.
        </p>
        <p className="font-cormorant" style={{
          fontSize:"0.82rem", color:"#C9A84C", opacity:0.85,
          fontStyle:"italic", fontWeight:600,
        }}>
          Rooted in culture. Risen in craft.
        </p>
      </div>

      <style>{`
        @media(max-width:900px){
          .footer-grid{ grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:560px){
          .footer-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
