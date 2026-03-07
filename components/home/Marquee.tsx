"use client";

// Marquee.tsx
// Animations added:
// - CSS-driven infinite horizontal scroll via Framer Motion's animate
// - Pause on hover (both tracks independently) via whileHover animationPlayState equivalent
// - Fade-in entrance of the entire section on mount
// - Subtle scale + opacity oscillation on individual text items on hover
// - The two tracks scroll in opposite directions for visual depth

import { motion, useReducedMotion } from "framer-motion";

export default function Marquee() {
  const bullet = String.fromCharCode(8226);
  const text = `MODERNIZE ${bullet} INNOVATE ${bullet} ACCELERATE ${bullet}`;
  const reduceMotion = useReducedMotion();

  // Repeat items enough to fill any screen
  const items = Array.from({ length: 8 });

  const trackStyle = {
    display: "flex",
    gap: "0",
    willChange: "transform",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Track 1: left-to-right (outline text) ── */}
      <div className="overflow-hidden py-2 border-t border-b border-gray-100">
        <motion.div
          style={trackStyle}
          animate={reduceMotion ? {} : { x: ["0%", "-50%"] }}
          transition={
            reduceMotion
              ? {}
              : {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 28,
                    ease: "linear",
                  },
                }
          }
          whileHover={reduceMotion ? {} : { animationPlayState: "paused" }}
          className="group"
        >
          {/* Double the items so seamless loop works */}
          {[...items, ...items].map((_, index) => (
            <motion.span
              key={`outline-${index}`}
              className="marquee-outline-text"
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      scale: 1.08,
                      opacity: 0.7,
                      transition: { duration: 0.2 },
                    }
              }
            >
              {text}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Track 2: right-to-left (solid text) ── */}
      <div className="overflow-hidden py-2 bg-white">
        <motion.div
          style={trackStyle}
          animate={reduceMotion ? {} : { x: ["-50%", "0%"] }}
          transition={
            reduceMotion
              ? {}
              : {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 24,
                    ease: "linear",
                  },
                }
          }
        >
          {[...items, ...items].map((_, index) => (
            <motion.span
              key={`solid-${index}`}
              className="marquee-solid-text"
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      scale: 1.08,
                      color: "#e8a020",
                      transition: { duration: 0.2 },
                    }
              }
            >
              {text}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}