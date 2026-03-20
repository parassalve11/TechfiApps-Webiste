"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const effectiveDate = "March 20, 2026";

const highlights = [
  {
    key: "data",
    label: "Data We Collect",
    body:
      "We collect contact details, project requirements, and communication history to deliver services and support.",
  },
  {
    key: "usage",
    label: "How We Use Data",
    body:
      "We use data to respond to requests, deliver projects, improve our services, and maintain security.",
  },
  {
    key: "security",
    label: "Security",
    body:
      "We apply standard safeguards and limit access to authorized team members only.",
  },
];

const sections = [
  {
    id: "collection",
    title: "Information Collection",
    body:
      "We collect information you provide directly through our forms, emails, or project documents, including name, email, and project details.",
  },
  {
    id: "usage",
    title: "Use of Information",
    body:
      "Information is used to deliver services, communicate updates, process agreements, and improve our internal workflows.",
  },
  {
    id: "sharing",
    title: "Sharing",
    body:
      "We do not sell your data. We may share information with trusted service providers only as required to operate our services.",
  },
  {
    id: "retention",
    title: "Retention",
    body:
      "We retain data only as long as necessary to fulfill the purposes described or to comply with legal obligations.",
  },
  {
    id: "rights",
    title: "Your Rights",
    body:
      "You may request access, correction, or deletion of your information by contacting us. We will respond promptly.",
  },
  {
    id: "contact",
    title: "Contact",
    body:
      "If you have privacy questions, reach out using our contact page and we’ll assist.",
  },
];

export default function PrivacyPage() {
  const [active, setActive] = useState(highlights[0].key);

  return (
    <section className="bg-[#fff9ef]">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c88b2a]">
            Legal
          </p>
          <h1 className="mt-3 font-heading text-[clamp(2.1rem,3.6vw,3rem)] font-black text-[#1e1a12]">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-[#5b4a2e]">Effective date: {effectiveDate}</p>
          <p className="mt-4 text-sm leading-relaxed text-[#5b4a2e]">
            We respect your privacy and are transparent about how we collect, use, and protect
            your information.
          </p>
        </motion.div>

        <div className="mt-10 rounded-2xl border border-[#f1dcc0] bg-white p-5 shadow-[0_16px_36px_rgba(200,139,42,0.1)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7c5a1f]">
            Privacy Highlights
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  active === item.key
                    ? "border-[#c88b2a] bg-[#fff6e3] text-[#1e1a12]"
                    : "border-transparent bg-[#fffaf1] text-[#7c5a1f] hover:border-[#c88b2a]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#5b4a2e]">
            {highlights.find((item) => item.key === active)?.body}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.04 }}
              className="rounded-2xl border border-[#f1dcc0] bg-white p-6 shadow-[0_16px_36px_rgba(200,139,42,0.08)]"
            >
              <h2 className="text-lg font-semibold text-[#1e1a12]">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5b4a2e]">{section.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
