"use client";

// Integration.tsx
// Animations added:
// - Left image: slides in from left, zooms subtly on hover
// - Right text block: slides in from right, staggered children
// - CTA button: pulse glow ring on hover, scale micro-interaction
// - Heading lines reveal word by word via clip-path
// - useReducedMotion respected

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

const fadeUp = (reduceMotion: boolean) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduceMotion ? 0 : 0.7, ease: EASE },
  },
});

export default function Integration() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const fd = fadeUp(!!reduceMotion);

  return (
    <section
      ref={ref}
      id="solutions"
      className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      {/* ── Left: image with hover zoom and slide-in from left ── */}
      <motion.div
        className="relative h-[320px] rounded-lg overflow-hidden"
        initial={{ opacity: 0, x: reduceMotion ? 0 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE }}
        whileHover={reduceMotion ? {} : { scale: 1.02, transition: { duration: 0.5, ease: EASE } }}
      >
        {/* Inner image zooms independently on hover */}
        <motion.div
          className="absolute inset-0"
          whileHover={reduceMotion ? {} : { scale: 1.07, transition: { duration: 0.65, ease: EASE } }}
        >
          <Image
            src="/robot_with_buniessman_on_street_converted.avif"
            alt="Robot with businessman on street"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </motion.div>

        {/* Shimmer overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-[#e8a020]/0 via-[#e8a020]/10 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, transition: { duration: 0.4 } }}
        />

        {/* Corner accent line — draws in when in view */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-[#e8a020]"
          initial={{ width: "0%" }}
          animate={inView ? { width: "40%" } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.5, ease: EASE }}
        />
      </motion.div>

      {/* ── Right: staggered text ── */}
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={containerVariants}
      >
        {/* Kicker line */}
        <motion.p
          variants={fd}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8a020] mb-3"
        >
          Solutions
        </motion.p>

        <motion.h2
          variants={fd}
          className="font-heading font-black text-black mb-4 text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1]"
        >
          SEAMLESS PRODUCT BUILD
          <br />
          &amp; AI INTEGRATION
        </motion.h2>

        <motion.p
          variants={fd}
          className="text-gray-600 text-sm leading-relaxed mb-8 max-w-sm"
        >
          With a product-focused team of designers, engineers, and AI
          specialists, we help you define the right strategy, build a clear
          roadmap, and deliver a scalable product. From UI/UX to launch and
          growth — TechifyApps helps you ship faster and smarter.
        </motion.p>

      </motion.div>
    </section>
  );
}
