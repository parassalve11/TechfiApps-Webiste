"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  type Transition,
  type Variants,
} from "framer-motion";
import { useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type RootMargin =
  | `${number}px`
  | `${number}px ${number}px`
  | `${number}px ${number}px ${number}px`
  | `${number}px ${number}px ${number}px ${number}px`;

export type VideoAnimationVariant = {
  variants: Variants;
  transition?: Transition;
  amount?: number;
  margin?: RootMargin;
};

type VideoEffect =
  | "simple"
  | "inView"
  | "parallax"
  | "reveal"
  | "interactive"
  // ── NEW BIG SHOWCASE EFFECTS ──
  | "cinematic"
  | "spotlight"
  | "holographic";

type VideoComponentProps = {
  videoSrc: string;
  animationVariant?: VideoAnimationVariant;
  className?: string;
  wrapperClassName?: string;
  effect?: VideoEffect;
};

// ─────────────────────────────────────────────
// Shared constants
// ─────────────────────────────────────────────

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_CINEMA: [number, number, number, number] = [0.22, 1, 0.36, 1];
const BASE_VIDEO_CLASS = "w-full bg-black";

// ─────────────────────────────────────────────
// Helper – shared inView hook
// ─────────────────────────────────────────────

function useVideoInView(
  ref: React.RefObject<HTMLDivElement | null>,
  variant?: VideoAnimationVariant
) {
  return useInView(ref, {
    once: true,
    amount: variant?.amount ?? 0.2,
    margin: variant?.margin ?? "0px 0px -80px 0px",
  });
}

// ─────────────────────────────────────────────
// EFFECT: cinematic
// Film-strip curtain wipe + grain overlay + letterbox bleed
// ─────────────────────────────────────────────

function CinematicEffect({
  videoSrc,
  className,
  wrapperClassName,
}: VideoComponentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useVideoInView(wrapperRef);
  const shouldAnimate = inView || !!reduceMotion;

  const curtainTransition: Transition = {
    duration: reduceMotion ? 0 : 1.1,
    ease: EASE_EXPO,
  };

  const videoReveal: Transition = {
    duration: reduceMotion ? 0 : 1.45,
    ease: EASE_CINEMA,
    delay: reduceMotion ? 0 : 0.2,
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden rounded-2xl ${wrapperClassName ?? ""}`}
      style={{ perspective: "900px" }}
    >
      {/* Film-strip top curtain */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/2"
        style={{
          background:
            "repeating-linear-gradient(90deg,#0c0c0c 0px,#0c0c0c 88px,#111 88px,#111 96px)",
        }}
        initial={{ y: 0 }}
        animate={shouldAnimate ? { y: "-102%" } : { y: 0 }}
        transition={{ ...curtainTransition, delay: reduceMotion ? 0 : 0.08 }}
      />

      {/* Film-strip bottom curtain */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1/2"
        style={{
          background:
            "repeating-linear-gradient(90deg,#0c0c0c 0px,#0c0c0c 88px,#111 88px,#111 96px)",
        }}
        initial={{ y: 0 }}
        animate={shouldAnimate ? { y: "102%" } : { y: 0 }}
        transition={{ ...curtainTransition, delay: reduceMotion ? 0 : 0.12 }}
      />

      {/* Letterbox flash-in bars (top/bottom black bleeds) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[9%] bg-black"
        initial={{ scaleY: 3, opacity: 0.9 }}
        animate={shouldAnimate ? { scaleY: 0, opacity: 0 } : { scaleY: 3, opacity: 0.9 }}
        transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE_EXPO, delay: reduceMotion ? 0 : 1.0 }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[9%] bg-black"
        initial={{ scaleY: 3, opacity: 0.9 }}
        animate={shouldAnimate ? { scaleY: 0, opacity: 0 } : { scaleY: 3, opacity: 0.9 }}
        transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE_EXPO, delay: reduceMotion ? 0 : 1.0 }}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Grain / noise overlay that fades out */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
          initial={{ opacity: 0.45 }}
          animate={shouldAnimate ? { opacity: 0 } : { opacity: 0.45 }}
          transition={{ duration: reduceMotion ? 0 : 2.2, delay: reduceMotion ? 0 : 1.1 }}
        />
      )}

      {/* Horizontal scan line sweep */}
      {!reduceMotion && shouldAnimate && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 z-20 h-[3px] bg-white/40"
          style={{ top: 0 }}
          initial={{ top: "0%", opacity: 0.7 }}
          animate={{ top: "100%", opacity: 0 }}
          transition={{ duration: 0.85, ease: "linear", delay: 0.65 }}
        />
      )}

      {/* The actual video */}
      <motion.video
        className={`${BASE_VIDEO_CLASS} rounded-2xl border border-white/10 ${className ?? ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        initial={{ scale: 1.14, opacity: 0, rotateX: 6 }}
        animate={
          shouldAnimate
            ? { scale: 1, opacity: 1, rotateX: 0 }
            : { scale: 1.14, opacity: 0, rotateX: 6 }
        }
        transition={videoReveal}
      >
        <source src={videoSrc} type="video/webm" />
      </motion.video>

      {/* Gold frame flash */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl ring-2 ring-[#d4a84b]/60"
          initial={{ opacity: 1 }}
          animate={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// EFFECT: spotlight
// Stage-light sweep that hunts and locks onto the video
// ─────────────────────────────────────────────

function SpotlightEffect({
  videoSrc,
  className,
  wrapperClassName,
}: VideoComponentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useVideoInView(wrapperRef);
  const shouldAnimate = inView || !!reduceMotion;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 18 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY, reduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  // The gradient center follows the cursor
  const gradX = useTransform(springX, (v) => `${v * 100}%`);
  const gradY = useTransform(springY, (v) => `${v * 100}%`);
  const spotlightBackground = useMotionTemplate`radial-gradient(ellipse 42% 38% at ${gradX} ${gradY}, rgba(255,230,140,0.18) 0%, transparent 70%)`;

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden rounded-3xl ${wrapperClassName ?? ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Deep stage backdrop */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse 70% 65% at 50% 45%, transparent 0%, rgba(4,4,10,0.82) 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.9 }}
      />

      {/* Dynamic spotlight that tracks mouse */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: spotlightBackground,
          }}
        />
      )}

      {/* Vignette rim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
        style={{
          boxShadow: "inset 0 0 120px 40px rgba(0,0,0,0.7)",
        }}
      />

      {/* Sweeping entry light burst */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30"
          initial={{ opacity: 0 }}
          animate={
            shouldAnimate
              ? { opacity: [0, 0.55, 0.22, 0.55, 0] }
              : { opacity: 0 }
          }
          transition={{ duration: 1.6, times: [0, 0.2, 0.45, 0.7, 1], delay: 0.05 }}
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(255,230,120,0.55) 0%, transparent 68%)",
          }}
        />
      )}

      {/* Horizontal light-streak on reveal */}
      {!reduceMotion && shouldAnimate && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-30 w-[40%]"
          style={{ left: "-40%" }}
          initial={{ left: "-40%", opacity: 0.7 }}
          animate={{ left: "140%", opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.4, 0, 0.6, 1], delay: 0.1 }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </motion.div>
      )}

      {/* Video */}
      <motion.video
        className={`relative z-0 ${BASE_VIDEO_CLASS} rounded-3xl ${className ?? ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        initial={{ opacity: 0, scale: 1.08, filter: "brightness(0.3) blur(14px)" }}
        animate={
          shouldAnimate
            ? { opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }
            : { opacity: 0, scale: 1.08, filter: "brightness(0.3) blur(14px)" }
        }
        transition={{
          duration: reduceMotion ? 0 : 1.55,
          ease: EASE_CINEMA,
          delay: reduceMotion ? 0 : 0.25,
        }}
      >
        <source src={videoSrc} type="video/webm" />
      </motion.video>

      {/* Amber bottom glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
        style={{
          background:
            "linear-gradient(to top, rgba(200,140,20,0.18) 0%, transparent 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 1.0 }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// EFFECT: holographic
// Iridescent hologram glitch-in with scan lines,
// chromatic aberration flash, and shimmer border
// ─────────────────────────────────────────────

function HolographicEffect({
  videoSrc,
  className,
  wrapperClassName,
}: VideoComponentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useVideoInView(wrapperRef);
  const shouldAnimate = inView || !!reduceMotion;

  const [glitchDone, setGlitchDone] = useState(false);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${wrapperClassName ?? ""}`}
      style={{ perspective: "1100px" }}
    >
      {/* Outer glowing holo ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[2px] z-30 rounded-3xl"
        initial={{ opacity: 0 }}
        animate={
          shouldAnimate
            ? { opacity: [0, 1, 0.7, 1, 0.5, 1] }
            : { opacity: 0 }
        }
        transition={{
          duration: reduceMotion ? 0 : 1.8,
          times: [0, 0.2, 0.35, 0.55, 0.75, 1],
          delay: reduceMotion ? 0 : 0.1,
        }}
        style={{
          background:
            "linear-gradient(135deg,#00f2fe,#4facfe,#a78bfa,#f472b6,#fb923c,#00f2fe)",
          backgroundSize: "300% 300%",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2px",
          borderRadius: "inherit",
        }}
      />

      {/* Shimmer sweep on the border */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[2px] z-40 rounded-3xl overflow-hidden"
          style={{
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "2px",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.85) 50%, transparent 80%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 3.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}

      {/* Chromatic aberration ghost layers */}
      {!reduceMotion && !glitchDone && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl"
            initial={{ x: 0, opacity: 0 }}
            animate={
              shouldAnimate
                ? { x: [0, -7, 9, -5, 3, 0], opacity: [0, 0.55, 0.4, 0.55, 0.3, 0] }
                : { x: 0, opacity: 0 }
            }
            transition={{ duration: 0.75, times: [0, 0.18, 0.38, 0.58, 0.8, 1], delay: 0.05 }}
            onAnimationComplete={() => setGlitchDone(true)}
          >
            <video
              className="w-full rounded-3xl opacity-60 mix-blend-screen"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              style={{ filter: "hue-rotate(180deg) saturate(3)" }}
            >
              <source src={videoSrc} type="video/webm" />
            </video>
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl"
            initial={{ x: 0, opacity: 0 }}
            animate={
              shouldAnimate
                ? { x: [0, 8, -6, 4, -2, 0], opacity: [0, 0.45, 0.35, 0.45, 0.25, 0] }
                : { x: 0, opacity: 0 }
            }
            transition={{ duration: 0.75, times: [0, 0.18, 0.38, 0.58, 0.8, 1], delay: 0.05 }}
          >
            <video
              className="w-full rounded-3xl opacity-55 mix-blend-screen"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              style={{ filter: "hue-rotate(0deg) saturate(3)" }}
            >
              <source src={videoSrc} type="video/webm" />
            </video>
          </motion.div>
        </>
      )}

      {/* Scan-line grid overlay */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,220,255,0.06) 3px,rgba(0,220,255,0.06) 4px)",
          }}
          initial={{ opacity: 0.8 }}
          animate={shouldAnimate ? { opacity: 0.15 } : { opacity: 0.8 }}
          transition={{ duration: reduceMotion ? 0 : 2.2, delay: reduceMotion ? 0 : 0.9 }}
        />
      )}

      {/* Iridescent overlay that fades out */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-3xl mix-blend-color-dodge"
          style={{
            background:
              "linear-gradient(135deg,rgba(0,242,254,0.25),rgba(79,172,254,0.2),rgba(167,139,250,0.25),rgba(244,114,182,0.2))",
          }}
          initial={{ opacity: 1 }}
          animate={shouldAnimate ? { opacity: 0.18 } : { opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 2.0, delay: reduceMotion ? 0 : 0.8 }}
        />
      )}

      {/* Main video */}
      <motion.video
        className={`relative z-0 ${BASE_VIDEO_CLASS} rounded-3xl ${className ?? ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        initial={{
          opacity: 0,
          scale: 0.9,
          rotateY: -18,
          filter: "brightness(2.5) saturate(4) hue-rotate(200deg) blur(6px)",
        }}
        animate={
          shouldAnimate
            ? {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                filter: "brightness(1) saturate(1) hue-rotate(0deg) blur(0px)",
              }
            : {
                opacity: 0,
                scale: 0.9,
                rotateY: -18,
                filter: "brightness(2.5) saturate(4) hue-rotate(200deg) blur(6px)",
              }
        }
        transition={{
          duration: reduceMotion ? 0 : 1.45,
          ease: EASE_EXPO,
          delay: reduceMotion ? 0 : 0.05,
        }}
      >
        <source src={videoSrc} type="video/webm" />
      </motion.video>
    </div>
  );
}

// ─────────────────────────────────────────────
// EXISTING EFFECTS — improved
// ─────────────────────────────────────────────

function ParallaxEffect({
  videoSrc,
  className,
  wrapperClassName,
}: VideoComponentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useVideoInView(wrapperRef);
  const shouldAnimate = inView || !!reduceMotion;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [160, -110]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.84, 1.04, 1.18]);
  const parallaxRotate = useTransform(scrollYProgress, [0, 1], [-3.5, 3.5]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.18, 0.66, 0.22]);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden rounded-3xl border border-[#efe2cf]/60 shadow-[0_22px_60px_rgba(0,0,0,0.28)] ${wrapperClassName ?? ""}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(232,160,32,0.4),rgba(12,14,20,0.86)_68%)]"
        style={reduceMotion ? {} : { opacity: overlayOpacity }}
      />
        <motion.video
          className={`relative z-0 w-full bg-black/95 ${className ?? ""}`}
          autoPlay muted loop playsInline preload="none"
          style={reduceMotion ? {} : { y: parallaxY, scale: parallaxScale, rotate: parallaxRotate }}
          initial={{ opacity: 0.3 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0.3 }}
        transition={{ duration: reduceMotion ? 0 : 1.3, ease: EASE_CINEMA }}
      >
        <source src={videoSrc} type="video/webm" />
      </motion.video>
    </div>
  );
}

function RevealEffect({
  videoSrc,
  className,
  wrapperClassName,
}: VideoComponentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useVideoInView(wrapperRef);
  const shouldAnimate = inView || !!reduceMotion;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const revealClip = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [
      "inset(46% 38% 46% 38% round 28px)",
      "inset(0% 0% 0% 0% round 28px)",
      "inset(0% 0% 0% 0% round 28px)",
    ]
  );
  const revealScale = useTransform(scrollYProgress, [0, 1], [1.24, 1]);

  return (
    <div ref={wrapperRef} className={`relative ${wrapperClassName ?? ""}`}>
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-[#efe2cf]/60 shadow-[0_22px_62px_rgba(0,0,0,0.3)]"
        initial={{ opacity: 0.3, clipPath: "inset(44% 28% 44% 28% round 22px)" }}
        animate={
          shouldAnimate
            ? { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 22px)" }
            : { opacity: 0.3, clipPath: "inset(44% 28% 44% 28% round 22px)" }
        }
        style={reduceMotion ? {} : { clipPath: revealClip }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: EASE_CINEMA }}
      >
        {!reduceMotion && (
          <>
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-20 h-1/2 bg-black/90"
              initial={{ y: 0 }}
              animate={shouldAnimate ? { y: "-105%" } : { y: 0 }}
              transition={{ duration: 1.2, ease: EASE_EXPO }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 z-20 h-1/2 bg-black/90"
              initial={{ y: 0 }}
              animate={shouldAnimate ? { y: "105%" } : { y: 0 }}
              transition={{ duration: 1.2, ease: EASE_EXPO }}
            />
          </>
        )}
        <motion.video
          className={`w-full bg-black/95 ${className ?? ""}`}
          autoPlay muted loop playsInline preload="none"
          initial={{ scale: 1.22, filter: "blur(10px)" }}
          animate={
            shouldAnimate
              ? { scale: 1, filter: "blur(0px)" }
              : { scale: 1.22, filter: "blur(10px)" }
          }
          style={reduceMotion ? {} : { scale: revealScale }}
          transition={{ duration: reduceMotion ? 0 : 1.3, ease: EASE_CINEMA }}
        >
          <source src={videoSrc} type="video/webm" />
        </motion.video>
      </motion.div>
    </div>
  );
}

function InteractiveEffect({
  videoSrc,
  className,
  wrapperClassName,
}: VideoComponentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useVideoInView(wrapperRef);
  const shouldAnimate = inView || !!reduceMotion;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, reduceMotion]
  );
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${wrapperClassName ?? ""}`}
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="overflow-hidden rounded-3xl border border-[#efe2cf]/60 shadow-[0_22px_62px_rgba(0,0,0,0.26)]"
        style={reduceMotion ? {} : { rotateX, rotateY }}
        initial={{ opacity: 0, y: 55, scale: 0.93 }}
        animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 55, scale: 0.93 }}
        transition={{ duration: reduceMotion ? 0 : 1.05, ease: EASE_EXPO }}
      >
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 rounded-3xl border-2 border-[#e8a020]/45"
            animate={{ opacity: [0.12, 0.48, 0.12] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <motion.video
          className={`relative z-0 w-full bg-black/95 ${className ?? ""}`}
          autoPlay muted loop playsInline preload="none"
          whileHover={reduceMotion ? {} : { scale: 1.04, transition: { duration: 0.35 } }}
        >
          <source src={videoSrc} type="video/webm" />
        </motion.video>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────

export default function VideoComponent({
  videoSrc,
  animationVariant,
  className,
  wrapperClassName,
  effect = "inView",
}: VideoComponentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useVideoInView(wrapperRef, animationVariant);
  const shouldAnimate = inView || !!reduceMotion;

  const props = { videoSrc, animationVariant, className, wrapperClassName, effect };

  // ── Dispatch to dedicated effect components ──
  if (effect === "cinematic") return <CinematicEffect {...props} />;
  if (effect === "spotlight") return <SpotlightEffect {...props} />;
  if (effect === "holographic") return <HolographicEffect {...props} />;
  if (effect === "parallax") return <ParallaxEffect {...props} />;
  if (effect === "reveal") return <RevealEffect {...props} />;
  if (effect === "interactive") return <InteractiveEffect {...props} />;

  // ── simple ──
  if (effect === "simple") {
    return (
      <div className={`relative ${wrapperClassName ?? ""}`}>
        <video
          className={`w-full rounded-3xl border border-[#efe2cf]/60 bg-black/95 shadow-[0_18px_45px_rgba(0,0,0,0.18)] ${className ?? ""}`}
          autoPlay muted loop playsInline preload="metadata"
        >
          <source src={videoSrc} type="video/webm" />
        </video>
      </div>
    );
  }

  // ── inView (default) — improved spring physics ──
  const defaultAnimation: VideoAnimationVariant = {
    variants: {
      hidden: { opacity: 0, y: 72, scale: 0.9, filter: "blur(6px)" },
      show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    },
    transition: { duration: 1.1, ease: EASE_EXPO },
  };
  const resolved = animationVariant ?? defaultAnimation;

  return (
    <div ref={wrapperRef} className={`relative ${wrapperClassName ?? ""}`}>
      <motion.video
        className={`w-full rounded-3xl border border-[#efe2cf]/60 bg-black/95 shadow-[0_18px_48px_rgba(0,0,0,0.2)] ${className ?? ""}`}
        variants={resolved.variants}
        initial="hidden"
        animate={shouldAnimate ? "show" : "hidden"}
        transition={resolved.transition}
        autoPlay muted loop playsInline preload="none"
      >
        <source src={videoSrc} type="video/webm" />
      </motion.video>
    </div>
  );
}

// ─────────────────────────────────────────────
// Re-export the effect type for consumers
// ─────────────────────────────────────────────
export type { VideoEffect, VideoComponentProps };
