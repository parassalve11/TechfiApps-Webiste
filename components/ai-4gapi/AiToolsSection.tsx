"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/components/about/animations";
import { ai4gImages } from "./assets";

const bullets = [
  "Prompt templates and workflows",
  "Knowledge base + smart search (RAG)",
  "Model routing and response tuning",
];

export default function AiToolsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-[0.9fr_1.1fr] items-center">
        <div className="relative hidden md:block h-[320px] w-full">
          <div className="absolute inset-0 rounded-3xl bg-[#f7f3ea]" />
          <Image
            src={ai4gImages.heroAccent}
            alt=""
            fill
            className="object-cover opacity-25 grayscale"
            sizes="(max-width: 1024px) 0px, 45vw"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
          className="space-y-5"
        >
          <h3 className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-black text-[#1e1a12]">
            AI TOOLS
          </h3>
          <p className="text-[0.95rem] text-[#5f5a52] leading-relaxed">
            A toolkit to build, test, and ship AI features from chatbots to automation faster than
            traditional development.
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
              EXPLORE AI TOOLS
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
