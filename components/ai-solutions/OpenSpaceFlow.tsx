"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/components/about/animations";

const serviceMix = [
  { label: "Product Build", value: 42 },
  { label: "AI Automation", value: 28 },
  { label: "Cloud Security", value: 18 },
  { label: "Analytics", value: 12 },
];

const productModules = [
  { label: "AI Assistants", stat: "24 live" },
  { label: "Reward Engines", stat: "12 programs" },
  { label: "Ops Dashboards", stat: "18 teams" },
  { label: "Workflow Bots", stat: "31 flows" },
];

const deliverySignals = [
  { label: "Release Velocity", value: "28/mo" },
  { label: "Active AI Workflows", value: "52" },
  { label: "Automation Hours", value: "1.4k/mo" },
];

const stackCoverage = [
  "Research",
  "UX Systems",
  "MLOps",
  "Security",
  "Data",
  "QA",
];

export default function OpenSpaceFlow() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative min-h-[420px] lg:min-h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-[#0f1726] p-6 shadow-[0_30px_80px_rgba(8,12,24,0.55)]"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,172,254,0.18),transparent_55%)]" />
      <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-[#8fd7ff] opacity-10 blur-3xl" />

      <div className="relative z-10 space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {deliverySignals.map((signal) => (
            <div
              key={signal.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="text-[0.6rem] uppercase tracking-[0.2em] text-[#9fb6d4]">
                {signal.label}
              </div>
              <div className="mt-2 text-lg font-black text-white">{signal.value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.6fr_0.4fr]">
          <div className="space-y-4">
            <div>
              <div className="text-[0.65rem] uppercase tracking-[0.22em] text-[#8fd7ff]">
                Service Mix
              </div>
              <div className="mt-3 space-y-3">
                {serviceMix.map((item, index) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-[0.75rem] font-semibold text-white/80">
                      <span>{item.label}</span>
                      <span className="text-[#8fd7ff]">{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#8fd7ff] to-[#f5d080]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 + index * 0.1, ease: EASE }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {productModules.map((module) => (
                <div
                  key={module.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-transform duration-200 hover:-translate-y-1 hover:border-[#8fd7ff]/40"
                >
                  <div className="text-[0.7rem] uppercase tracking-[0.2em] text-[#9fb6d4]">
                    {module.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">{module.stat}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <div className="text-[0.65rem] uppercase tracking-[0.22em] text-[#8fd7ff]">
                Stack Coverage
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {stackCoverage.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1726] via-[#101b2f] to-[#0b101a] px-4 py-4">
              <div className="text-[0.65rem] uppercase tracking-[0.22em] text-[#8fd7ff]">
                Product Outcomes
              </div>
              <div className="mt-3 space-y-3">
                {[
                  { label: "Customer Retention", value: "+38%" },
                  { label: "Cycle Time", value: "-42%" },
                  { label: "Automation ROI", value: "6.2x" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm text-white/85">
                    <span>{row.label}</span>
                    <span className="font-semibold text-[#f5d080]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
