"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { testimonials } from "./data";
import { EASE } from "./animations";

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
              className="bg-white border border-[#f0ece4] rounded-2xl p-6 flex flex-col group"
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-[#f5f0e8] flex items-center justify-center text-lg mb-4"
                whileHover={{ scale: 1.15, rotate: 10, backgroundColor: "#e8a020" }}
                transition={{ duration: 0.2 }}
              >
                {t.emoji}
              </motion.div>

              <p className="text-[0.82rem] leading-relaxed text-[#555] flex-1 mb-5">
                "{t.quote}"
              </p>

              <motion.div
                className="h-px bg-[#f0ece4] mb-4"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: EASE, originX: 0 }}
              />

              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                  <Image src={t.img} alt={t.name} fill className="object-cover" sizes="36px" />
                </div>
                <div>
                  <div className="text-[0.8rem] font-black text-[#1e1a12]">â€” {t.name}</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.1em] text-[#999]">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
