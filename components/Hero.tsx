"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { HERO_CATEGORIES, HERO_CARDS, WHATSAPP, BRAND } from "@/lib/constants";
import LogoIcon   from "./LogoIcon";
import StarRating from "./ui/StarRating";
import PinIcon    from "./ui/PinIcon";

const CoffeeVideoAnim = dynamic(() => import("./CoffeeVideoAnim"), { ssr: false });

export default function Hero() {
  const secRef    = useRef<HTMLElement>(null);
  const heroImgRef= useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert?: () => void } = {};
    (async () => {
      const { gsap }        = await import("gsap");
      const { ScrollTrigger}= await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* entrance — staggered reveal */
      const tl = gsap.timeline({ defaults:{ ease:"power3.out" }, delay:0.1 });
      tl.fromTo(".h-eyebrow",{opacity:0,y:16},  {opacity:1,y:0,duration:0.5})
        .fromTo(".h-headline",{opacity:0,y:60},  {opacity:1,y:0,duration:0.7},"-=0.2")
        .fromTo(".h-sub",    {opacity:0,y:18},  {opacity:1,y:0,duration:0.5},"-=0.35")
        .fromTo(".h-cta",    {opacity:0,y:18},  {opacity:1,y:0,duration:0.45},"-=0.3")
        .fromTo(".h-cat",    {opacity:0,y:14},  {opacity:1,y:0,duration:0.4,stagger:0.07},"-=0.25")
        .fromTo(".h-img",    {opacity:0,scale:0.88,y:24},{opacity:1,scale:1,y:0,duration:1.0},"-=0.5")
        .fromTo(".h-card",   {opacity:0,y:36},  {opacity:1,y:0,duration:0.5,stagger:0.1},"-=0.4");

      /* parallax scroll */
      gsap.to(".h-img", {
        y:-70, ease:"none",
        scrollTrigger:{
          trigger: secRef.current!, start:"top top",
          end:"bottom top", scrub:1.5,
        },
      });

      ctx.revert = () => ScrollTrigger.getAll().forEach(t => t.kill());
    })();
    return () => ctx.revert?.();
  }, []);

  return (
    <section ref={secRef}
      style={{ minHeight:"100vh", paddingTop:90, paddingBottom:60 }}
      aria-label="Hero — Above GRND Coffee Co."
    >
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem" }}>

        {/* ── TOP ROW ── */}
        <div className="hero-row" style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:"2rem", alignItems:"flex-start",
        }}>

          {/* LEFT — copy */}
          <div style={{ paddingTop:"2.5rem" }}>

            {/* eyebrow */}
            <div className="h-eyebrow font-jost g-hidden" style={{
              display:"flex", alignItems:"center", gap:10,
              fontSize:"0.72rem", letterSpacing:"0.3em", textTransform:"uppercase",
              color:"#c9a84c", fontWeight:600, marginBottom:"1.2rem",
            }}>
              <LogoIcon size={28} />
              Above GRND Coffee Co.
            </div>

            {/* headline — single h1 for SEO */}
            <div style={{ overflow:"hidden" }}>
              <h1 className="h-headline font-playfair g-hidden" style={{
                fontSize:"clamp(3rem,7.5vw,7rem)", fontWeight:800,
                color:"#0d0d0d", lineHeight:0.98, letterSpacing:"-0.025em",
                margin:"0 0 1.5rem", fontStyle:"italic",
              }}>
                The Best<br />
                <span style={{ fontStyle:"normal" }}>For You.</span>
              </h1>
            </div>

            {/* sub */}
            <p className="h-sub font-jost g-hidden" style={{
              fontSize:"1rem", color:"#3d2b1f", lineHeight:1.9,
              maxWidth:400, marginBottom:"2rem", fontWeight:400,
              letterSpacing:"0.01em",
            }}>
              Rooted in culture, risen in craft. Portland&apos;s premium specialty
              coffee oasis — where every cup tells a story.
            </p>

            {/* CTAs */}
            <div className="h-cta g-hidden" style={{
              display:"flex", gap:"0.9rem", flexWrap:"wrap", marginBottom:"2.2rem",
            }}>
              <a href="#menu" className="btn-dark" aria-label="View our coffee menu">
                View Menu
              </a>
              <a href={WHATSAPP.url("order")} target="_blank" rel="noopener noreferrer"
                className="btn-outline" aria-label="Order now via WhatsApp"
                style={{ display:"inline-flex", alignItems:"center", gap:8 }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.113 1.528 5.836L0 24l6.336-1.513A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.804 9.804 0 01-5.01-1.376l-.36-.214-3.732.891.932-3.628-.235-.372A9.78 9.78 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
                Book a Table
              </a>
            </div>

            {/* category chips */}
            <div style={{ display:"flex", gap:"0.65rem", flexWrap:"wrap" }}>
              {HERO_CATEGORIES.map(c => (
                <div key={c.label} className="h-cat glass font-jost g-hidden" style={{
                  display:"flex", alignItems:"center", gap:7,
                  padding:"8px 16px", borderRadius:50,
                  fontSize:"0.77rem", fontWeight:500, color:"#2c1810",
                  cursor:"pointer", transition:"all 0.25s ease",
                }}
                  role="button" tabIndex={0} aria-label={c.label}
                  onMouseEnter={e=>{
                    const el = e.currentTarget as HTMLElement;
                    el.style.background="rgba(201,168,76,0.22)";
                    el.style.borderColor="rgba(201,168,76,0.5)";
                  }}
                  onMouseLeave={e=>{
                    const el = e.currentTarget as HTMLElement;
                    el.style.background="rgba(255,255,255,0.38)";
                    el.style.borderColor="rgba(255,255,255,0.7)";
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize:"1rem" }}>{c.emoji}</span>
                  {c.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — animation */}
          <div className="h-img g-hidden anim-hover-wrap" ref={heroImgRef} style={{
            position:"relative", height:520, minHeight:460, isolation:"isolate",
          }}>
            <CoffeeVideoAnim
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:1 }}
            />

            {/* 5-star badge */}
            <div className="float glass" style={{
              position:"absolute", bottom:"14%", left:"-2%",
              padding:"10px 18px", borderRadius:50, zIndex:3,
              display:"flex", alignItems:"center", gap:8,
            }} aria-label="5 star Google rating">
              <StarRating count={5} size={11} />
              <span className="font-cormorant" style={{
                fontSize:"0.78rem", fontWeight:600, color:"#0d0d0d", letterSpacing:"0.05em",
              }}>5.0 · Google</span>
            </div>

            {/* Portland tag */}
            <div className="float-slow" style={{
              position:"absolute", bottom:"4%", right:"5%", zIndex:3,
              background:"rgba(13,13,13,0.88)", backdropFilter:"blur(14px)",
              borderRadius:50, padding:"9px 18px",
              display:"flex", alignItems:"center", gap:7,
            }} aria-label="Located in Portland, OR">
              <PinIcon size={12} color="#c9a84c" />
              <span className="font-jost" style={{
                fontSize:"0.62rem", color:"#fff",
                letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:400,
              }}>Portland, OR</span>
            </div>

            {/* Artisan badge */}
            <div className="float-slow glass" style={{
              position:"absolute", top:"6%", right:"2%", zIndex:3,
              padding:"12px 18px", borderRadius:16, textAlign:"center",
            }}>
              <div className="font-playfair" style={{
                fontSize:"1.05rem", fontWeight:700, color:"#0d0d0d",
                lineHeight:1, fontStyle:"italic",
              }}>Artisan</div>
              <div className="font-jost" style={{
                fontSize:"0.55rem", color:"#5c3d2e",
                letterSpacing:"0.2em", marginTop:4,
                textTransform:"uppercase", fontWeight:400,
              }}>Craft Coffee</div>
            </div>
          </div>
        </div>

        {/* ── PRODUCT CARDS ── */}
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
          gap:"1.5rem", maxWidth:620, marginTop:"3.5rem",
        }}>
          {HERO_CARDS.map((card) => (
            <a
              key={card.name}
              href={WHATSAPP.url("menu")}
              target="_blank" rel="noopener noreferrer"
              className="h-card g-hidden"
              aria-label={`Order ${card.name} via WhatsApp`}
              style={{
                background:"rgba(255,255,255,0.42)",
                backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
                border:"1.5px solid rgba(255,255,255,0.72)",
                borderRadius:24, padding:"60px 20px 20px",
                position:"relative", display:"block",
                transition:"transform 0.3s ease, box-shadow 0.3s ease",
                cursor:"pointer", textDecoration:"none",
              }}
              onMouseEnter={e=>{
                const el = e.currentTarget as HTMLElement;
                el.style.transform="translateY(-7px)";
                el.style.boxShadow="0 28px 56px rgba(44,24,16,0.15)";
              }}
              onMouseLeave={e=>{
                const el = e.currentTarget as HTMLElement;
                el.style.transform="translateY(0)";
                el.style.boxShadow="none";
              }}
            >
              {/* Circular image */}
              <div style={{
                position:"absolute", top:-42, left:"50%", transform:"translateX(-50%)",
                width:86, height:86, borderRadius:"50%", overflow:"hidden",
                border:"3px solid rgba(255,255,255,0.95)",
                boxShadow:"0 8px 28px rgba(44,24,16,0.2)",
              }}>
                <Image src={card.img} alt={card.name} width={86} height={86}
                  style={{ objectFit:"cover", width:"100%", height:"100%" }}
                  loading="lazy" placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFEiExBhH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amaa1FqQmNIcnz5JLipLhaQVFSucgAcnJ7+qpQtEyVNuJdlvvyXVdS46oqUfyfJoopX//2Q=="
                />
              </div>

              {/* Tag */}
              <div className="font-jost" style={{
                textAlign:"center", fontSize:"0.58rem", letterSpacing:"0.22em",
                textTransform:"uppercase", color:"#c9a84c", fontWeight:600, marginBottom:5,
              }}>{card.tag}</div>

              {/* Name */}
              <div className="font-playfair" style={{
                textAlign:"center", fontSize:"1.02rem", fontWeight:700,
                color:"#0d0d0d", marginBottom:6, lineHeight:1.3,
              }}>{card.name}</div>

              {/* Desc */}
              <p className="font-jost" style={{
                textAlign:"center", fontSize:"0.76rem", color:"#5c3d2e",
                lineHeight:1.75, marginBottom:14, fontWeight:400,
              }}>{card.desc}</p>

              {/* Order CTA */}
              <div style={{ display:"flex", justifyContent:"center" }}>
                <span className="btn-dark" style={{ padding:"8px 22px", fontSize:"0.72rem" }}>
                  Enquire on WhatsApp
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        /* Desktop: side-by-side */
        .hero-row { grid-template-columns: 1fr 1fr !important; }

        /* Tablet */
        @media(max-width:900px){
          .hero-row { grid-template-columns: 1fr !important; }
          .h-img { height: 380px !important; min-height: 340px !important; }
        }

        /* Mobile */
        @media(max-width:600px){
          .h-img { height: 320px !important; min-height: 280px !important; }
        }
      `}</style>
    </section>
  );
}
