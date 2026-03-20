"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const effectiveDate = "March 20, 2026";

const sections = [
  {
    id: "services",
    title: "Services",
    body:
      "We provide product strategy, design, development, and AI integration services tailored to your scope. Deliverables, timelines, and milestones are defined in your proposal or statement of work.",
  },
  {
    id: "client-responsibilities",
    title: "Client Responsibilities",
    body:
      "You agree to provide timely feedback, access, and resources necessary to complete the work. Delays in approvals or access may impact delivery timelines.",
  },
  {
    id: "payments",
    title: "Payments",
    body:
      "Payment terms are specified in your proposal or contract. Invoices are due within the agreed timeline. Late payments may pause active work until balances are cleared.",
  },
  {
    id: "ip",
    title: "Intellectual Property",
    body:
      "Unless otherwise agreed in writing, ownership of deliverables transfers to you after full payment. We retain rights to pre-existing tools, libraries, and general know-how.",
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body:
      "Both parties agree to keep confidential information private and use it only for the project. This includes business, technical, and operational details.",
  },
  {
    id: "warranties",
    title: "Warranties",
    body:
      "We deliver services professionally and with reasonable care. Except as stated, services are provided “as is” and without additional warranties.",
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    body:
      "Our liability is limited to the amount paid for the services in the last 3 months. We are not liable for indirect or consequential damages.",
  },
  {
    id: "termination",
    title: "Termination",
    body:
      "Either party may terminate with written notice. You are responsible for payment for work completed up to the termination date.",
  },
  {
    id: "contact",
    title: "Contact",
    body:
      "If you have questions about these terms, reach us via the contact page or email.",
  },
];

export default function TermsPage() {
  const [active, setActive] = useState(sections[0].id);

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c88b2a]">
            Legal
          </p>
          <h1 className="heading-open mt-3 text-[clamp(2.1rem,3.6vw,3rem)] font-black">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-[#5b4a2e]">Effective date: {effectiveDate}</p>
          <p className="mt-4 text-sm leading-relaxed text-[#5b4a2e]">
            These terms describe how we work together and what you can expect when engaging
            Techify Apps for digital products and AI services.
          </p>
        </motion.div>

        <div className="mt-10 rounded-2xl border border-[#f1dcc0] bg-[#fff6e3] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7c5a1f]">
            Quick Navigation
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollTo(section.id)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  active === section.id
                    ? "border-[#c88b2a] bg-white text-[#1e1a12]"
                    : "border-transparent bg-white/70 text-[#7c5a1f] hover:border-[#c88b2a]"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
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
