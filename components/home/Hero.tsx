"use client";

// Hero.tsx
// Animations enhanced:
// - All existing staggered text reveals preserved
// - Planet canvas: hover to pause animation via ref callback
// - Sparkles: enhanced with random scale pulse
// - Orbit dots: smoother animation class preserved, added entrance delay
// - Widgets: bounce-in entrance with spring
// - Phone mockup: float animation from right
// - Action buttons: glow ring pulse on hover
// - Mini badges: pop in with spring + rotate on hover
// - Background: subtle radial gradient pulse
// - useReducedMotion respected throughout

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

const EASE = [0.22, 1, 0.36, 1] as const;

function PlanetSphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 520;
    canvas.height = 520;
    const width = 520;
    const height = 520;

    const nodes = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const draw = () => {
      if (!pausedRef.current) {
        ctx.clearRect(0, 0, width, height);
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        });
        nodes.forEach((node, index) => {
          nodes.slice(index + 1).forEach((other) => {
            const distance = Math.hypot(node.x - other.x, node.y - other.y);
            if (distance < 110) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(180,220,255,${(1 - distance / 110) * 0.5})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          });
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(200,230,255,0.6)";
          ctx.fill();
        });
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="planet-canvas"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      title="Hover to pause"
    />
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const ease = EASE;
  const introDelay = reduceMotion ? 0 : 0.55;
  const introDelayRight = reduceMotion ? 0 : 0.85;

  const textContainer = {
    hidden: { opacity: 0, filter: reduceMotion ? "none" : "blur(8px)" },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        ease,
        delay: introDelay,
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.9, ease },
    },
  };

  const titleContainer = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.9,
        ease,
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const titleLine = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.65, ease },
    },
  };

  const actionContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
    },
  };

  const actionItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduceMotion ? 0 : 0.6, ease },
    },
  };

  const listContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
    },
  };

  const listItem = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -8 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.5, ease },
    },
  };

  const rightReveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 20,
      scale: reduceMotion ? 1 : 0.96,
      filter: reduceMotion ? "none" : "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: reduceMotion ? 0 : 1.1,
        ease,
        delay: introDelayRight,
      },
    },
  };

  const widgetSpring = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.7, y: reduceMotion ? 0 : 20 },
    show: (delay: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 20,
        delay: reduceMotion ? 0 : introDelayRight + delay,
      },
    }),
  };

  const orbitStyle = (angle: string): CSSProperties => ({
    "--start-angle": angle,
  } as CSSProperties);

  return (
    <>
      <section id="home" className="hero-section">
        {/* ── Left: staggered text (existing, preserved) ── */}
        <motion.div
          className="hero-left"
          initial="hidden"
          animate="show"
          variants={textContainer}
        >
          <motion.p variants={fadeUp} className="eyebrow">
            <span>AI-POWERED</span> PRODUCT STUDIO
          </motion.p>

          <motion.h1 variants={titleContainer} className="hero-title">
            <motion.span variants={titleLine} className="line1">
              AI + App
            </motion.span>
            <motion.span variants={titleLine} className="line2">
              Development
            </motion.span>
            <motion.span variants={titleLine} className="line3">
              for Modern Teams
            </motion.span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-desc">
            We design and build mobile apps, web platforms, and AI automation
            optimized for speed, scalability, and measurable business outcomes.
          </motion.p>

          {/* Action buttons with hover glow rings */}
          <motion.div variants={actionContainer} className="hero-actions">
            <motion.div variants={actionItem}>
              <motion.div
                className="relative inline-block"
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        scale: 1.04,
                        transition: { duration: 0.22 },
                      }
                }
                whileTap={{ scale: 0.97 }}
              >
                {/* Pulse ring */}
                <motion.span
                  className="absolute inset-0 rounded pointer-events-none"
                  animate={
                    reduceMotion
                      ? {}
                      : {
                          boxShadow: [
                            "0 0 0 0px rgba(232,160,32,0.4)",
                            "0 0 0 10px rgba(232,160,32,0)",
                          ],
                        }
                  }
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 1 }}
                />
                <Link href="/contact" className="btn-primary">
                  Get a proposal
                </Link>
              </motion.div>
            </motion.div>

          </motion.div>

          <motion.ul variants={listContainer} className="hero-points">
            {heroPoints.map((point) => (
              <motion.li
                key={point}
                variants={listItem}
                whileHover={reduceMotion ? {} : { x: 4, transition: { duration: 0.2 } }}
              >
                <span className="check-icon" aria-hidden="true" />
                <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── Right: planet sphere + widgets ── */}
        <motion.div
          className="hero-right"
          initial="hidden"
          animate="show"
          variants={rightReveal}
        >
          <div className="planet-wrap">
            <div className="glow-outer" />

            <div className="planet-sphere">
              <PlanetSphere />
            </div>

            <div className="orbit orbit-1" style={orbitStyle("-15deg")}>
              <div className="orbit-dot" />
            </div>
            <div className="orbit orbit-2" style={orbitStyle("8deg")}>
              <div
                className="orbit-dot"
                style={{ left: "calc(50% - 3px)", top: "auto", bottom: "-3px" }}
              />
            </div>
            <div className="orbit orbit-3" style={orbitStyle("-30deg")} />

            {/* Enhanced sparkles with scale pulse */}
            {sparklePositions.map((sparkle, index) => (
              <motion.div
                key={`${sparkle.top}-${sparkle.left}-${index}`}
                className="sparkle"
                style={{
                  top: sparkle.top,
                  left: sparkle.left,
                  animationDelay: sparkle.delay,
                }}
                animate={
                  reduceMotion
                    ? {}
                    : {
                        scale: [1, 1.4, 1],
                        opacity: [0.6, 1, 0.6],
                      }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: parseFloat(sparkle.delay) + index * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Stats widget — bounce in */}
            <motion.div
              className="widget widget-stats"
              custom={0.9}
              variants={widgetSpring}
              initial="hidden"
              animate="show"
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
                <div>
                  <span className="w-stat-val">52</span>
                  <span className="w-stat-sub"> -10</span>
                </div>
              </div>
              <div style={{ marginBottom: 6 }}>
                <div className="w-pill" />
              </div>
              <div className="w-chevron-row">
                <span className="w-tag">ACTIVE</span>
                <div className="w-mini-line" />
              </div>
            </motion.div>

            {/* Chart widget — bounce in with delay */}
            <motion.div
              className="widget widget-chart"
              custom={1.1}
              variants={widgetSpring}
              initial="hidden"
              animate="show"
              whileHover={reduceMotion ? {} : { scale: 1.04, transition: { duration: 0.25 } }}
            >
              <div className="w-stat-row" style={{ marginBottom: 10 }}>
                <span className="w-stat-label">GROWTH</span>
                <span className="w-stat-val" style={{ fontSize: "1.2rem" }}>
                  67
                  <span style={{ fontSize: "0.7rem", color: "#888", fontFamily: "Barlow", fontWeight: 500 }}>
                    %
                  </span>
                </span>
              </div>
              <div className="w-bar-chart">
                {[40, 65, 30, 80, 55, 70].map((height, index) => (
                  <motion.div
                    key={`${height}-${index}`}
                    className="w-bar"
                    initial={{ height: "0%" }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.6,
                      delay: reduceMotion ? 0 : 1.2 + index * 0.07,
                      ease: EASE,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              className="phone-mockup"
              custom={1.3}
              variants={widgetSpring}
              initial="hidden"
              animate="show"
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

            {/* AI badge — spins in */}
            <motion.div
              className="mini-badge badge-ai"
              initial={{ opacity: 0, scale: 0, rotate: reduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 16,
                delay: reduceMotion ? 0 : 1.5,
              }}
              whileHover={reduceMotion ? {} : { rotate: 10, scale: 1.12, transition: { duration: 0.2 } }}
            >
              AI
            </motion.div>

            {/* Chart badge */}
            <motion.div
              className="mini-badge badge-chart"
              initial={{ opacity: 0, scale: 0, rotate: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 16,
                delay: reduceMotion ? 0 : 1.65,
              }}
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
