"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { productFeatures } from "./data";
import { EASE } from "./animations";

export default function ProductSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const ringStack = [
    { size: 200, opacity: 0.22, delay: 0 },
    { size: 280, opacity: 0.18, delay: 0.2 },
    { size: 360, opacity: 0.14, delay: 0.4 },
    { size: 440, opacity: 0.1, delay: 0.6 },
  ];

  return (
    <section ref={ref} id="product" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div>
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.22em] text-[#e8a020] mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            What we build
          </motion.p>
          <motion.h2
            className="font-black text-[clamp(2rem,4.5vw,3.2rem)] leading-[1] tracking-[-0.01em] text-[#1e1a12] mb-5"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          >
            PRODUCT
          </motion.h2>
          <motion.p
            className="text-[0.88rem] leading-relaxed text-[#666] max-w-sm mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            Our product suite is a comprehensive ecosystem designed for modern
            engagement. It includes immersive game development, sophisticated
            reward systems, and real-time analytics tools.
          </motion.p>

          <div className="flex flex-col gap-3 mb-8">
            {productFeatures.map((feat, i) => (
              <motion.div
                key={feat.label}
                className="flex items-center gap-3 group"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.08, ease: EASE }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
              >
                <span className="w-7 h-7 rounded-md bg-[#f5f0e8] flex items-center justify-center text-sm font-black text-[#e8a020] shrink-0 group-hover:bg-[#e8a020] group-hover:text-white transition-colors duration-200">
                  {feat.icon}
                </span>
                <span className="text-[0.85rem] text-[#333] font-medium">{feat.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.75, ease: EASE }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-2 border-[#1e1a12] text-[#1e1a12] text-xs font-black uppercase tracking-[0.1em] px-6 py-3 rounded hover:bg-[#1e1a12] hover:text-white transition-colors duration-200"
            >
              PRODUCT DETAILS
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="relative"
        >
          <div className="pointer-events-none absolute -top-24 -left-20 hidden h-[520px] w-[520px] md:block">
            {ringStack.map((ring) => (
              <motion.span
                key={`left-${ring.size}`}
                className="absolute rounded-full"
                style={{
                  width: ring.size,
                  height: ring.size,
                  left: 0,
                  top: 0,
                  opacity: ring.opacity,
                  borderWidth: 26,
                  borderStyle: "solid",
                  borderColor: "rgba(232, 145, 20, 0.6)",
                }}
                animate={
                  reduceMotion
                    ? { opacity: ring.opacity }
                    : { y: [0, -12, 0], scale: [0.985, 1.03, 1] }
                }
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: ring.delay,
                }}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute -top-24 -right-20 hidden h-[520px] w-[520px] md:block">
            {ringStack.map((ring) => (
              <motion.span
                key={ring.size}
                className="absolute rounded-full"
                style={{
                  width: ring.size,
                  height: ring.size,
                  right: 0,
                  top: 0,
                  opacity: ring.opacity,
                  borderWidth: 26,
                  borderStyle: "solid",
                  borderColor: "rgba(232, 145, 20, 0.6)",
                }}
                animate={
                  reduceMotion
                    ? { opacity: ring.opacity }
                    : { y: [0, -12, 0], scale: [0.985, 1.03, 1] }
                }
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: ring.delay,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 rounded-2xl overflow-hidden bg-[#1e1a12] p-8 min-h-[340px]">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, #e8a020 0, #e8a020 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #e8a020 0, #e8a020 1px, transparent 1px, transparent 40px)",
              }}
            />

            <div className="relative z-10">
              <motion.div
                className="inline-block bg-[#e8a020] text-black text-xs font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded mb-6"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                AI ECOSYSTEM
              </motion.div>

              <div className="space-y-4">
                {productFeatures.slice(0, 4).map((feat, i) => (
                  <motion.div
                    key={feat.label}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.5 + i * 0.09, ease: EASE }}
                    whileHover={{ backgroundColor: "rgba(232,160,32,0.12)", x: 4, transition: { duration: 0.2 } }}
                  >
                    <span className="text-lg">{feat.icon}</span>
                    <span className="text-white/80 text-xs font-medium">{feat.label}</span>
                    <motion.span
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e8a020]"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
