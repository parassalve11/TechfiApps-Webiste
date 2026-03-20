"use client";

// Hero.tsx — Enhanced with 6-phase cinematic intro animation
// Phase 1: Boot flash (dark overlay fades out)
// Phase 2: Curtain wipe (existing panels, enhanced)
// Phase 3: SVG border trace around video frame
// Phase 4: Scan line sweeps the video
// Phase 5: Eyebrow typewriter + title slam with spring overshoot
// Phase 6: UI flourish — orbits, widgets, sparkles, particles burst

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const sparklePositions = [
  { top: "12%", left: "68%", delay: "0s" },
  { top: "25%", left: "82%", delay: "0.8s" },
  { top: "40%", left: "92%", delay: "1.6s" },
  { top: "62%", left: "78%", delay: "0.4s" },
  { top: "75%", left: "88%", delay: "2.1s" },
  { top: "88%", left: "72%", delay: "1.2s" },
  { top: "18%", left: "56%", delay: "2.8s" },
  { top: "50%", left: "58%", delay: "1.9s" },
];

const heroPoints = ["MVPs in 6-10 weeks", "NDA-ready", "Full-stack + AI"];
const HERO_EYEBROW = "ACCELERATE YOUR BUSINESS GROWTH WITH";

const EASE = [0.22, 1, 0.36, 1] as const;

// Particle burst positions (angle in degrees, distance in px)
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  angle: (i * 360) / 12,
  dist: 60 + Math.random() * 80,
  size: 2 + Math.random() * 3,
  delay: i * 0.04,
}));

// Typewriter hook
function useTypewriter(text: string, startDelay: number, speed = 38, skip = false) {
  const [displayed, setDisplayed] = useState(skip ? text : "");
  const [done, setDone] = useState(skip);

  useEffect(() => {
    if (skip) { setDisplayed(text); setDone(true); return; }
    let i = 0;
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay * 1000);
    return () => clearTimeout(timeout);
  }, [text, startDelay, speed, skip]);

  return { displayed, done };
}

