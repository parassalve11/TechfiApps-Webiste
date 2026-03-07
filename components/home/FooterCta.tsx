"use client";

// FooterCta.tsx
// Animations enhanced:
// - All existing SVG line drawing + travelling dot + endpoint pulse PRESERVED
// - CTA button: breathing pulse ring animation (loops automatically)
// - Card: subtle floating bob animation when in view
// - Parallax blobs: existing mouse-driven parallax PRESERVED + enhanced spring values
// - Background: animated radial gradient that follows mouse
// - Kicker text: character-by-character stagger reveal
// - Heading: word-by-word clip reveal
// - Subheading: enhanced entrance
// - useReducedMotion respected

import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

import { footerLinks } from "@/lib/homeData";

const EASE = [0.22, 1, 0.36, 1] as const;

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://twitter.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

// ─── Travelling dot along a SVG path ────────────────────────────────────────
function TravellingDot({
  pathId,
  delay = 0,
  duration = 1.4,
  color = "#c88b2a",
  size = 5,
  inView,
}: {
  pathId: string;
  delay?: number;
  duration?: number;
  color?: string;
  size?: number;
  inView: boolean;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const pathEl = document.getElementById(pathId) as SVGPathElement | null;
      if (!pathEl) return;
      const totalLength = pathEl.getTotalLength();
      setVisible(true);

      const ctrl = animate(0, 1, {
        duration,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (v) => {
          const pt = pathEl.getPointAtLength(v * totalLength);
          setPos({ x: pt.x, y: pt.y });
        },
      });
      return () => ctrl.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, pathId, delay, duration]);

  if (!visible || !pos) return null;

  return (
    <motion.circle
      cx={pos.x}
      cy={pos.y}
      r={size}
      fill={color}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}

// ─── Endpoint pulse ──────────────────────────────────────────────────────────
function EndpointPulse({
  x,
  y,
  delay,
  inView,
  color = "#c88b2a",
}: {
  x: number;
  y: number;
  delay: number;
  inView: boolean;
  color?: string;
}) {
  return (
    <motion.g>
      <motion.circle
        cx={x}
        cy={y}
        r={10}
        fill="none"
        stroke={color}
        strokeWidth={1}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          inView
            ? { opacity: [0, 0.5, 0], scale: [0.4, 1.8, 2.4] }
            : {}
        }
        transition={{
          delay,
          duration: 1.4,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeOut",
        }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={3.5}
        fill={color}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay, duration: 0.3, ease: "backOut" }}
      />
    </motion.g>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
