"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { EASE, fadeUp } from "./animations";

export default function AboutHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-10 md:pt-14">
        <div className="flex min-h-[360px] flex-col md:flex-row">
          <motion.aside
            initial={{ opacity: 0, x: reduceMotion ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
            className="relative flex w-full flex-col items-start bg-[#121417] px-7 py-12 md:w-[34%] md:px-12 md:py-12"
          >
            <h1 className="text-4xl font-black leading-[0.82] tracking-tight text-white md:text-5xl">
              ABOUT
              <br />
              US
            </h1>
            <motion.div
              whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={reduceMotion ? {} : { scale: 0.97 }}
              className="mt-6"
            >
              <Link
                href="/contact"
                className="rounded-full px-5 py-2 text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-[#1e1a12]"
                style={{
                  background: "linear-gradient(90deg, #f0c24b 0%, #c98b19 50%, #f0c24b 100%)",
                }}
              >
                Contact Us
              </Link>
            </motion.div>
            <div className="pointer-events-none absolute -bottom-8 left-10 h-14 w-24 rotate-[-12deg] rounded-xl border border-white/12 bg-white/5" />
          </motion.aside>

          <motion.div
            initial="hidden"
            animate="show"
            className="flex w-full items-start bg-white px-6 py-12 md:w-[66%] md:px-16 md:py-12"
          >
            <div className="max-w-sm">
              <motion.h2
                variants={fadeUp(0, !!reduceMotion)}
                className="text-xl font-extrabold leading-tight tracking-tight text-[#121417] md:text-2xl"
              >
                BUILD USEFUL AI
                <br />
                PRODUCTS&mdash;NOT HYPE.
              </motion.h2>
              <motion.p
                variants={fadeUp(0.12, !!reduceMotion)}
                className="mt-3 text-[0.7rem] font-medium leading-relaxed text-[#6b6b6b] md:text-xs"
              >
                Build effective AI products with real-world application, not just
                promises. Our team of experienced developers integrates advanced AI
                solutions into robust, scalable platforms.
              </motion.p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.1, ease: EASE }}
          className="relative -mt-10 pb-10 md:-mt-24 md:pb-16"
        >
          <div className="pointer-events-none absolute -top-4 left-4 hidden h-10 w-32 rounded-tl-xl border-l-2 border-t-2 border-[#e8a020] opacity-90 md:block" />
          <div className="pointer-events-none absolute -top-2 left-12 hidden h-[2px] w-24 bg-[#e8a020]/60 md:block" />
          <div className="pointer-events-none absolute -top-6 left-24 hidden h-[2px] w-12 bg-[#e8a020]/40 md:block" />

          <div className="pointer-events-none absolute -bottom-4 right-6 hidden h-10 w-28 rounded-br-xl border-b-2 border-r-2 border-[#e8a020] opacity-90 md:block" />
          <div className="pointer-events-none absolute -bottom-2 right-16 hidden h-[2px] w-24 bg-[#e8a020]/60 md:block" />
          <div className="pointer-events-none absolute -bottom-6 right-28 hidden h-[2px] w-14 bg-[#e8a020]/40 md:block" />

          <div className="pointer-events-none absolute -left-6 bottom-16 hidden h-20 w-40 rotate-[-12deg] rounded-xl bg-[#e2e2e2] md:block" />
          <div className="pointer-events-none absolute -left-1 bottom-10 hidden h-14 w-24 rotate-[-12deg] rounded-lg bg-[#cfcfcf] md:block" />

          <div className="relative z-10 overflow-hidden rounded-sm border border-[#e6e0d7] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
            <div className="relative h-[200px] md:h-[300px]">
              <Image
                src="/Businness_Team.avif"
                alt="Business team collaboration"
                fill
                className="object-cover contrast-110"
                sizes="(min-width: 1024px) 900px, 100vw"
                priority
              />
            </div>

            <div className="pointer-events-none absolute bottom-6 -left-3 hidden h-20 w-44 rounded border border-white/20 bg-white/10 backdrop-blur-lg md:block" />
            <div className="pointer-events-none absolute bottom-4 -left-10 hidden h-14 w-28 rounded border border-white/20 bg-white/8 backdrop-blur md:block" />
          </div>

          <div className="pointer-events-none absolute -bottom-8 left-6 hidden h-12 w-24 rounded-lg border border-[#e8a020]/30 bg-[#e8a020]/10 md:block" />
          <div className="pointer-events-none absolute -bottom-12 left-20 hidden h-[3px] w-28 bg-[#e8a020]/60 md:block" />
          <div className="pointer-events-none absolute -bottom-16 left-36 hidden h-[2px] w-16 bg-[#e8a020]/40 md:block" />
        </motion.div>
      </div>
    </section>
  );
}
