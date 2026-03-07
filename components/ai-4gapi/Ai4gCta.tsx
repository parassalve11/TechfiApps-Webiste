"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/components/about/animations";

export default function Ai4gCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h3
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
          className="text-[clamp(1.6rem,3vw,2.2rem)] font-black text-[#1e1a12] mb-4"
        >
          Tell us about your next big idea.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE, delay: 0.05 }}
          className="text-[0.95rem] text-[#5f5a52] max-w-2xl leading-relaxed mb-2"
        >
          Get a free consultation and a clear plan - scope, timeline, and budget - from our friendly
          team of experts. Quick response. No obligation.
        </motion.p>
      </div>
    </section>
  );
}