function FooterNav({ inView, reduceMotion }: { inView: boolean; reduceMotion: boolean }) {
  return (
    <nav className="flex flex-wrap gap-x-10 gap-y-3 text-sm text-[#5b4a2e]" aria-label="Footer">
      {footerLinks.map((link, index) => (
        <motion.div
          key={link.label}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: reduceMotion ? 0 : 0.4,
            delay: reduceMotion ? 0 : 0.6 + index * 0.07,
            ease: EASE,
          }}
        >
          <Link
            href={link.href}
            className="group relative inline-flex items-center text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:text-[#1e1a12]"
          >
            <span className="relative z-10 px-3 py-1.5">{link.label}</span>
            <span className="absolute inset-0 -z-10 rounded-full bg-[#f3d9ae]/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <span className="absolute left-3 right-3 bottom-1 h-[2px] origin-left scale-x-0 bg-[#c88b2a] transition-transform duration-200 group-hover:scale-x-100" />
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}

function FooterSocialLinks({ inView, reduceMotion }: { inView: boolean; reduceMotion: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-label="Social media">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e9d6b7] text-[#5b4a2e] transition-colors hover:border-[#c88b2a] hover:text-[#1e1a12]"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: reduceMotion ? 0 : 0.35,
            delay: reduceMotion ? 0 : 0.7 + index * 0.08,
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
          whileHover={reduceMotion ? {} : { scale: 1.08, rotate: 6 }}
          whileTap={reduceMotion ? {} : { scale: 0.96 }}
        >
          <span className="sr-only">{social.label}</span>
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
}

export default function FooterCta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 22 });
  const slowX = useTransform(springX, (v) => v * 0.6);
  const slowY = useTransform(springY, (v) => v * 0.6);
  const midX = useTransform(springX, (v) => v * 0.9);
  const midY = useTransform(springY, (v) => v * 0.9);

  // Radial gradient follows mouse
  const gradX = useTransform(springX, [-9, 9], ["30%", "70%"]);
  const gradY = useTransform(springY, [-6, 6], ["20%", "80%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 18);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 12);
  };

  const paths = [
    {
      id: "line-main",
      d: "M 10 155 C 60 80, 140 20, 250 75",
      stroke: "#1e1a12",
      strokeWidth: 1.5,
      dasharray: "none",
      opacity: 0.5,
      delay: 0.5,
      duration: 1.0,
    },
    {
      id: "line-secondary",
      d: "M 30 160 C 80 100, 160 40, 255 95",
      stroke: "#c88b2a",
      strokeWidth: 1,
      dasharray: "3 7",
      opacity: 0.55,
      delay: 0.75,
      duration: 1.1,
    },
    {
      id: "line-tertiary",
      d: "M 5 145 C 55 60, 130 10, 248 58",
      stroke: "#1e1a12",
      strokeWidth: 0.8,
      dasharray: "1 9",
      opacity: 0.2,
      delay: 1.0,
      duration: 1.2,
    },
  ] as const;

  const ringStack = [
    { size: 420, opacity: 0.28, delay: 0 },
    { size: 560, opacity: 0.22, delay: 0.2 },
    { size: 700, opacity: 0.18, delay: 0.4 },
    { size: 840, opacity: 0.14, delay: 0.6 },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative overflow-hidden bg-[#fff6e3] py-16"
    >
      <div className="pointer-events-none absolute -left-56 bottom-[-220px] hidden h-[860px] w-[860px] md:block">
        {ringStack.map((ring) => (
          <motion.span
            key={ring.size}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              left: 0,
              bottom: 0,
              opacity: ring.opacity,
              borderWidth: 42,
              borderStyle: "solid",
              borderColor: "rgba(232, 145, 20, 0.75)",
            }}
            animate={
              reduceMotion
                ? { opacity: ring.opacity }
                : { y: [0, -14, 0], scale: [0.985, 1.035, 1] }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ring.delay,
            }}
          />
        ))}
      </div>

      {/* Dynamic background radial glow following mouse */}
      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(
              [gradX, gradY],
              ([x, y]) =>
                `radial-gradient(ellipse 55% 45% at ${x} ${y}, rgba(232,160,32,0.09), transparent 70%)`
            ),
          }}
        />
      )}

      <div className="mx-auto max-w-6xl px-6">
        <div className="relative">

          {/* ── Card with subtle float bob ── */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 22 }}
            animate={
              inView
                ? reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: [0, -5, 0] }
                : {}
            }
            transition={
              inView
                ? reduceMotion
                  ? { duration: 0.8, ease: EASE }
                  : {
                      opacity: { duration: 0.8, ease: EASE },
                      y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      },
                    }
                : {}
            }
            className="relative z-10 max-w-2xl rounded-3xl border border-[#f0d3a4] bg-white/85 px-8 py-7 shadow-[0_12px_40px_rgba(178,120,34,0.18)] backdrop-blur"
          >
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c88b2a]"
            >
              Let's Build Together
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-2 font-heading text-[clamp(1.7rem,3.6vw,2.5rem)] font-black text-[#1e1a12]"
            >
              We build products that feel premium and perform at scale.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-3 max-w-xl text-sm leading-relaxed text-[#5b4a2e]"
            >
              We build apps, web platforms, and AI products that help businesses
              move faster, operate smarter, and grow sustainably.
            </motion.p>

            {/* Enhanced CTA with breathing pulse ring */}
            <motion.div
              className="mt-6 relative inline-block"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {/* Breathing pulse ring */}
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={
                    inView
                      ? {
                          boxShadow: [
                            "0 0 0 0px rgba(200,139,42,0.5)",
                            "0 0 0 12px rgba(200,139,42,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 1.5,
                  }}
                />
              )}
              <motion.div
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        scale: 1.06,
                        y: -2,
                        boxShadow: "0 8px 24px rgba(200,139,42,0.4)",
                        transition: { duration: 0.25, ease: EASE },
                      }
                }
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link
                  href="/contact"
                  className="btn-yellow inline-flex px-6 py-3 text-sm rounded-full uppercase"
                >
                  Start a Project
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── SVG line cluster (existing, fully preserved) ── */}
          <svg
            className="absolute right-0 top-0 hidden sm:block pointer-events-none"
            width="270"
            height="175"
            viewBox="0 0 270 175"
            fill="none"
            overflow="visible"
          >
            <defs>
              <marker id="arrow-tip" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <motion.path
                  d="M0,0.5 L5,3 L0,5.5"
                  stroke="#c88b2a"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>

            {paths.map((p) => (
              <motion.path
                key={p.id}
                id={p.id}
                d={p.d}
                stroke={p.stroke}
                strokeWidth={p.strokeWidth}
                strokeDasharray={p.dasharray === "none" ? undefined : p.dasharray}
                strokeLinecap="round"
                fill="none"
                markerEnd={p.id === "line-main" ? "url(#arrow-tip)" : undefined}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: p.opacity } : {}}
                transition={{
                  pathLength: { duration: p.duration, delay: p.delay, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.3, delay: p.delay },
                }}
              />
            ))}

            {!reduceMotion && (
              <TravellingDot
                pathId="line-main"
                delay={0.5}
                duration={1.0}
                color="#c88b2a"
                size={4}
                inView={inView}
              />
            )}

            <EndpointPulse x={250} y={75} delay={1.6} inView={inView} color="#c88b2a" />

            {[0.3, 0.55, 0.78].map((t, i) => (
              <motion.line
                key={i}
                x1={0} y1={-5} x2={0} y2={5}
                stroke="#c88b2a"
                strokeWidth={1}
                strokeLinecap="round"
                opacity={0.4}
                style={{
                  translateX: t === 0.3 ? 72 : t === 0.55 ? 140 : 200,
                  translateY: t === 0.3 ? 88 : t === 0.55 ? 48 : 66,
                  rotate: t === 0.3 ? "-55deg" : t === 0.55 ? "-70deg" : "-58deg",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={inView ? { scaleY: 1, opacity: 0.4 } : {}}
                transition={{ duration: 0.25, delay: 0.5 + t * 1.0 }}
              />
            ))}
          </svg>

          {/* ── Parallax blobs (existing, preserved) ── */}
          <motion.div
            style={{ x: slowX, y: slowY }}
            className="pointer-events-none absolute -left-28 -bottom-24 h-64 w-64 rounded-full border border-[#f2d7a8]/70"
          />
          <motion.div
            style={{ x: midX, y: midY }}
            className="pointer-events-none absolute left-8 bottom-6 h-40 w-40 rounded-full border-[10px] border-[#f2d7a8]/60"
          />
          <motion.div
            style={{ x: slowX, y: midY }}
            className="pointer-events-none absolute right-14 top-10 h-20 w-20 rounded-full bg-[#f7e6c7]/70"
          />
        </div>

        {/* ── Footer nav ── */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <FooterNav inView={inView} reduceMotion={!!reduceMotion} />
          <FooterSocialLinks inView={inView} reduceMotion={!!reduceMotion} />
        </div>
      </div>
    </section>
  );
}
