"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { EASE } from "./animations";

const missionSignals = [
  {
    label: "Data Quality",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l4 4 10-10" />
      </svg>
    ),
  },
  {
    label: "Model Safety",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 5-3 9-7 11-4-2-7-6-7-11V6l7-3z" />
      </svg>
    ),
  },
  {
    label: "Ops Velocity",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    label: "Customer Value",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.4 5.2L20 10l-5.6 1.8L12 17l-2.4-5.2L4 10l5.6-1.8L12 3z" />
      </svg>
    ),
  },
  {
    label: "Compliance",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 6V4h8v2" />
        <path d="M9 13l2 2 4-4" />
      </svg>
    ),
  },
];

const missionPillars = [
  {
    title: "Trusted AI",
    desc: "Governed models with traceability and risk controls.",
    stat: "98%",
    value: 98,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 5-3 9-7 11-4-2-7-6-7-11V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Rapid Delivery",
    desc: "Launch-ready MVPs in weeks, not quarters.",
    stat: "6 wks",
    value: 70,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h7" />
        <path d="M9 7l5 5-5 5" />
        <path d="M14 5h6v14h-6" />
      </svg>
    ),
  },
  {
    title: "Measurable Impact",
    desc: "Always-on metrics tied to business outcomes.",
    stat: "181",
    value: 82,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19h16" />
        <rect x="6" y="10" width="3" height="6" rx="1" />
        <rect x="11" y="7" width="3" height="9" rx="1" />
        <rect x="16" y="12" width="3" height="4" rx="1" />
      </svg>
    ),
  },
];

const impactRows = [
  {
    label: "Value secured",
    detail: "OKR alignment",
    color: "#1e1a12",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l4 4 10-10" />
      </svg>
    ),
  },
  {
    label: "267% lift",
    detail: "Engagement growth",
    color: "#e8a020",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 7-7" />
        <path d="M14 5h7v7" />
      </svg>
    ),
  },
  {
    label: "181 signals",
    detail: "Live health metrics",
    color: "#1e1a12",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h3l2-4 3 8 2-4h6" />
      </svg>
    ),
  },
];

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
            className="heading-open font-black text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.02em]"
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
              className="heading-open font-black text-[clamp(1.4rem,2.5vw,1.9rem)] leading-[1.15] mb-5"
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
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            >
              <div className="flex flex-col gap-2">
                {missionSignals.map((signal, i) => (
                  <motion.div
                    key={signal.label}
                    className="flex items-center gap-2 text-[0.62rem] font-black tracking-[0.1em] text-[#1e1a12] bg-[#f0ece4] px-2.5 py-1.5 rounded-md uppercase"
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.5 + i * 0.06, ease: EASE }}
                    whileHover={{ x: 4, backgroundColor: "#e8a020", color: "#1e1a12" }}
                  >
                    <span className="text-[#e8a020]">{signal.icon}</span>
                    <span>{signal.label}</span>
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
                className="w-12 h-12 rounded-lg bg-[#1e1a12] flex items-center justify-center text-white"
                initial={{ scale: 0, rotate: -20 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="7" ry="3" />
                  <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
                  <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
                </svg>
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
                className="w-12 h-12 rounded-lg bg-[#e8a020] flex items-center justify-center text-[#1e1a12]"
                initial={{ scale: 0, rotate: 20 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.2 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19h16" />
                  <rect x="6" y="10" width="3" height="6" rx="1" />
                  <rect x="11" y="7" width="3" height="9" rx="1" />
                  <rect x="16" y="12" width="3" height="4" rx="1" />
                </svg>
              </motion.div>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {missionPillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  className="group rounded-2xl border border-[#f0ece4] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.1, ease: EASE }}
                  whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(232,160,32,0.18)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-lg bg-[#fff1d6] text-[#e8a020] flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-[#e8a020]">
                      {pillar.stat}
                    </span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-[#1e1a12]">{pillar.title}</div>
                  <p className="mt-1 text-[0.7rem] text-[#6b6357] leading-relaxed">{pillar.desc}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-[#f0ece4] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[#e8a020]"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pillar.value}%` } : {}}
                      transition={{ duration: 0.9, delay: 0.8 + i * 0.1, ease: EASE }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.35, ease: EASE }}
          >
            <div className="bg-white border border-[#f0ece4] rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#999] mb-6">
                Impact Signals
              </p>
              {impactRows.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 mb-4 last:mb-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.5 + i * 0.1, ease: EASE }}
                  whileHover={{ x: 4 }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-[#1e1a12]">{item.label}</div>
                    <div className="text-[0.65rem] uppercase tracking-[0.12em] text-[#9a8f7f]">
                      {item.detail}
                    </div>
                  </div>
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

