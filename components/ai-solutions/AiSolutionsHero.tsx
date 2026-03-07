"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/components/about/animations";

export default function AiSolutionsHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#f7dca8] opacity-40 blur-3xl" />
      <div className="absolute right-10 top-24 h-36 w-36 rounded-full bg-[#f2c978] opacity-25 blur-2xl" />
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-start">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
          className="space-y-6"
        >
          <h1 className="text-[clamp(2.4rem,5.2vw,4.1rem)] font-black leading-[0.95] tracking-[-0.02em] text-[#1e1a12]">
            AI SOLUTIONS
            <br />
            THAT TURN
            <br />
            <span className="relative inline-block">
              <span className="absolute -left-2 -right-4 top-4 h-5 rounded-full bg-[#f5d089] opacity-55" />
              <span className="relative">IDEAS INTO</span>
            </span>
            <br />
            IMPACT
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE, delay: 0.1 }}
          className="space-y-6 text-[#57524a]"
        >
          <p className="text-[0.98rem] leading-relaxed">
            From automation to advanced AI platforms, TechifyApps helps businesses build smarter
            products, faster operations, and measurable growth.
          </p>
          <p className="text-[0.98rem] leading-relaxed">
            Built for startups, enterprises, and fast-moving teams.
          </p>
          <motion.div
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex"
          >
            <Link href="/contact" className="btn-primary">
              TALK TO AN AI EXPERT
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
