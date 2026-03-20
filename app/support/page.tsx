"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const supportChannels = [
  {
    title: "Project Support",
    desc: "Questions about your build, timelines, or deliverables? Reach our team directly.",
    cta: "Start a Ticket",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 6h14v8H9l-4 4V6z" />
      </svg>
    ),
  },
  {
    title: "Partnerships",
    desc: "Need long-term support or a dedicated team? Let’s align on scope and cadence.",
    cta: "Talk to Us",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 8a4 4 0 1 0-8 0v2H5v8h14v-8h-3V8z" />
      </svg>
    ),
  },
  {
    title: "Quick Response",
    desc: "Need a fast reply? We aim to answer within 24 hours on business days.",
    cta: "Send Email",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 6h16v12H4z" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "How soon can we start?",
    a: "Most engagements begin within 1–2 weeks after scope alignment and kickoff approval.",
  },
  {
    q: "Do you support ongoing maintenance?",
    a: "Yes. We offer monthly support retainers for monitoring, updates, and feature additions.",
  },
  {
    q: "What does the typical process look like?",
    a: "We run a discovery sprint, align milestones, ship weekly updates, and iterate fast.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We plug into your workflow and collaborate with your product and engineering teams.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. We can sign mutual NDAs before sharing sensitive details.",
  },
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#fff9ef]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c88b2a]">
            Support Center
          </p>
          <h1 className="heading-open mt-3 text-[clamp(2.2rem,4vw,3.2rem)] font-black">
            We’re here to help you move faster.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#5b4a2e]">
            Whether you need quick guidance or long-term delivery support, our team stays close
            and responsive throughout your product journey.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {supportChannels.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="rounded-2xl border border-[#f1dcc0] bg-white p-6 shadow-[0_16px_36px_rgba(200,139,42,0.12)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1da] text-[#c88b2a]">
                {item.icon}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-[#1e1a12]">{item.title}</h2>
              <p className="mt-2 text-sm text-[#5b4a2e]">{item.desc}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1e1a12] hover:text-[#c88b2a]"
              >
                {item.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-xl font-bold text-[#1e1a12]">Frequently Asked Questions</h2>
            <div className="mt-4 flex flex-col gap-3">
              {faqs.map((faq, index) => {
                const open = openIndex === index;
                return (
                  <button
                    key={faq.q}
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="rounded-2xl border border-[#f1dcc0] bg-white px-5 py-4 text-left transition hover:border-[#c88b2a]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-[#1e1a12]">{faq.q}</span>
                      <span className="text-lg text-[#c88b2a]">{open ? "–" : "+"}</span>
                    </div>
                    {open && (
                      <p className="mt-3 text-sm leading-relaxed text-[#5b4a2e]">{faq.a}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-[#f1dcc0] bg-white p-6 shadow-[0_16px_36px_rgba(200,139,42,0.12)]">
            <h3 className="text-lg font-semibold text-[#1e1a12]">Support Hours</h3>
            <p className="mt-2 text-sm text-[#5b4a2e]">
              Monday to Friday, 10:00 AM – 7:00 PM IST
            </p>
            <div className="mt-5 rounded-xl border border-[#f4e5cc] bg-[#fff6e3] p-4 text-sm text-[#5b4a2e]">
              For urgent issues, use the contact form and tag your request as “Priority”.
            </div>
            <Link
              href="/contact"
              className="btn-yellow mt-6 inline-flex rounded-full px-5 py-2.5 text-sm uppercase"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
