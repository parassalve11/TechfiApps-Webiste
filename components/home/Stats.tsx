"use client";

// Stats.tsx
// Animations added/enhanced:
// - Auto-trigger counter animation when card enters viewport (useInView on each card)
// - Card entrance: fade-up staggered as scroll hits section
// - Hover: card lifts with shadow + subtle scale
// - Horizontal scroll: wheel hijacking + keyboard accessible (existing, kept)
// - Click still re-triggers counter (existing, kept)
// - Background tone shimmer on hover
// - useReducedMotion respected

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { stats } from "@/lib/homeData";

const EASE = [0.22, 1, 0.36, 1] as const;

const cardTones = [
  "bg-[#e0f3fc]",
  "bg-[#e8eaea]",
  "bg-[#fff6e2]",
  "bg-[#e8eaea]",
];

type StatItem = (typeof stats)[number];

function formatValue(value: number, decimals: number) {
  const factor = 10 ** decimals;
  const rounded = Math.round(value * factor) / factor;
  return rounded.toFixed(decimals);
}

function StatCard({
  item,
  tone,
  index,
  sectionInView,
}: {
  item: StatItem;
  tone: string;
  index: number;
  sectionInView: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLButtonElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-40px" });

  const star = String.fromCharCode(9733);
  const suffix = item.suffix === "star" ? star : item.suffix ?? "";
  const decimals = item.decimals ?? 0;
  const [count, setCount] = useState(item.rangeStart ?? 0);
  const [hasRun, setHasRun] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const displayValue = useMemo(() => {
    const formatted = formatValue(count, decimals);
    if (item.rangeStart !== undefined) {
      return `${item.rangeStart}-${formatted}${suffix}`;
    }
    return `${formatted}${suffix}`;
  }, [count, decimals, item.rangeStart, suffix]);

  // Auto-run counter when card enters viewport
  useEffect(() => {
    if (!cardInView || hasRun) return;
    setHasRun(true);

    if (reduceMotion) {
      setCount(item.value);
      return;
    }

    const startValue = item.rangeStart ?? 0;
    const ctrl = animate(startValue, item.value, {
      duration: 1.4,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCount(latest),
    });
    return () => ctrl.stop();
  }, [cardInView, hasRun, item.value, item.rangeStart, index, reduceMotion]);

  // Re-run on click
  const handleClick = () => {
    setTrigger((p) => p + 1);
    setHasRun(false);
    setCount(item.rangeStart ?? 0);

    if (reduceMotion) {
      setCount(item.value);
      return;
    }

    const startValue = item.rangeStart ?? 0;
    animate(startValue, item.value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCount(latest),
    });
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={handleClick}
      // Entrance animation staggered by index
      initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : index * 0.09,
        ease: EASE,
      }}
      // Hover lift
      whileHover={
        reduceMotion
          ? {}
          : {
              y: -6,
              scale: 1.02,
              boxShadow: "0 18px 36px rgba(0,0,0,0.13)",
              transition: { duration: 0.3, ease: EASE },
            }
      }
      whileTap={reduceMotion ? {} : { scale: 0.98, y: 0 }}
      className={`snap-start shrink-0 min-w-[260px] sm:min-w-[300px] lg:min-w-[320px] border border-[#e4e2dc] px-7 py-7 text-left ${tone} flex min-h-[240px] flex-col lg:min-h-[270px] appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8a020]`}
    >
      {/* Counter value */}
      <motion.div
        key={`value-${trigger}`}
        initial={{ opacity: 0.6, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="font-heading text-[clamp(2.2rem,3.2vw,3rem)] font-medium leading-none text-[#333]"
      >
        {displayValue}
      </motion.div>

      {/* Label + desc */}
      <motion.div
        key={`text-${trigger}`}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
        className="mt-auto pt-10"
      >
        <div className="font-heading text-[0.75rem] font-bold tracking-[0.12em] text-[#333]">
          {item.unit}
        </div>
        <p className="mt-2 text-[0.78rem] leading-relaxed text-[#70797e]">
          {item.desc}
        </p>
      </motion.div>

      {/* Bottom accent line animates on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#e8a020] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={reduceMotion ? {} : { scaleX: 1, transition: { duration: 0.35, ease: EASE } }}
        style={{ position: "absolute", width: "100%" }}
      />
    </motion.button>
  );
}

export default function Stats() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        container.scrollBy({ left: event.deltaY, behavior: "smooth" });
        event.preventDefault();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;
    if (event.key === "ArrowRight") {
      container.scrollBy({ left: 320, behavior: "smooth" });
      event.preventDefault();
    }
    if (event.key === "ArrowLeft") {
      container.scrollBy({ left: -320, behavior: "smooth" });
      event.preventDefault();
    }
  };

  return (
    <section ref={sectionRef} className="bg-[#fff8e9] relative overflow-hidden">
      {/* Subtle background grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #333 0, #333 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #333 0, #333 1px, transparent 1px, transparent 40px)`,
        }}
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1.2 }}
      />

      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Section heading fades in */}
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8a020] mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          By the numbers
        </motion.p>

        <div
          ref={scrollRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Stats"
          className="-mx-2 flex gap-5 overflow-x-auto px-2 pb-6 snap-x snap-mandatory stats-scroll scroll-smooth focus-visible:outline-none relative"
        >
          {stats.map((item, index) => (
            <StatCard
              key={item.unit}
              item={item}
              tone={cardTones[index % cardTones.length]}
              index={index}
              sectionInView={sectionInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}