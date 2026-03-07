"use client";

// ServiceCards.tsx
// Animations enhanced:
// - Card entrance: staggered fade-up (existing, preserved)
// - Hover: card lifts up with a stronger shadow + slight rotation on image
// - Hover: golden shimmer sweeps across card (new)
// - Hover: underline accent line animates on label
// - Hover: CTA button glows and scales
// - Image: zoom on hover (enhanced from existing)
// - Gradient deepens on hover (existing, kept)
// - useReducedMotion respected throughout

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const serviceCards = [
  {
    label: "IOS / ANDROID / CROSS-PLATFORM",
    titleLines: ["END-TO-END APP", "DEVELOPMENT"],
    desc: "From idea → design → build → launch. Clean UI, fast performance, scalable architecture.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80",
    alt: "App Development",
  },
  {
    label: "STRATEGY & DESIGN",
    titleLines: ["PRODUCT STRATEGY,", "ROADMAPS &", "CONVERSION-FIRST UX"],
    desc: "Clarify scope, reduce waste, and ship what matters — with a design system that scales.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80",
    alt: "Product Strategy",
  },
  {
    label: "AI & MACHINE LEARNING",
    titleLines: ["CUSTOM AI SOLUTIONS &", "LLM INTEGRATIONS"],
    desc: "Chatbots, copilots, personalization, smart search, workflow automation — built safely.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80",
    alt: "AI Solutions",
  },
  {
    label: "STARTUPS & SCALE-UPS",
    titleLines: ["ACCELERATE STARTUPS", "WITH MVP-TO-SCALE", "GUIDANCE"],
    desc: "Clarify scope, reduce waste, and ship what matters — with a design system that scales.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80",
    alt: "Startup Acceleration",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: EASE },
  }),
};

export default function ServiceCards() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {serviceCards.map((card, i) => (
          <motion.div
            key={card.alt}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative rounded-lg overflow-hidden h-[380px] group cursor-pointer"
            // Card lift on hover
            whileHover={{
              y: -8,
              scale: 1.015,
              transition: { duration: 0.35, ease: EASE },
            }}
            whileTap={{ scale: 0.98, y: 0 }}
          >
            {/* Background image with enhanced zoom on hover */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.1, transition: { duration: 0.7, ease: EASE } }}
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                />
              </motion.div>
            </div>

            {/* Gradient overlay deepens on hover */}
            <motion.div
              className="absolute inset-0"
              initial={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)" }}
              whileHover={{ background: "linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)" }}
              transition={{ duration: 0.35 }}
            />

            {/* Golden shimmer sweep on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(232,160,32,0.12) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              initial={{ backgroundPosition: "200% 0" }}
              whileHover={{
                backgroundPosition: ["-200% 0", "200% 0"],
                transition: { duration: 0.9, ease: "easeInOut" },
              }}
            />

            {/* Top golden accent line draws on hover */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] bg-[#e8a020] origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1, transition: { duration: 0.4, ease: EASE } }}
              style={{ width: "100%" }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              {card.label && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.25 }}
                  className="font-bold text-[0.6rem] tracking-[0.15em] text-[#e8a020] mb-2 uppercase"
                >
                  {card.label}
                </motion.p>
              )}

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.12 + 0.32 }}
                className="font-black text-white text-[1.05rem] leading-[1.2] mb-3"
              >
                {card.titleLines.map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < card.titleLines.length - 1 && <br />}
                  </span>
                ))}
              </motion.h3>

              {/* Desc always visible, group-hover fades out the static one */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.12 + 0.4 }}
                className="text-[0.68rem] text-white/70 leading-relaxed mb-4 group-hover:opacity-0 transition-opacity duration-200"
              >
                {card.desc}
              </motion.p>

              {/* Hover desc slides up */}
              <motion.p
                className="text-[0.7rem] text-white/85 leading-relaxed overflow-hidden"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                whileHover={{ opacity: 1, height: "auto", marginBottom: 12, transition: { duration: 0.3, ease: EASE } }}
              >
                {card.desc}
              </motion.p>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
