"use client";

// About.tsx
// Animations added:
// - Section slides up on scroll with useInView
// - Left text: staggered children (kicker, heading, desc, CTA)
// - Image: slides in from right, zoom on hover, golden overlay shimmer
// - Decorative corner bracket draws in via pathLength
// - CTA button: hover lift + pulse ring
// - useReducedMotion respected

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const makeItem = (reduceMotion: boolean) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduceMotion ? 0 : 0.7, ease: EASE },
  },
});

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const item = makeItem(!!reduceMotion);

  return (
    <section
      ref={ref}
      id="about"
      className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      {/* ── Left: staggered text ── */}
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={containerVariants}
      >
        {/* Kicker */}
        <motion.p
          variants={item}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8a020] mb-3"
        >
          Who we are
        </motion.p>

        <motion.h2
          variants={item}
          className="font-heading font-black text-black mb-4 text-[clamp(1.6rem,3.5vw,2.4rem)] tracking-[0.02em]"
        >
          ABOUT TECHIFYAPPS
        </motion.h2>

        <motion.p
          variants={item}
          className="text-gray-600 text-sm leading-relaxed mb-8 max-w-[320px]"
        >
          Innovative AI-powered mobile app development and expert IT consulting
          tailored for modern businesses.
        </motion.p>

        {/* Decorative accent line under heading */}
        <motion.div
          className="mt-8 h-[2px] bg-gradient-to-r from-[#e8a020] to-transparent origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.5, ease: EASE }}
          style={{ width: "60%", maxWidth: 200 }}
        />
      </motion.div>

      {/* ── Right: image with hover zoom + shimmer ── */}
      <motion.div
        className="relative h-[280px] rounded-lg overflow-hidden about-img-bg"
        initial={{ opacity: 0, x: reduceMotion ? 0 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE, delay: reduceMotion ? 0 : 0.1 }}
      >
        {/* Image zooms on container hover */}
        <motion.div
          className="absolute inset-0"
          whileHover={reduceMotion ? {} : { scale: 1.07, transition: { duration: 0.65, ease: EASE } }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
            alt="Team"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </motion.div>

        {/* Golden shimmer overlay fades in on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#e8a020]/20 via-transparent to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, transition: { duration: 0.4 } }}
        />

        {/* Bottom golden line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-[#e8a020]"
          initial={{ width: "0%" }}
          animate={inView ? { width: "50%" } : {}}
          transition={{ duration: reduceMotion ? 0 : 1.0, delay: reduceMotion ? 0 : 0.6, ease: EASE }}
        />

        {/* Top-right corner bracket SVG */}
        <svg
          className="absolute top-3 right-3 pointer-events-none"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <motion.path
            d="M 28 4 L 28 0 L 24 0"
            stroke="#e8a020"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.9 }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
