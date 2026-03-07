"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { teamLeaders } from "./data";
import { EASE } from "./animations";

export default function LeadershipSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="text-xs font-bold uppercase tracking-[0.22em] text-[#e8a020] mb-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Leadership
        </motion.p>
        <motion.h2
          className="font-black text-[clamp(1.8rem,4vw,2.8rem)] text-[#1e1a12] mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
        >
          THE PEOPLE BEHIND THE PRODUCT
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamLeaders.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.12, ease: EASE }}
              whileHover={{
                y: -6,
                boxShadow: "0 18px 42px rgba(0,0,0,0.18)",
                transition: { duration: 0.25 },
              }}
              className="group relative overflow-hidden rounded-2xl border border-[#e7dfd3] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <div className="relative h-[220px] sm:h-[250px] bg-[#f3efe7]">
                <Image
                  src={person.img}
                  alt={person.name}
                  fill
                  className="object-contain p-4 grayscale contrast-125 brightness-110"
                  sizes="(min-width: 640px) 360px, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 mix-blend-multiply opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.25), transparent 55%)" }} />
              </div>

              <div className="absolute bottom-4 right-4 text-right">
                <div className="text-sm font-bold text-white drop-shadow">{person.name}</div>
                <div className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                  {person.role}
                </div>
              </div>

              <motion.a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur"
                whileHover={reduceMotion ? {} : { scale: 1.05 }}
                whileTap={reduceMotion ? {} : { scale: 0.97 }}
              >
                Profile
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
