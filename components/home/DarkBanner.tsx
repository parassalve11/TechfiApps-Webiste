"use client";

// DarkBanner.tsx
// Animations enhanced:
// - Section entrance: heading + subtext fade-up with stagger
// - Cards: entrance from bottom with stagger as user scrolls to section
// - Each card: text reveal on enter viewport (existing, enhanced)
// - Parallax tilt on individual cards via mouse position tracking
// - Logo pops in on scroll
// - Typewriter text is preserved (existing CSS class)
// - useReducedMotion respected

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import TechifyMark from "@/components/shared/TechifyMark";

const EASE = [0.22, 1, 0.36, 1] as const;

const bannerItems = [
  {
    kicker: "Product Engineering",
    title: "Seamless Product Build & AI Integration",
    desc: "Strategy, design, and engineering aligned to ship faster with scalable AI workflows.",
    image: "/group_adult_asia_mail_Spftware developer_converted.avif",
    alt: "Seamless product build team collaboration",
  },
  {
    kicker: "Innovation Partner",
    title: "Your Trusted Innovation Partner",
    desc: "Cloud, AI, and product delivery with governance and measurable outcomes.",
    image: "/polygoan_handsake_converted.avif",
    alt: "Trusted innovation partner handshake",
  },
  {
    kicker: "AI Enablement",
    title: "AI-Ready Teams On Demand",
    desc: "Specialists who build responsibly and integrate AI across your stack.",
    image: "/robot_with_buniessman_on_street_converted.avif",
    alt: "Robot with businessman on street",
  },
  {
    kicker: "Cloud Security",
    title: "Secure Cloud Operations",
    desc: "Observability, compliance, and continuous improvement built in.",
    image: "/hero-robot.png",
    alt: "AI robotics hero visual",
  },
  {
    kicker: "Automation",
    title: "Intelligent Automation at Scale",
    desc: "Eliminate repetitive work with reliable, production-grade workflows.",
    image: "/polygoan_handsake_converted.avif",
    alt: "Futuristic handshake network",
  },
];

const textContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: EASE },
  },
};

const typingLines = [
  "Building secure, scalable products with AI-native teams and rapid delivery.",
  "From strategy to deployment with measurable outcomes.",
];

function BannerCard({
  item,
  index,
  sectionInView,
}: {
  item: (typeof bannerItems)[number];
  index: number;
  sectionInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();

  // Mouse tilt parallax
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * -6, y: cx * 6 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Entrance: staggered slide-up
      initial={{ opacity: 0, y: reduceMotion ? 0 : 50 }}
      animate={
        sectionInView
          ? { opacity: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y }
          : { opacity: 0, y: reduceMotion ? 0 : 50 }
      }
      transition={{
        opacity: { duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.1, ease: EASE },
        y: { duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.1, ease: EASE },
        rotateX: { duration: 0.3, ease: "easeOut" },
        rotateY: { duration: 0.3, ease: "easeOut" },
      }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      // Hover lift
      whileHover={
        reduceMotion
          ? {}
          : {
              scale: 1.02,
              boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
              transition: { duration: 0.3, ease: EASE },
            }
      }
      className="relative min-h-[340px] min-w-[280px] snap-start overflow-hidden rounded-3xl sm:min-w-[420px] lg:min-w-[520px] cursor-pointer"
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 280px"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

      {/* Golden top border slides in on hover */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-[#e8a020] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1, transition: { duration: 0.4, ease: EASE } }}
        style={{ width: "100%" }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <motion.div
          key={inView ? "in" : "out"}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={textContainer}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70"
          >
            {item.kicker}
          </motion.p>
          <motion.h3
            variants={fadeUp}
            className="mt-3 max-w-sm font-heading text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-tight text-white"
          >
            {item.title}
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-sm text-sm leading-relaxed text-white/80"
          >
            {item.desc}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6">
            <motion.div
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      scale: 1.06,
                      boxShadow: "0 0 18px rgba(232,160,32,0.55)",
                      transition: { duration: 0.25 },
                    }
              }
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="btn-yellow inline-flex px-5 py-2.5 text-xs rounded-full uppercase"
              >
                Talk to an Expert
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function DarkBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const containerEl = scrollRef.current;
    if (!containerEl) return;

    const handleWheel = (event: WheelEvent) => {
      const maxScroll = containerEl.scrollWidth - containerEl.clientWidth;
      if (maxScroll <= 0) return;
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        containerEl.scrollBy({ left: event.deltaY, behavior: "smooth" });
        event.preventDefault();
      }
    };

    containerEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => containerEl.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    if (!headerInView || reduceMotion) return;
    const currentLine = typingLines[lineIndex] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (charIndex < currentLine.length) {
      timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 28);
    } else if (lineIndex < typingLines.length - 1) {
      timeout = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 350);
    } else {
      timeout = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, headerInView, lineIndex, reduceMotion]);

  return (
    <section ref={sectionRef} className="bg-[#0b0f1a] py-16 overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">

        {/* Header row */}
        <div ref={headerRef} className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
          >
            <TechifyMark />
          </motion.div>
          <motion.span
            className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/70"
            initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.1, ease: EASE }}
          >
            TechifyApps
          </motion.span>
        </div>

        {/* Typewriter subtext */}
        <motion.div
          className="text-sm text-white/70 max-w-xl space-y-1"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.2 }}
        >
          {typingLines.map((line, index) => {
            const isActive = index === lineIndex;
            const content = reduceMotion
              ? line
              : index < lineIndex
                ? line
                : isActive
                  ? line.slice(0, charIndex)
                  : "";
            return (
              <span key={line} className="typing-line">
                {content}
                {!reduceMotion && isActive && <span className="typing-caret" aria-hidden="true" />}
              </span>
            );
          })}
        </motion.div>

        {/* Cards row */}
        <div
          ref={scrollRef}
          className="-mx-2 flex gap-6 overflow-x-auto px-2 pb-6 snap-x snap-mandatory stats-scroll scroll-smooth"
        >
          {bannerItems.map((item, index) => (
            <BannerCard
              key={item.title}
              item={item}
              index={index}
              sectionInView={sectionInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
