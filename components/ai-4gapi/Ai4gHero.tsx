"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/components/about/animations";
import { ai4gImages } from "./assets";

const bullets = [
  "Plug-and-play AI capabilities via secure APIs",
  "Faster integration across web, mobile, and cloud apps",
  "Scales with enterprise-grade monitoring and controls",
];

export default function Ai4gHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute left-6 top-24 h-28 w-44 bg-[#f8e6c7] opacity-70" style={{ clipPath: "polygon(0 20%, 100% 0, 90% 100%, 10% 80%)" }} />
      <div className="absolute left-14 top-44 h-20 w-36 bg-[#f8e6c7] opacity-55" style={{ clipPath: "polygon(8% 0, 100% 20%, 84% 100%, 0 85%)" }} />

      <div className="absolute -left-20 bottom-8 hidden h-72 w-72 md:block">
        <Image
          src={ai4gImages.heroAccent}
          alt=""
          fill
          className="object-cover opacity-10 grayscale"
          sizes="(max-width: 1024px) 0px, 320px"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid gap-12 md:grid-cols-[1.05fr_0.95fr] items-start">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
        >
          <h1 className="text-[clamp(2.6rem,6vw,4.2rem)] font-black leading-[0.95] tracking-[-0.02em] text-[#1e1a12]">
            AI
            <br />
            4GAPI
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE, delay: 0.1 }}
          className="space-y-5 text-[#57524a]"
        >
          <p className="text-[0.98rem] leading-relaxed">
            A powerful AI 4GAPI that lets you quickly integrate intelligent automation, real-time
            insights, and generative features into any app or workflow.
          </p>
          <ul className="space-y-2 text-[0.9rem] text-[#6b655c]">
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
              REQUEST API ACCESS
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