// SVG border trace component
function BorderTrace({ active, reduceMotion }: { active: boolean; reduceMotion: boolean | null }) {
  const perimeter = 2 * (520 + 520); // approx rectangle perimeter
  return (
    <svg
      className="border-trace-svg"
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2" y="2" width="516" height="516" rx="30" ry="30"
        stroke="rgba(232,160,32,0.9)"
        strokeWidth="2.5"
        strokeDasharray={perimeter}
        strokeDashoffset={active && !reduceMotion ? 0 : perimeter}
        style={{
          transition: active && !reduceMotion
            ? "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)"
            : "none",
          filter: "drop-shadow(0 0 6px rgba(232,160,32,0.7))",
        }}
      />
    </svg>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // ── Animation phase states ──
  const [bootDone, setBootDone] = useState(false);
  const [traceActive, setTraceActive] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [textPhase, setTextPhase] = useState(false);
  const [orbitPhase, setOrbitPhase] = useState(false);
  const [widgetsPhase, setWidgetsPhase] = useState(false);
  const [particlesBurst, setParticlesBurst] = useState(false);
  const [particlesDone, setParticlesDone] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Skip all phases if reduced motion
  useEffect(() => {
    if (reduceMotion) {
      setBootDone(true);
      setTraceActive(false);
      setScanActive(false);
      setTextPhase(true);
      setOrbitPhase(true);
      setWidgetsPhase(true);
      setParticlesDone(true);
      return;
    }

    // Phase 1: boot flash → 0.35s
    const t1 = setTimeout(() => setBootDone(true), 350);
    // Phase 3: SVG border trace → 1.5s
    const t2 = setTimeout(() => setTraceActive(true), 1500);
    // Phase 4: scan line → 2.0s
    const t3 = setTimeout(() => setScanActive(true), 2000);
    // Phase 5: text cascade → 2.5s
    const t4 = setTimeout(() => setTextPhase(true), 2500);
    // Phase 6a: orbit rings → 3.6s
    const t5 = setTimeout(() => setOrbitPhase(true), 3600);
    // Phase 6b: widgets → 3.9s
    const t6 = setTimeout(() => setWidgetsPhase(true), 3900);
    // Phase 6c: particle burst → 4.2s
    const t7 = setTimeout(() => setParticlesBurst(true), 4200);
    // Phase 6c: particles dissolve → 5.0s
    const t8 = setTimeout(() => setParticlesDone(true), 5000);

    return () => [t1, t2, t3, t4, t5, t6, t7, t8].forEach(clearTimeout);
  }, [reduceMotion]);

  // ── Typewriter for eyebrow ──
  const { displayed: eyebrowText } = useTypewriter(
    HERO_EYEBROW,
    textPhase ? 0 : 9999,
    38,
    !!(reduceMotion || !textPhase)
  );

  // ── Video ping-pong: forward play → smooth reverse → repeat ──
  //
  // Root cause of jank: seeking video.currentTime on every RAF tick (60/s)
  // forces the browser to decode 60 frames/s which it cannot keep up with.
  // Fix: throttle seeks to the video's own framerate so the decoder has
  // time to present each frame before we ask for the next one.
  //
  // Strategy:
  //   • Forward  → native video.play() (browser handles this perfectly)
  //   • Reverse  → RAF loop, but only call video.currentTime seek when
  //                enough wall-clock time has elapsed for one video frame
  //   • FPS detection via requestVideoFrameCallback metadata (falls back to 30)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId         = 0;
    let active        = true;
    let reversing     = false;

    // Detected video FPS — updated on first RVFC callback
    let detectedFps   = 30;
    let frameTime     = 1 / detectedFps; // seconds per frame

    // Accumulator: how many seconds of wall-clock time have elapsed
    // since the last seek we issued.
    let accumulated   = 0;
    let lastTimestamp: number | null = null;

    // ── Reverse RAF loop ──
    const reverseStep = (timestamp: number) => {
      if (!active || !reversing) return;

      if (lastTimestamp !== null) {
        // Real elapsed time since last RAF, in seconds
        const elapsed = (timestamp - lastTimestamp) / 1000;
        // Clamp to 3× frame-time to survive tab-blur spikes
        accumulated += Math.min(elapsed, frameTime * 3);
      }
      lastTimestamp = timestamp;

      // Only seek when we've accumulated ≥ one video frame worth of time
      if (accumulated >= frameTime) {
        const framesToStep = Math.floor(accumulated / frameTime);
        accumulated -= framesToStep * frameTime;

        const next = video.currentTime - framesToStep * frameTime;

        if (next <= 0.001) {
          // Reached the start → flip back to forward
          video.currentTime = 0;
          reversing     = false;
          accumulated   = 0;
          lastTimestamp = null;
          video.play().catch(() => undefined);
          return; // exit RAF loop — handleEnded will restart it
        }

        video.currentTime = next;
      }

      rafId = requestAnimationFrame(reverseStep);
    };

    // ── Start reverse when forward play ends ──
    const handleEnded = () => {
      if (reversing) return;
      reversing     = true;
      accumulated   = 0;
      lastTimestamp = null;
      video.pause();
      rafId = requestAnimationFrame(reverseStep);
    };

    // ── Detect actual FPS via requestVideoFrameCallback ──
    const rvfc = (video as any).requestVideoFrameCallback as
      ((cb: (now: number, meta: { expectedDisplayTime: number; mediaTime: number }) => void) => void) | undefined;

    let fpsProbeCount = 0;
    let lastMediaTime = 0;

    const probeFps = (
      _: number,
      meta: { expectedDisplayTime: number; mediaTime: number }
    ) => {
      if (fpsProbeCount > 0 && lastMediaTime > 0) {
        const diff = meta.mediaTime - lastMediaTime;
        if (diff > 0 && diff < 0.1) {
          // Smooth the detected FPS over a few samples
          const sample = 1 / diff;
          detectedFps = Math.round(fpsProbeCount === 1 ? sample : (detectedFps + sample) / 2);
          frameTime   = 1 / Math.max(detectedFps, 12); // never below 12fps
        }
      }
      lastMediaTime = meta.mediaTime;
      fpsProbeCount++;

      // Stop probing after 6 frames — we have a good estimate
      if (fpsProbeCount < 6 && !reversing) {
        rvfc?.call(video, probeFps);
      }
    };

    // ── Boot the video ──
    const handleLoaded = () => {
      if (reversing) return;
      video.play().catch(() => undefined);
      if (rvfc) rvfc.call(video, probeFps);
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoaded);
    if (video.readyState >= 1) handleLoaded();

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, []);

  const ease = EASE;
  const introDelay = textPhase ? 0 : 9999;

  // ── Motion variants ──
  const textContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.01,
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.9, ease } },
  };

  // Title line: slam with spring overshoot
  const titleLine = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 60, scale: reduceMotion ? 1 : 0.88 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 22,
        mass: 0.8,
      },
    },
  };

  const titleContainer = {
    hidden: {},
    show: {
      transition: {
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const actionContainer = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  };

  const actionItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: reduceMotion ? 0 : 0.6, ease } },
  };

  const listContainer = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };

  const listItem = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -8 },
    show: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : 0.5, ease } },
  };

  const rightReveal = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96, filter: reduceMotion ? "none" : "blur(8px)" },
    show: {
      opacity: 1, scale: 1, filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0 : 1.0, ease, delay: reduceMotion ? 0 : 1.2 },
    },
  };

  const mobileContainer = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.8, ease } },
  };

  const mobileStagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const mobileItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.6, ease } },
  };

  const mobileFrame = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.96 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: reduceMotion ? 0 : 0.75, ease, delay: reduceMotion ? 0 : 0.2 },
    },
  };

  const widgetSpring = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.6, y: reduceMotion ? 0 : 24 },
    show: (delay: number) => ({
      opacity: 1, scale: 1, y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: reduceMotion ? 0 : delay },
    }),
  };

  // Orbit staggered reveal
  const orbitReveal = (delay: number) => ({
    hidden: { opacity: 0, scale: 0.92 },
    show: {
      opacity: 1, scale: 1,
      transition: { duration: reduceMotion ? 0 : 0.8, ease, delay: reduceMotion ? 0 : delay },
    },
  });

  const orbitStyle = (angle: string): CSSProperties => ({ "--start-angle": angle } as CSSProperties);

  return (
    <>
      {/* ── Phase 1: Boot flash overlay ── */}
      <AnimatePresence>
        {!bootDone && !reduceMotion && (
          <motion.div
            className="boot-flash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
          />
        )}
      </AnimatePresence>

      <section id="home" className="hero-section">

        {/* ── Left: staggered text ── */}
        <motion.div
          className="relative z-[2] pr-0 lg:pr-4 hidden md:block"
          initial="hidden"
          animate={textPhase ? "show" : "hidden"}
          variants={textContainer}
        >
          {/* Eyebrow — typewriter */}
          <motion.p
            variants={fadeUp}
            className="mb-[14px] flex items-center gap-[6px] text-[0.67rem] font-bold uppercase tracking-[0.18em] text-[#e0921a] [font-family:var(--font-barlow-condensed),sans-serif] md:mb-[18px] md:text-[0.72rem] md:tracking-[0.22em]"
          >
            <span className="eyebrow-typed text-[#e8a020]">
              {textPhase ? eyebrowText : ""}
              {textPhase && eyebrowText.length < HERO_EYEBROW.length && (
                <span className="eyebrow-caret" aria-hidden="true" />
              )}
            </span>
          </motion.p>

          {/* Title — spring slam */}
          <motion.h1
            variants={titleContainer}
            className="hero-title-main mb-6 leading-[0.92] tracking-[-0.02em] font-black"
          >
            <motion.span
              variants={titleLine}
              className="block text-[clamp(2.4rem,10.5vw,2.8rem)] sm:text-[clamp(2.7rem,11.5vw,3.3rem)] md:text-[clamp(3rem,5.5vw,5.2rem)]"
            >
              AI + APP
            </motion.span>
            <motion.span
              variants={titleLine}
              className="block text-[clamp(2.4rem,10.5vw,2.8rem)] sm:text-[clamp(2.7rem,11.5vw,3.3rem)] md:text-[clamp(3rem,5.5vw,5.2rem)]"
            >
              DEVELOPMENT
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-[22px] max-w-full text-[0.92rem] leading-[1.72] text-[#6a5a45] md:mb-[30px] md:max-w-[480px] md:text-[0.98rem] md:leading-[1.78]"
          >
            We help brands and startups build mobile apps, web platforms, and AI
            automation, designed for speed, performance, and measurable business
            outcomes.
          </motion.p>

          {/* Action buttons */}
          <motion.div variants={actionContainer} className="mb-[30px] flex flex-col items-stretch gap-[14px] md:flex-row md:flex-wrap">
            <motion.div variants={actionItem}>
              <motion.div
                className="relative inline-block"
                whileHover={reduceMotion ? {} : { scale: 1.04, transition: { duration: 0.22 } }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="absolute inset-0 rounded pointer-events-none"
                  animate={reduceMotion ? {} : {
                    boxShadow: ["0 0 0 0px rgba(232,160,32,0.4)", "0 0 0 10px rgba(232,160,32,0)"],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 1 }}
                />
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#f2b84b] px-7 py-[14px] text-[0.95rem] font-bold text-[#1a1a1a] shadow-[0_10px_24px_rgba(242,184,75,0.38)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(242,184,75,0.48)] [font-family:var(--font-barlow),Barlow,sans-serif] md:w-auto"
                >
                  Get a proposal
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.ul variants={listContainer} className="m-0 flex list-none flex-wrap gap-x-5 gap-y-[10px] p-0 md:gap-x-7 md:gap-y-3">
            {heroPoints.map((point) => (
              <motion.li
                key={point}
                variants={listItem}
                className="flex items-center gap-2 text-[0.86rem] font-medium text-[#5a4b3c] md:text-[0.92rem]"
                whileHover={reduceMotion ? {} : { x: 4, transition: { duration: 0.2 } }}
              >
                <span className="check-icon" aria-hidden="true" />
                <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Mobile-only hero card */}
        <motion.div
          className="hero-mobile-card md:hidden"
          variants={mobileContainer}
          initial="hidden"
          animate={textPhase ? "show" : "hidden"}
        >
          <motion.div variants={mobileStagger} initial="hidden" animate={textPhase ? "show" : "hidden"}>
            <motion.p variants={mobileItem} className="hero-mobile-eyebrow">
              AI-POWERED PRODUCT STUDIO
            </motion.p>

            <motion.h1 variants={mobileItem} className="hero-mobile-title">
              AI + App
              <br />
              Development
            </motion.h1>
            <motion.p variants={mobileItem} className="hero-mobile-subtitle">
              for Modern Teams
            </motion.p>
            <motion.p variants={mobileItem} className="hero-mobile-body">
              We design and build mobile apps, web platforms, and AI automation optimized for speed,
              scalability, and measurable business outcomes.
            </motion.p>

            <motion.div variants={mobileItem}>
              <Link href="/contact" className="hero-mobile-cta">
                Get a proposal
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>

            <motion.ul variants={listContainer} className="hero-mobile-points">
              {heroPoints.map((point) => (
                <motion.li key={point} variants={listItem} className="hero-mobile-point">
                  <span className="check-icon" aria-hidden="true" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="hero-mobile-frame"
            variants={mobileFrame}
            initial="hidden"
            animate={widgetsPhase ? "show" : "hidden"}
          >
            <motion.div
              className="hero-mobile-frame-inner"
              aria-hidden="true"
              initial={{ scale: reduceMotion ? 1 : 1.02 }}
              animate={{ scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 1.2, ease }}
            >
              <video
                className="hero-mobile-frame-video"
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                aria-hidden="true"
              >
                <source
                  src="/hero%20video/Futuristic%20android%20with%20glowing%20accents.webm"
                  type="video/webm"
                />
              </video>
            </motion.div>

            <motion.div
              className="hero-mobile-widget hero-mobile-widget-products"
              aria-hidden="true"
              custom={0.05}
              variants={widgetSpring}
              initial="hidden"
              animate={widgetsPhase ? "show" : "hidden"}
            >
              <div className="hero-mobile-widget-row">
                <div className="hero-mobile-widget-avatar">JD</div>
                <div className="hero-mobile-widget-lines">
                  <span />
                  <span />
                </div>
              </div>
              <div className="hero-mobile-widget-meta">
                <span>PRODUCTS</span>
                <span className="hero-mobile-widget-value">
                  52<span> /10</span>
                </span>
              </div>
              <div className="hero-mobile-widget-bar">
                <span />
              </div>
              <div className="hero-mobile-widget-tag">ACTIVE</div>
            </motion.div>

            <motion.div
              className="hero-mobile-widget hero-mobile-widget-growth"
              aria-hidden="true"
              custom={0.18}
              variants={widgetSpring}
              initial="hidden"
              animate={widgetsPhase ? "show" : "hidden"}
            >
              <div className="hero-mobile-widget-meta">
                <span>GROWTH</span>
                <span className="hero-mobile-widget-value">
                  67<span>%</span>
                </span>
              </div>
              <div className="hero-mobile-bars">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </motion.div>

            <motion.div
              className="hero-mobile-phone"
              aria-hidden="true"
              custom={0.32}
              variants={widgetSpring}
              initial="hidden"
              animate={widgetsPhase ? "show" : "hidden"}
            >
              <div className="hero-mobile-phone-notch" />
              <div className="hero-mobile-phone-card">
                <div className="hero-mobile-phone-card-row">
                  <div className="hero-mobile-phone-dot" />
                  <div className="hero-mobile-phone-lines">
                    <span style={{ width: "70%" }} />
                    <span style={{ width: "50%" }} />
                  </div>
                </div>
                <div className="hero-mobile-phone-cta" />
              </div>
              <div className="hero-mobile-phone-card">
                <div className="hero-mobile-phone-card-row">
                  <div className="hero-mobile-phone-dot" />
                  <div className="hero-mobile-phone-lines">
                    <span style={{ width: "65%" }} />
                    <span style={{ width: "42%" }} />
                  </div>
                </div>
                <div className="hero-mobile-phone-cta" />
              </div>
              <div className="hero-mobile-phone-actions">
                <span />
                <span />
                <span />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* -- Right: hero video + widgets -- */}
        <motion.div
          className="hero-right relative z-[2] hidden min-h-[560px] items-center justify-center md:flex"
          initial="hidden"
          animate="show"
          variants={rightReveal}
        >
          <div className="planet-wrap pointer-events-none absolute right-[-80px] top-1/2 z-[1] h-[580px] w-[580px] -translate-y-1/2">
            <div className="glow-outer" />

            {/* Video sphere + border trace + scan line */}
            <div className="planet-sphere absolute right-0 top-1/2 z-[2] h-[520px] w-[520px] -translate-y-1/2 overflow-hidden rounded-[32px] bg-transparent shadow-[0_24px_80px_rgba(18,28,45,0.2)]">
              <video
                ref={videoRef}
                className="planet-video relative z-[1] block h-full w-full object-contain"
                autoPlay muted playsInline preload="auto" loop={false}
                aria-hidden="true"
              >
                <source
                  src="/hero%20video/Futuristic%20android%20with%20glowing%20accents.webm"
                  type="video/webm"
                />
              </video>

              {/* Phase 4: Scan line */}
              {scanActive && !reduceMotion && (
                <motion.div
                  className="scan-line"
                  initial={{ top: "-2px", opacity: 0.9 }}
                  animate={{ top: "102%", opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.6, 1] }}
                />
              )}

              {/* Scan line grid overlay (visible briefly during scan) */}
              {scanActive && !reduceMotion && (
                <motion.div
                  className="scan-grid"
                  initial={{ opacity: 0.18 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                />
              )}
            </div>

            {/* Phase 3: SVG Border Trace */}
            <div className="border-trace-wrap" aria-hidden="true">
              <BorderTrace active={traceActive} reduceMotion={reduceMotion} />
            </div>

            {/* Phase 6a: Orbit rings — staggered fade in */}
            <motion.div
              className="orbit orbit-1"
              style={orbitStyle("-15deg")}
              initial="hidden"
              animate={orbitPhase ? "show" : "hidden"}
              variants={orbitReveal(0)}
            >
              <div className="orbit-dot" />
            </motion.div>
            <motion.div
              className="orbit orbit-2"
              style={orbitStyle("8deg")}
              initial="hidden"
              animate={orbitPhase ? "show" : "hidden"}
              variants={orbitReveal(0.18)}
            >
              <div className="orbit-dot" style={{ left: "calc(50% - 3px)", top: "auto", bottom: "-3px" }} />
            </motion.div>
            <motion.div
              className="orbit orbit-3"
              style={orbitStyle("-30deg")}
              initial="hidden"
              animate={orbitPhase ? "show" : "hidden"}
              variants={orbitReveal(0.34)}
            />

            {/* Enhanced sparkles */}
            {sparklePositions.map((sparkle, index) => (
              <motion.div
                key={`${sparkle.top}-${sparkle.left}-${index}`}
                className="sparkle"
                style={{ top: sparkle.top, left: sparkle.left, animationDelay: sparkle.delay }}
                animate={reduceMotion ? {} : { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2.5, repeat: Infinity,
                  delay: parseFloat(sparkle.delay) + index * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Phase 6c: Particle burst from center of video */}
            {!particlesDone && particlesBurst && !reduceMotion && (
              <div className="particle-origin" aria-hidden="true">
                {PARTICLES.map((p, i) => {
                  const rad = (p.angle * Math.PI) / 180;
                  const tx = Math.cos(rad) * p.dist;
                  const ty = Math.sin(rad) * p.dist;
                  return (
                    <motion.div
                      key={i}
                      className="particle"
                      style={{ width: p.size, height: p.size, borderRadius: "50%" }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                      animate={{ x: tx, y: ty, opacity: 0, scale: 1 }}
                      transition={{ duration: 0.75, delay: p.delay, ease: [0.2, 1, 0.4, 1] }}
                    />
                  );
                })}
              </div>
            )}

            {/* Stats widget */}
            <motion.div
              className="widget widget-stats"
              custom={0}
              variants={widgetSpring}
              initial="hidden"
              animate={widgetsPhase ? "show" : "hidden"}
            >
              <div className="widget-row">
                <div className="w-avatar">JD</div>
                <div className="w-lines">
                  <div className="w-line w-line-80" />
                  <div className="w-line w-line-60" />
                </div>
              </div>
              <div className="w-stat-row">
                <span className="w-stat-label">PRODUCTS</span>
                <div><span className="w-stat-val">52</span><span className="w-stat-sub"> -10</span></div>
              </div>
              <div style={{ marginBottom: 6 }}><div className="w-pill" /></div>
              <div className="w-chevron-row">
                <span className="w-tag">ACTIVE</span>
                <div className="w-mini-line" />
              </div>
            </motion.div>

            {/* Chart widget */}
            <motion.div
              className="widget widget-chart"
              custom={0.15}
              variants={widgetSpring}
              initial="hidden"
              animate={widgetsPhase ? "show" : "hidden"}
              whileHover={reduceMotion ? {} : { scale: 1.04, transition: { duration: 0.25 } }}
            >
              <div className="w-stat-row" style={{ marginBottom: 10 }}>
                <span className="w-stat-label">GROWTH</span>
                <span className="w-stat-val" style={{ fontSize: "1.2rem" }}>
                  67<span style={{ fontSize: "0.7rem", color: "#888", fontFamily: "Barlow", fontWeight: 500 }}>%</span>
                </span>
              </div>
              <div className="w-bar-chart">
                {[40, 65, 30, 80, 55, 70].map((height, index) => (
                  <motion.div
                    key={`${height}-${index}`}
                    className="w-bar"
                    initial={{ height: "0%" }}
                    animate={widgetsPhase ? { height: `${height}%` } : { height: "0%" }}
                    transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.1 + index * 0.07, ease: EASE }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              className="phone-mockup"
              custom={0.28}
              variants={widgetSpring}
              initial="hidden"
              animate={widgetsPhase ? "show" : "hidden"}
            >
              <div className="phone-notch" />
              <div className="phone-header-row">
                <div className="phone-dot" />
                <div className="phone-head-lines">
                  <div className="phone-line" style={{ width: "75%" }} />
                  <div className="phone-line" style={{ width: "55%" }} />
                </div>
              </div>
              <div className="phone-cards">
                <div className="phone-card">
                  <div className="phone-card-row">
                    <div className="phone-card-dot" />
                    <div className="phone-card-lines">
                      <div className="phone-card-line" style={{ width: "80%" }} />
                      <div className="phone-card-line" style={{ width: "60%" }} />
                    </div>
                  </div>
                  <div className="phone-card-btn" />
                </div>
                <div className="phone-card">
                  <div className="phone-card-row">
                    <div className="phone-card-dot" style={{ background: "rgba(100,180,255,0.3)" }} />
                    <div className="phone-card-lines">
                      <div className="phone-card-line" style={{ width: "70%" }} />
                      <div className="phone-card-line" style={{ width: "45%" }} />
                    </div>
                  </div>
                  <div className="phone-card-ok">
                    <div className="phone-card-ok-pill">OK</div>
                  </div>
                </div>
              </div>
              <div className="phone-cta" />
              <div className="phone-actions">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="phone-action-icon" aria-hidden="true" />
                ))}
              </div>
            </motion.div>

            {/* AI badge */}
            <motion.div
              className="mini-badge badge-ai"
              initial={{ opacity: 0, scale: 0, rotate: reduceMotion ? 0 : -20 }}
              animate={widgetsPhase ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: reduceMotion ? 0 : 0.35 }}
              whileHover={reduceMotion ? {} : { rotate: 10, scale: 1.12, transition: { duration: 0.2 } }}
            >
              AI
            </motion.div>

            {/* Chart badge */}
            <motion.div
              className="mini-badge badge-chart"
              initial={{ opacity: 0, scale: 0, rotate: reduceMotion ? 0 : 20 }}
              animate={widgetsPhase ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: reduceMotion ? 0 : 0.5 }}
              whileHover={reduceMotion ? {} : { scale: 1.12, transition: { duration: 0.2 } }}
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <rect x="0" y="10" width="4" height="6" rx="1" fill="rgba(255,255,255,0.7)" />
                <rect x="6" y="6" width="4" height="10" rx="1" fill="rgba(255,200,100,0.9)" />
                <rect x="12" y="3" width="4" height="13" rx="1" fill="rgba(255,255,255,0.7)" />
                <rect x="18" y="0" width="4" height="16" rx="1" fill="rgba(255,200,100,0.9)" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
