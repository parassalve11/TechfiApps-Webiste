"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { EASE } from "./animations";

type ContactFormSectionProps = {
  intent?: string;
};

const intentTemplates: Record<string, string> = {
  "Start Project": "Start Project: We want to kick off a new product build.",
  "Get Proposal": "Get Proposal: Please share a scope, timeline, and budget estimate.",
  "Talk to Us": "Talk to Us: We have questions and want to discuss next steps.",
  "Talk to Expert": "Talk to Expert: We need guidance on AI/product strategy.",
};

export default function ContactFormSection({ intent }: ContactFormSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project: "" });
  const [activeIntent, setActiveIntent] = useState<string | undefined>(intent);

  useEffect(() => {
    if (!intent) return;
    const template = intentTemplates[intent] ?? intent;
    setForm((prev) => ({ ...prev, project: template }));
    setActiveIntent(intent);
    setSent(false);
  }, [intent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section ref={ref} id="contact-form" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div>
          <motion.p
            className="text-xs font-bold uppercase tracking-[0.22em] text-[#e8a020] mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Let's talk
          </motion.p>
          {activeIntent && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f5efe4] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#7c5a1f]"
            >
              Selected: {activeIntent}
            </motion.div>
          )}
          <motion.h2
            className="font-black text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] text-[#1e1a12] mb-5"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          >
            TELL US ABOUT YOUR NEXT BIG IDEA.
          </motion.h2>
          <motion.p
            className="text-[0.88rem] leading-relaxed text-[#666] max-w-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            Tell us about your project or next big ideas. Our team is ready to
            discuss how we can bring it to life using advanced AI and technology
            solutions.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {["#e8a020", "#1e1a12", "#e8a020"].map((color, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{ width: i === 1 ? 40 : 12, height: 12, backgroundColor: color }}
                animate={{ scaleX: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="bg-[#f5f0e8] rounded-2xl p-10 text-center"
            >
              <div className="text-4xl mb-4">ðŸš€</div>
              <h3 className="font-black text-xl text-[#1e1a12] mb-2">Request Sent!</h3>
              <p className="text-sm text-[#666]">We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { name: "name", placeholder: "Name", type: "text" },
                { name: "email", placeholder: "Email", type: "email" },
              ].map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.08, ease: EASE }}
                  className="relative group"
                >
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={form[field.name as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full bg-[#fafaf8] border border-[#e8e4da] rounded-lg px-4 py-3.5 text-sm text-[#1e1a12] placeholder-[#bbb] outline-none transition-all duration-200 focus:border-[#e8a020] focus:shadow-[0_0_0_3px_rgba(232,160,32,0.12)]"
                  />
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#e8a020] origin-left rounded-full pointer-events-none"
                    initial={{ scaleX: 0 }}
                    whileFocus={{ scaleX: 1 }}
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.51, ease: EASE }}
              >
                <textarea
                  placeholder="Project Idea"
                  rows={4}
                  value={form.project}
                  onChange={(e) => setForm({ ...form, project: e.target.value })}
                  className="w-full bg-[#fafaf8] border border-[#e8e4da] rounded-lg px-4 py-3.5 text-sm text-[#1e1a12] placeholder-[#bbb] outline-none transition-all duration-200 focus:border-[#e8a020] focus:shadow-[0_0_0_3px_rgba(232,160,32,0.12)] resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.6, ease: EASE }}
                className="relative"
              >
                <motion.span
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  animate={{
                    boxShadow: [
                      "0 0 0 0px rgba(232,160,32,0.4)",
                      "0 0 0 10px rgba(232,160,32,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2, boxShadow: "0 8px 24px rgba(232,160,32,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#e8a020] text-black font-black uppercase tracking-[0.15em] text-sm py-4 rounded-lg transition-colors hover:bg-[#d4911a]"
                >
                  SEND REQUEST
                </motion.button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
