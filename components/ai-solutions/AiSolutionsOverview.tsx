"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/components/about/animations";

const bullets = [
  "Automate repetitive work and reduce operational cost",
  "Improve decisions with predictive and real-time analytics",
  "Enhance customer experience with AI assistants and personalization",
];

export default function AiSolutionsOverview() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-[1.05fr_0.95fr] items-center">
        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
          className="relative"
        >
          <div className="absolute -left-6 -top-6 h-14 w-14 rounded-full bg-[#f2c978] opacity-30 blur-lg" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
            <Image
              src="/person_with_Lightning_in_his_head.avif"
              alt="AI solutions profile"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/45" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-[clamp(2rem,4.4vw,3.2rem)] font-black text-[#1e1a12] leading-[0.95]">
              AI
              <br />
              SOLUTIONS
            </h2>
            <p className="text-[0.82rem] font-bold uppercase tracking-[0.22em] text-[#e8a020] leading-relaxed">
              A COMPLETE AI SOLUTION THAT AUTOMATES WORKFLOWS, TURNS DATA INTO INSIGHTS, AND HELPS
              YOUR BUSINESS MOVE FASTER WITH SMARTER DECISIONS.
            </p>
          </div>
          <ul className="space-y-3 text-[0.95rem] text-[#5c5850]">
            {bullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#e8a020]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <motion.div
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex"
          >
            <Link href="/contact" className="btn-primary">
              GET AI CONSULTATION
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
