"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/components/about/animations";
import { ai4gImages } from "./assets";

const bullets = [
  "Data preparation and pipeline setup",
  "Model replacement and modernization",
  "Security + compliance support",
];

export default function AiMigrationsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-[1.05fr_0.95fr] items-center">
        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
          className="space-y-5"
        >
          <h3 className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-black text-[#1e1a12]">
            AI MIGRATIONS
          </h3>
          <p className="text-[0.95rem] text-[#5f5a52] leading-relaxed">
            Move from legacy systems to modern AI stacks with minimal downtime and maximum data
            safety.
          </p>
          <ul className="space-y-2 text-[0.92rem] text-[#6b655c]">
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
              PLAN YOUR MIGRATION
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE, delay: 0.05 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_28px_70px_rgba(0,0,0,0.15)]">
            <Image
              src={ai4gImages.migrations}
              alt="AI migrations"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
