"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const images = [
  {
    src: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=85",
    alt: "Espresso shot being pulled",
    // tall left column, spans 2 rows
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=85",
    alt: "Latte art close-up",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85",
    alt: "Warm cafe atmosphere",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=1200&q=85",
    alt: "Artisan cardamom pastry",
    // wide panoramic strip
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1520575822417-6f3fc9edd93e?w=800&q=85",
    alt: "Single-origin black coffee",
    span: "col-span-1 row-span-1",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative bg-alabaster py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-10 md:px-16">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-7">
              <span className="block w-10 h-px bg-champagne" />
              <span
                className="font-inter text-champagne uppercase"
                style={{ fontSize: "0.65rem", letterSpacing: "0.38em" }}
              >
                Gallery
              </span>
            </div>
            <h2
              className="font-syne font-black uppercase text-onyx leading-none"
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
                letterSpacing: "0.07em",
              }}
            >
              THE
              <br />
              ATMOSPHERE.
            </h2>
          </div>

          <p className="font-inter font-light text-onyx/45 text-sm leading-[1.8] max-w-[280px]">
            Every corner of Above GRND is designed to feel like a second home
            — warmth you can see, comfort you can taste.
          </p>
        </motion.div>

        {/* ── Asymmetric grid ── */}
        <div
          className="grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "260px",
          }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.75, ease, delay: i * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/15 transition-colors duration-500" />
              {/* Champagne border flash */}
              <div className="absolute inset-0 border border-transparent group-hover:border-champagne/25 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        {/* ── Instagram pull ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="mt-14 flex items-center justify-center gap-4"
        >
          <span className="block w-12 h-px bg-onyx/15" />
          <a
            href="https://ig.me/m/abovegrndpdx"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-xs text-onyx/35 hover:text-champagne tracking-widest uppercase transition-colors duration-300 cursor-pointer"
          >
            Follow @abovegrndpdx
          </a>
          <span className="block w-12 h-px bg-onyx/15" />
        </motion.div>
      </div>
    </section>
  );
}
