"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationControls,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   ScrollProgress
   ─ Gold progress bar matching TechifyApps brand
   ─ Continuous shimmer that sweeps left→right within the bar
   ─ "Stuck" detection: when user hasn't scrolled for 1.8s the
     shimmer intensifies + a soft "scroll more" nudge appears
   ─ At 100% a celebration pulse fires once, then fades out
───────────────────────────────────────────────────────────── */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  /* Smooth spring so the bar never jerks */
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  /* Brand-matched colour ramp: amber → dark gold */
  const barColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#e8a020", "#c88b2a", "#a06818"]
  );

  /* Glow intensity grows as you near the end */
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.2, 0.45, 0.9]);

  /* ── Stuck detection ─────────────────────────── */
  const [isStuck, setIsStuck] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const lastProgress = useRef(0);
  const stuckTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const celebrationControls = useAnimationControls();

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const delta = Math.abs(v - lastProgress.current);
      lastProgress.current = v;

      /* Clear stuck state whenever we move */
      if (delta > 0.002) {
        setIsStuck(false);
        setShowNudge(false);
        if (stuckTimer.current) clearTimeout(stuckTimer.current);
        if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
      }

      /* Mark complete */
      if (v >= 0.995) {
        setIsComplete(true);
        setIsStuck(false);
        setShowNudge(false);
        celebrationControls.start("celebrate");
        return;
      } else {
        setIsComplete(false);
      }

      /* After 1.8 s of no movement → stuck */
      if (stuckTimer.current) clearTimeout(stuckTimer.current);
      stuckTimer.current = setTimeout(() => {
        if (scrollYProgress.get() < 0.99) {
          setIsStuck(true);
          /* After another 1.2 s → show nudge text */
          nudgeTimer.current = setTimeout(() => setShowNudge(true), 1200);
        }
      }, 1800);
    });

    return () => {
      unsub();
      if (stuckTimer.current) clearTimeout(stuckTimer.current);
      if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
    };
  }, [scrollYProgress, celebrationControls]);

  /* ── Shimmer speed: fast normally, slower + brighter when stuck */
  const shimmerDuration = isStuck ? 1.6 : 2.4;
  const shimmerOpacity = isComplete ? 0 : isStuck ? 1 : 0.72;

  /* ── Completion glow pulse (fires once) */
  const completePulseVariants = {
    idle: { scaleX: 1, opacity: 1 },
    celebrate: {
      scaleX: [1, 1.003, 1],
      opacity: [1, 0.7, 1],
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* ── 1. Outer track (full width, dark translucent) ── */}
      <div className="fixed left-0 top-0 z-[60] h-[3px] w-full pointer-events-none">
        {/* Track background */}
        <div className="absolute inset-0 bg-black/10" />

        {/* ── 2. Filled bar ── */}
        <motion.div
          className="relative h-full w-full origin-left overflow-hidden"
          style={{ scaleX, backgroundColor: barColor }}
          variants={completePulseVariants}
          initial="idle"
          animate={celebrationControls}
          aria-hidden="true"
        >
          {/* ── 3. Ambient glow layer (always present, grows toward end) ── */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,220,120,0.35) 50%, transparent 100%)",
              opacity: glowOpacity,
            }}
          />

          {/* ── 4. Primary shimmer sweep ── */}
          {!isComplete && (
            <motion.span
              key={`shimmer-${isStuck}`}   /* remount to restart when mode changes */
              className="absolute inset-y-0 w-28 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,245,200,0.9) 45%, rgba(255,255,255,1) 50%, rgba(255,245,200,0.9) 55%, transparent 100%)",
                mixBlendMode: "screen",
                left: "-7rem",
                opacity: shimmerOpacity,
                /* Slightly taller so the glow bleeds above/below */
                top: "-2px",
                bottom: "-2px",
                height: "calc(100% + 4px)",
              }}
              animate={{ x: ["0%", "800%"] }}
              transition={{
                duration: shimmerDuration,
                repeat: Infinity,
                ease: isStuck ? "easeInOut" : "linear",
                /* Tiny pause at start when stuck — makes it feel deliberate */
                repeatDelay: isStuck ? 0.25 : 0,
              }}
            />
          )}

          {/* ── 5. Secondary faint shimmer (offset, always running) ── */}
          {!isComplete && !isStuck && (
            <motion.span
              className="absolute inset-y-0 w-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,220,160,0.4) 50%, transparent 100%)",
                mixBlendMode: "screen",
                left: "-4rem",
                opacity: 0.5,
              }}
              animate={{ x: ["30%", "800%"] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "linear",
                delay: 1.1,
              }}
            />
          )}

          {/* ── 6. Completion flash: sweeps once when reaching 100% ── */}
          <AnimatePresence>
            {isComplete && (
              <motion.span
                key="complete-flash"
                className="absolute inset-y-0 w-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,245,200,0.95) 30%, rgba(255,255,255,1) 50%, rgba(255,245,200,0.95) 70%, transparent 100%)",
                  mixBlendMode: "screen",
                  left: 0,
                }}
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </AnimatePresence>

          {/* ── 7. Leading-edge bright tip ── */}
          <div
            className="absolute right-0 top-0 h-full w-5 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,240,180,0.9) 60%, rgba(255,255,255,0.95) 100%)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>

        {/* ── 8. Drop shadow glow beneath bar (pure decoration) ── */}
        <motion.div
          className="absolute left-0 top-[3px] h-[6px] w-full origin-left pointer-events-none"
          style={{
            scaleX,
            background:
              "linear-gradient(180deg, rgba(232,160,32,0.45) 0%, transparent 100%)",
            filter: "blur(3px)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── 9. "Scroll more" nudge ── */}
      <AnimatePresence>
        {showNudge && !isComplete && (
          <motion.div
            key="nudge"
            className="fixed bottom-6 right-6 z-[59] pointer-events-none select-none"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 bg-[#1e1a12]/90 backdrop-blur-sm border border-[#e8a020]/30 rounded-full px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              {/* Animated arrow stack */}
              <div className="flex flex-col items-center gap-[2px]">
                {[0, 1, 2].map((i) => (
                  <motion.svg
                    key={i}
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      d="M1 1l3 3 3-3"
                      stroke="#e8a020"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ))}
              </div>
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/80">
                Keep scrolling
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 10. "You're all caught up" toast at 100% ── */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            key="done-toast"
            className="fixed bottom-6 right-6 z-[59] pointer-events-none select-none"
            initial={{ opacity: 0, y: 14, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="flex items-center gap-2.5 bg-[#1e1a12]/92 backdrop-blur-sm border border-[#e8a020]/40 rounded-full px-4 py-2.5 shadow-[0_8px_28px_rgba(232,160,32,0.2)]">
              {/* Pulsing dot */}
              <motion.span
                className="w-2 h-2 rounded-full bg-[#e8a020] block"
                animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/80">
                You're all caught up
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}