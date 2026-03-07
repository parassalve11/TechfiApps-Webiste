"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { teamMembers } from "./data";
import { EASE } from "./animations";

export default function TeamSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="bg-[#fafaf8] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="font-black text-[clamp(1.6rem,3.5vw,2.4rem)] text-[#1e1a12] mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          MEET THE TEAM
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
              whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.09)", transition: { duration: 0.3 } }}
              className="bg-white border border-[#f0ece4] rounded-2xl overflow-hidden flex gap-0 group"
            >
              <div className="relative w-[100px] sm:w-[120px] shrink-0 overflow-hidden">
                <Image src={member.img} alt={member.name} fill className="object-cover" sizes="120px" />
                <motion.div
                  className="absolute inset-0 bg-[#e8a020]/15 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-[#e8a020]"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: EASE, originX: 0 }}
                />
              </div>

              <div className="p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-[1rem] text-[#1e1a12]">{member.name}</h3>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#e8a020]">
                    {member.role}
                  </span>
                  <p className="text-[0.78rem] text-[#777] leading-relaxed mt-2">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
