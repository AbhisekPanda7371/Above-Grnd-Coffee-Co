"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const categories = [
  {
    id: "specialty",
    index: "01",
    category: "Specialty Creations",
    subtitle: "The Cult Classics",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=85",
    imageAlt: "Signature latte art",
    items: [
      {
        name: "Signature Banana Milk Latte",
        description:
          "Perfectly extracted espresso layered over rich, creamy house-made banana milk. Sweet, smooth, and entirely unique.",
        tag: "Most Loved",
      },
      {
        name: "Somali Spiced Tea — Shaah",
        description:
          "A deeply aromatic, traditional black tea slow-brewed with cardamom, cinnamon, cloves, and ginger. Served velvety smooth.",
        tag: "Cultural Heritage",
      },
      {
        name: "Spiced Cortado",
        description:
          "Equal parts espresso and steamed milk, infused with a subtle, proprietary blend of warm house spices.",
        tag: "House Blend",
      },
    ],
  },
  {
    id: "espresso",
    index: "02",
    category: "Espresso Standards",
    subtitle: "The Essentials",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=85",
    imageAlt: "Espresso shot being pulled",
    items: [
      {
        name: "Espresso / Americano",
        description:
          "Clean, bright, and rotatably sourced single-origin beans.",
        tag: "Single Origin",
      },
      {
        name: "Latte / Cappuccino",
        description:
          "Silky micro-foam paired with our signature espresso blend.",
        tag: "Classic",
      },
      {
        name: "Matcha Latte",
        description:
          "Premium ceremonial-grade Japanese matcha whisked to order with your choice of milk.",
        tag: "Ceremonial Grade",
      },
    ],
  },
  {
    id: "bites",
    index: "03",
    category: "Elevated Bites",
    subtitle: "The Accompaniments",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=85",
    imageAlt: "Artisan cardamom pastry",
    items: [
      {
        name: "Cardamom Rose Loaf",
        description:
          "A moist, delicately spiced tea cake topped with a subtle floral glaze.",
        tag: "Fresh Daily",
      },
      {
        name: "Seasonal Pastry Selection",
        description:
          "Locally sourced, premium artisanal pastries baked fresh daily.",
        tag: "Local & Seasonal",
      },
    ],
  },
];

export default function Menu() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="menu"
      ref={ref}
      className="relative bg-onyx py-28 md:py-40 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(ellipse at 100% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "40%",
            height: "50%",
            background:
              "radial-gradient(ellipse at 0% 100%, rgba(44,62,43,0.1) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-10 md:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease }}
          className="mb-24 md:mb-28"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-10 h-px bg-champagne" />
            <span
              className="font-inter text-champagne uppercase"
              style={{ fontSize: "0.62rem", letterSpacing: "0.4em" }}
            >
              The Menu
            </span>
          </div>
          <h2
            className="font-syne font-black uppercase text-alabaster leading-none"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 9rem)",
              letterSpacing: "0.07em",
            }}
          >
            CRAFTED
            <br />
            <span style={{ color: "#D4AF37" }}>WITH</span>
            <br />
            INTENTION.
          </h2>
        </motion.div>

        {/* ── Categories — glass card layout ── */}
        <div className="space-y-10 md:space-y-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: ci * 0.15 }}
              style={{
                background: "rgba(255,255,255,0.032)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="grid md:grid-cols-[280px_1fr] gap-0">

                {/* Image panel */}
                <div className="relative h-56 md:h-auto overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Glass overlay on image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(13,13,13,0.5) 100%)",
                    }}
                  />
                  {/* Category index */}
                  <div className="absolute top-5 left-5">
                    <span
                      className="font-syne font-black text-alabaster/20"
                      style={{ fontSize: "3.5rem", letterSpacing: "0.05em", lineHeight: 1 }}
                    >
                      {cat.index}
                    </span>
                  </div>
                </div>

                {/* Items panel */}
                <div className="p-8 md:p-10">
                  {/* Category label */}
                  <div className="flex items-end gap-5 mb-8 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <p
                        className="font-inter text-alabaster/28 uppercase mb-1.5"
                        style={{ fontSize: "0.58rem", letterSpacing: "0.38em" }}
                      >
                        {cat.subtitle}
                      </p>
                      <h3
                        className="font-syne font-bold uppercase text-alabaster"
                        style={{
                          fontSize: "clamp(0.9rem, 2vw, 1.35rem)",
                          letterSpacing: "0.14em",
                        }}
                      >
                        {cat.category}
                      </h3>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-0 divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    {cat.items.map((item, ii) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.55,
                          ease,
                          delay: ci * 0.15 + ii * 0.08 + 0.25,
                        }}
                        className="group py-5 grid sm:grid-cols-[1fr_auto] gap-4 items-start cursor-default"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-1.5">
                            <h4
                              className="font-syne font-semibold text-alabaster group-hover:text-champagne transition-colors duration-300"
                              style={{ fontSize: "0.92rem", letterSpacing: "0.05em" }}
                            >
                              {item.name}
                            </h4>
                          </div>
                          <p
                            className="font-inter font-light text-alabaster/35 leading-[1.75]"
                            style={{ fontSize: "0.82rem" }}
                          >
                            {item.description}
                          </p>
                        </div>
                        {/* Tag badge */}
                        <span
                          className="shrink-0 mt-0.5 font-inter uppercase text-champagne/60"
                          style={{
                            fontSize: "0.52rem",
                            letterSpacing: "0.28em",
                            paddingTop: "3px",
                          }}
                        >
                          {item.tag}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.9 }}
          className="mt-16 pt-10 border-t border-alabaster/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <p className="font-inter text-sm text-alabaster/25 leading-relaxed max-w-sm">
            Menu offerings rotate with the seasons. Ask your barista about
            today&rsquo;s featured specials.
          </p>
          <a
            href="#reserve"
            className="font-syne text-xs tracking-widest uppercase text-onyx bg-champagne px-9 py-4 hover:bg-alabaster transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            Visit Us Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}
