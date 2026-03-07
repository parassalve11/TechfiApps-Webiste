"use client";

// ServicesStrip.tsx
// Animations added:
// - Slide-in from bottom with stagger per item using useInView
// - Hover: item scale up + golden glow text
// - Diamond separator fades in with delay
// - useReducedMotion respected throughout

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { servicesStrip } from "@/lib/homeData";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServicesStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const diamond = String.fromCharCode(9830);

  return (
    <div ref={ref} className="services-strip py-4 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {servicesStrip.map((item, index) => (
          <div key={item} className="flex items-center gap-4">
            {/* Animated diamond separator */}
            {index > 0 && (
              <motion.span
                className="text-yellow-500 hidden sm:block"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: reduceMotion ? 0 : index * 0.08, ease: EASE }}
              >
                {diamond}
              </motion.span>
            )}

            {/* Animated service label */}
            <motion.span
              className="font-heading font-bold text-[0.78rem] tracking-[0.1em] text-white inline-block"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : index * 0.09,
                ease: EASE,
              }}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      scale: 1.06,
                      color: "#e8a020",
                      transition: { duration: 0.18 },
                    }
              }
              style={{ cursor: "default" }}
            >
              {item}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}