"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { testimonials } from "./data";
import { EASE } from "./animations";

const badgeIcons: Record<string, JSX.Element> = {
  quality: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l4 4 10-10" />
    </svg>
  ),
  speed: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
  impact: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l2.4 5.2L20 10l-5.6 1.8L12 17l-2.4-5.2L4 10l5.6-1.8L12 3z" />
    </svg>
  ),
};

const badgeLabels: Record<string, string> = {
  quality: "Quality",
  speed: "Speed",
  impact: "Impact",
};

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="bg-[#fafaf8] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="text-xs font-bold uppercase tracking-[0.22em] text-[#e8a020] mb-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          What clients say
        </motion.p>
        <motion.h2
          className="font-black text-[clamp(2rem,4.5vw,3.2rem)] leading-[1] text-[#1e1a12] mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
        >
          TESTIMONIAL
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: EASE }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 48px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 },
              }}
              className="relative bg-white border border-[#f0ece4] rounded-3xl p-7 flex flex-col group overflow-hidden"
            >
              <div className="absolute -top-1 left-7 h-1 w-12 rounded-full bg-[#e8a020]" />

              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="flex items-center gap-2 rounded-full bg-[#fff1d6] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#a66b10]"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#c88b2a]">{badgeIcons[t.badge] ?? badgeIcons.quality}</span>
                  <span>{badgeLabels[t.badge] ?? "Quality"}</span>
                </motion.div>
                <div className="rounded-full bg-[#fff7e0] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#a66b10]">
                  {t.metric}
                </div>
              </div>

              <p className="text-[0.85rem] leading-relaxed text-[#5b4a2e] flex-1 mb-5">
                "{t.quote}"
              </p>

              <motion.div
                className="h-px bg-[#f0ece4] mb-4"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: EASE, originX: 0 }}
              />

              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#f0ece4]">
                  <Image src={t.img} alt={t.name} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <div className="text-[0.82rem] font-black text-[#1e1a12]">- {t.name}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.1em] text-[#999]">
                    {t.title} / {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
