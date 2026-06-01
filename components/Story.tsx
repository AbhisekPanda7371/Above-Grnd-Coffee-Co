"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      id="story"
      ref={ref}
      className="relative bg-alabaster overflow-hidden py-28 md:py-40"
    >
      {/* Moss left border accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-moss" />

      <div className="max-w-7xl mx-auto px-10 md:px-16 grid md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* ── Text column ── */}
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-9">
            <span className="block w-10 h-px bg-champagne" />
            <span
              className="font-inter text-champagne uppercase"
              style={{ fontSize: "0.65rem", letterSpacing: "0.38em" }}
            >
              Our Story
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-syne font-black uppercase text-onyx leading-none mb-9"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
              letterSpacing: "0.05em",
            }}
          >
            WHERE TWO
            <br />
            WORLDS
            <br />
            <span style={{ color: "#2C3E2B" }}>COLLIDE.</span>
          </h2>

          {/* Body copy */}
          <p className="font-inter font-light text-onyx/65 text-base leading-[1.75] mb-5 max-w-[420px]">
            Above GRND isn&rsquo;t just a coffee shop — it&rsquo;s a cultural
            intersection. We bring together the precision of modern specialty
            coffee and the warmth of a vibrant community oasis right in the
            heart of Portland.
          </p>
          <p className="font-inter font-light text-onyx/65 text-base leading-[1.75] mb-12 max-w-[420px]">
            From our cult-favourite Banana Milk Latte to the deeply aromatic
            Somali Spiced Tea, every cup tells a story of heritage, craft, and
            belonging — brewed with intention, served with soul.
          </p>

          {/* Arrow CTA */}
          <a
            href="#menu"
            className="inline-flex items-center gap-4 font-syne text-xs tracking-widest uppercase text-onyx hover:text-champagne transition-colors duration-300 cursor-pointer group"
          >
            Discover the Menu
            <span className="block h-px bg-onyx group-hover:bg-champagne transition-all duration-300 w-8 group-hover:w-16" />
          </a>
        </motion.div>

        {/* ── Image column ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
          className="relative"
        >
          <div className="relative h-[480px] md:h-[600px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=960&q=85"
              alt="Specialty coffee being carefully poured"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Champagne frame accent */}
          <div className="absolute -bottom-5 -right-5 w-28 h-28 border border-champagne/35 pointer-events-none" />
          {/* Moss corner accent */}
          <div className="absolute -top-4 -left-4 w-16 h-16 border border-moss/25 pointer-events-none" />
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.55 }}
        className="max-w-7xl mx-auto px-10 md:px-16 mt-24 pt-12 border-t border-onyx/10"
      >
        <div className="grid grid-cols-3 gap-6 md:gap-14 max-w-xl">
          {[
            { number: "100%", label: "Single Origin" },
            { number: "PDX", label: "Portland Roots" },
            { number: "∞", label: "Cultural Heart" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-syne font-black text-onyx leading-none mb-2"
                style={{
                  fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
                  letterSpacing: "0.04em",
                }}
              >
                {stat.number}
              </div>
              <div
                className="font-inter text-onyx/35 uppercase"
                style={{ fontSize: "0.62rem", letterSpacing: "0.3em" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
