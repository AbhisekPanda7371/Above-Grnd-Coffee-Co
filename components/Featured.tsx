"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import StarRating from "./ui/StarRating";

// SVG coffee bean shape
const CoffeeBeanSVG = ({
  size = 40,
  opacity = 0.55,
  rotate = 0,
  color = "#5C2D0A",
}: {
  size?: number;
  opacity?: number;
  rotate?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 40 52"
    style={{ opacity, transform: `rotate(${rotate}deg)` }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="20" cy="26" rx="18" ry="24" fill={color} />
    <path
      d="M20 4 Q28 14 20 26 Q12 38 20 48"
      stroke="rgba(255,255,255,0.25)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function Featured() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!ref.current) return;

      gsap.fromTo(
        ".feat-text",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".feat-img",
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".feat-bean",
        { opacity: 0, rotate: 0, scale: 0.5 },
        {
          opacity: 1,
          rotate: "+=180",
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
          },
        }
      );
    };

    initGSAP();
  }, []);

  return (
    <section
      id="featured"
      ref={ref}
      style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}
    >
      {/* Scattered coffee beans — decorative */}
      <div className="feat-bean" style={{ position: "absolute", top: "8%", left: "5%", opacity: 0 }}>
        <CoffeeBeanSVG size={48} rotate={25} />
      </div>
      <div className="feat-bean" style={{ position: "absolute", top: "20%", left: "18%", opacity: 0 }}>
        <CoffeeBeanSVG size={32} rotate={-40} color="#3D1A08" />
      </div>
      <div className="feat-bean" style={{ position: "absolute", top: "5%", right: "22%", opacity: 0 }}>
        <CoffeeBeanSVG size={36} rotate={70} />
      </div>
      <div className="feat-bean" style={{ position: "absolute", bottom: "15%", right: "8%", opacity: 0 }}>
        <CoffeeBeanSVG size={44} rotate={-20} color="#4A2510" />
      </div>
      <div className="feat-bean" style={{ position: "absolute", bottom: "30%", left: "8%", opacity: 0 }}>
        <CoffeeBeanSVG size={28} rotate={55} />
      </div>
      <div className="feat-bean" style={{ position: "absolute", top: "45%", right: "5%", opacity: 0 }}>
        <CoffeeBeanSVG size={38} rotate={-65} color="#6B3515" />
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="feat-grid"
      >
        {/* LEFT — Text */}
        <div className="feat-text" style={{ opacity: 0 }}>
          <div
            className="font-inter"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#D4AF37",
              marginBottom: "1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "block",
                width: 32,
                height: 1,
                background: "#D4AF37",
              }}
            />
            About Us
          </div>

          <h2
            className="font-playfair"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              fontWeight: 800,
              color: "#0d0d0d",
              lineHeight: 1.08,
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
              fontStyle: "italic",
            }}
          >
            Where Two Worlds
            <br />
            <span style={{ color: "#2C3E2B", fontStyle: "normal" }}>Collide.</span>
          </h2>

          <p
            className="font-inter"
            style={{
              fontSize: "0.97rem",
              color: "#3d2b1f",
              lineHeight: 1.9,
              marginBottom: "1.2rem",
              maxWidth: "440px",
              fontWeight: 300,
            }}
          >
            Above GRND is Portland's premium specialty coffee oasis — a
            masterful blend of modern minimalist design and vibrant cultural
            warmth. From our signature Banana Milk Latte to the deeply aromatic
            Somali Spiced Tea, every cup is crafted with soul.
          </p>

          <p
            className="font-inter"
            style={{
              fontSize: "0.97rem",
              color: "#3d2b1f",
              lineHeight: 1.9,
              marginBottom: "2.5rem",
              maxWidth: "440px",
              fontWeight: 300,
            }}
          >
            We source single-origin beans, work with local bakers, and brew
            each drink to order — because you deserve nothing less than the best.
          </p>

          <a
            href="#menu"
            className="font-syne"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              color: "#2C1810",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#D4AF37";
              (e.currentTarget.querySelector(".arrow-line") as HTMLElement).style.width =
                "56px";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#2C1810";
              (e.currentTarget.querySelector(".arrow-line") as HTMLElement).style.width =
                "28px";
            }}
          >
            Learn More
            <span
              className="arrow-line"
              style={{
                display: "block",
                height: 2,
                width: 28,
                background: "currentColor",
                transition: "width 0.3s",
                borderRadius: 1,
              }}
            />
          </a>
        </div>

        {/* RIGHT — image cluster */}
        <div
          className="feat-img"
          style={{ position: "relative", height: "520px", opacity: 0 }}
        >
          {/* Glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 320, height: 320, borderRadius: "50%",
            background: "radial-gradient(circle,rgba(201,168,76,0.2) 0%,transparent 70%)",
            filter: "blur(30px)", pointerEvents: "none",
          }}/>

          {/* Main image */}
          <div style={{
            position: "absolute", top: "8%", left: "8%", right: "0", bottom: "8%",
            borderRadius: 28, overflow: "hidden",
            boxShadow: "0 40px 80px rgba(44,24,16,0.2)",
          }}>
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85"
              alt="Above GRND specialty coffee"
              fill sizes="40vw"
              style={{ objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg,rgba(201,168,76,0.08) 0%,transparent 55%)",
            }}/>
          </div>

          {/* Single origin badge */}
          <div className="float glass" style={{
            position: "absolute", top: "4%", left: "0",
            padding: "14px 20px", minWidth: 150,
            animationDelay: "0.3s", borderRadius: 18,
          }}>
            <div className="font-inter" style={{
              fontSize: "0.58rem", color: "#c9a84c",
              letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 5,
            }}>Single Origin</div>
            <div className="font-playfair" style={{
              fontSize: "1.5rem", fontWeight: 800, color: "#0d0d0d", lineHeight: 1,
            }}>100%</div>
            <div className="font-inter" style={{
              fontSize: "0.7rem", color: "#5c3d2e", fontWeight: 300, marginTop: 3,
            }}>Specialty Grade</div>
          </div>

          {/* Stars badge */}
          <div className="float-slow glass" style={{
            position: "absolute", bottom: "30%", left: "0",
            padding: "11px 18px", borderRadius: 50,
            display: "flex", alignItems: "center", gap: 6, animationDelay: "1.2s",
          }}>
            <StarRating count={5} size={11} />
            <span className="font-inter" style={{
              fontSize: "0.72rem", color: "#0d0d0d", fontWeight: 600,
            }}>5.0 · Google</span>
          </div>

          {/* East Africa tag */}
          <div className="float" style={{
            position: "absolute", bottom: "6%", right: "2%",
            background: "rgba(13,13,13,0.88)", backdropFilter: "blur(14px)",
            borderRadius: 50, padding: "10px 20px",
            display: "flex", alignItems: "center", gap: 7, animationDelay: "0.8s",
          }}>
            <span style={{ fontSize: "0.82rem" }}>🌍</span>
            <div>
              <div className="font-syne" style={{
                fontSize: "0.7rem", fontWeight: 700, color: "#fff", lineHeight: 1,
              }}>East African</div>
              <div className="font-inter" style={{
                fontSize: "0.56rem", color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.15em", textTransform: "uppercase",
              }}>Single Origin</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .feat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
