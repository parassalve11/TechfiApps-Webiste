"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/components/about/animations";
import { ai4gImages } from "./assets";

const bullets = [
  "Multi-environment setup (dev/stage/prod)",
  "Usage monitoring and performance insights",
  "Role-based access control and audit-ready logs",
];

export default function CloudManagementBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0">
        <Image
          src={ai4gImages.cloud}
          alt="Cloud management"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f0b44e]/55 via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
        className="relative max-w-3xl mx-auto px-6 text-center text-white"
      >
        <h2 className="text-[clamp(2rem,4.2vw,3.2rem)] font-black tracking-tight">
          CLOUD MANAGEMENT
        </h2>
        <p className="mt-3 text-[0.95rem] text-white/80 leading-relaxed">
          Centralize deployments, environments, and AI services with secure, scalable cloud
          operations.
        </p>
        <ul className="mt-6 space-y-2 text-[0.9rem] text-white/80">
          {bullets.map((item) => (
            <li key={item} className="flex items-start justify-center gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f2b84b]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <motion.div
          whileHover={reduceMotion ? {} : { scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-flex"
        >
          <Link href="/contact" className="btn-primary">
            VIEW CLOUD CAPABILITIES
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
