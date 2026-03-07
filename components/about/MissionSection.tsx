"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { EASE } from "./animations";

export default function MissionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="bg-[#fafaf8] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.22em] text-[#e8a020] mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Our Purpose
          </motion.p>
          <motion.h2
            className="font-black text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.02em] text-[#1e1a12]"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
          >
            OUR
            <br />
            MISSION
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <motion.h3
              className="font-black text-[clamp(1.4rem,2.5vw,1.9rem)] text-[#1e1a12] leading-[1.15] mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            >
              MAKE AI PRACTICAL,
              <br />
              VALUABLE, AND MEASURABLE.
            </motion.h3>
            <motion.p
              className="text-[0.88rem] leading-relaxed text-[#666] max-w-sm mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              To deliver practical, data-driven, and highly scalable AI products
              that create measurable impact for our clients. We strive for
              excellence in performance, security, and innovation.
            </motion.p>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            >
              <div className="flex flex-col gap-1">
                {["DATA", "DATA", "DATA", "DATA", "DATA"].map((d, i) => (
                  <motion.div
                    key={i}
                    className="text-[0.62rem] font-black tracking-[0.1em] text-[#1e1a12] bg-[#f0ece4] px-2 py-1 rounded-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.5 + i * 0.06, ease: EASE }}
                  >
                    {d}
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex items-center"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.85, ease: EASE }}
                style={{ originX: 0 }}
              >
                <div className="h-[2px] w-10 bg-[#e8a020]" />
                <svg width="10" height="10" viewBox="0 0 10 10" className="-ml-0.5">
                  <polygon points="0,1 9,5 0,9" fill="#e8a020" />
                </svg>
              </motion.div>

              <motion.div
                className="w-12 h-12 rounded-lg bg-[#1e1a12] flex items-center justify-center text-[0.7rem] font-black tracking-[0.1em] text-white"
                initial={{ scale: 0, rotate: -20 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                DB
              </motion.div>

              <motion.div
                className="flex items-center"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
                style={{ originX: 0 }}
              >
                <div className="h-[2px] w-10 bg-[#e8a020]" />
                <svg width="10" height="10" viewBox="0 0 10 10" className="-ml-0.5">
                  <polygon points="0,1 9,5 0,9" fill="#e8a020" />
                </svg>
              </motion.div>

              <motion.div
                className="w-12 h-12 rounded-lg bg-[#e8a020] flex items-center justify-center text-[0.7rem] font-black tracking-[0.1em] text-[#1e1a12]"
                initial={{ scale: 0, rotate: 20 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.2 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                CH
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.35, ease: EASE }}
          >
            <div className="bg-white border border-[#f0ece4] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#999] mb-6">
                PRODUCT
              </p>
              {[
                { icon: "OK", label: "Value", color: "#1e1a12" },
                { icon: "UP", label: "267 value", color: "#e8a020" },
                { icon: "+", label: "181 metrics", color: "#1e1a12" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 mb-4 last:mb-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.5 + i * 0.1, ease: EASE }}
                  whileHover={{ x: 4 }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold text-[#1e1a12]">{item.label}</span>
                </motion.div>
              ))}

              <motion.div
                className="my-6 h-px bg-[#f0ece4]"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
                style={{ originX: 0 }}
              />

              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { val: "99.9%", label: "Uptime" },
                  { val: "6wk", label: "MVP" },
                  { val: "50+", label: "AI workflows" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.08 }}
                  >
                    <div className="font-black text-[1.3rem] text-[#1e1a12]">{stat.val}</div>
                    <div className="text-[0.62rem] uppercase tracking-[0.1em] text-[#999] mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

