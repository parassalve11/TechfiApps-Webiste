"use client";

// Navbar.tsx
// Animations added:
// - Entrance: navbar slides down from top on mount
// - Scroll: navbar background becomes opaque + shadow on scroll (glass morphism effect)
// - Nav links: underline slides in on hover from left to right
// - Buttons: scale + color transition on hover with micro-interaction
// - Logo: scale on hover
// - Mobile: existing layout preserved, book-a-call button animates
// - useReducedMotion respected

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { navLinks } from "@/lib/homeData";
import TechifyMark from "@/components/shared/TechifyMark";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isSolutionsRoute =
    pathname === "/ai-solutions" ||
    pathname?.startsWith("/ai-solutions/") ||
    pathname === "/ai-4gapi" ||
    pathname?.startsWith("/ai-4gapi/");

  const isActiveLink = (href: string, label: string) => {
    if (label === "Solutions") return isSolutionsRoute;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (!solutionsOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSolutionsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [solutionsOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!solutionsOpen && !mobileOpen) return;
    const onScroll = () => {
      setSolutionsOpen(false);
      setMobileOpen(false);
      setMobileSolutionsOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solutionsOpen, mobileOpen]);

  useEffect(() => {
    setSolutionsOpen(false);
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
  }, [pathname]);

  // Detect scroll to switch navbar style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solutionsItems = [
    {
      number: "01",
      title: "AI Solutions",
      desc: "A complete AI solution that automates workflows, turns data into insights, and helps your business move faster with smarter decisions.",
      href: "/ai-solutions",
    },
    {
      number: "02",
      title: "AI 4GAPI",
      desc: "A powerful AI 4GAPI that lets you quickly integrate intelligent automation, real-time insights, and generative features into any app or workflow.",
      href: "/ai-4gapi",
      bullets: ["Cloud Management", "AI Tools", "AI Migrations", "End-to-End AI"],
    },
  ];

  const dialogVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.25,
        ease: EASE,
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
    show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.35, ease: EASE } },
  };

  return (
    <motion.nav
      className="w-full sticky top-0 z-50 transition-all duration-300 relative"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        borderBottom: scrolled ? "1px solid #efe2cf" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
      }}
      // Slide down from top on mount
      initial={{ y: reduceMotion ? 0 : -64, opacity: reduceMotion ? 1 : 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center gap-6 relative">

        {/* Logo with hover scale */}
        <motion.div
          whileHover={reduceMotion ? {} : { scale: 1.04, transition: { duration: 0.2 } }}
          whileTap={reduceMotion ? {} : { scale: 0.97 }}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="nav-logo flex items-center gap-3">
              <motion.div
                whileHover={
                  reduceMotion
                    ? {}
                    : { rotate: 6, transition: { duration: 0.25, ease: EASE } }
                }
              >
                <TechifyMark />
              </motion.div>
              <span className="text-[0.95rem] font-semibold tracking-tight text-[#1e1a12]">
                TechifyApps
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop nav links with animated underline */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-8 text-[0.95rem] text-[#2c2c2c]">
          {navLinks.map((link, index) => {
            const active = isActiveLink(link.href, link.label);
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion ? 0 : 0.1 + index * 0.07,
                  ease: EASE,
                }}
              >
                {link.label === "Solutions" ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      setSolutionsOpen((prev) => !prev);
                    }}
                    className={`nav-link relative group inline-flex flex-col items-center ${
                      active ? "text-[#1e1a12] font-semibold" : ""
                    }`}
                    aria-haspopup="dialog"
                    aria-expanded={solutionsOpen}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-[1.5px] bg-[#e8a020] origin-left"
                      initial={{ scaleX: active ? 1 : 0 }}
                      animate={{ scaleX: active ? 1 : 0 }}
                      whileHover={
                        reduceMotion ? {} : { scaleX: 1, transition: { duration: 0.25, ease: EASE } }
                      }
                      style={{ width: "100%" }}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`nav-link relative group inline-flex flex-col items-center ${
                      active ? "text-[#1e1a12] font-semibold" : ""
                    }`}
                    onClick={() => setSolutionsOpen(false)}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-[1.5px] bg-[#e8a020] origin-left"
                      initial={{ scaleX: active ? 1 : 0 }}
                      animate={{ scaleX: active ? 1 : 0 }}
                      whileHover={
                        reduceMotion ? {} : { scaleX: 1, transition: { duration: 0.25, ease: EASE } }
                      }
                      style={{ width: "100%" }}
                    />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="ml-auto lg:ml-0 hidden md:flex items-center gap-4 text-[0.95rem] text-[#2c2c2c]">
          {/* Talk to us - main CTA */}
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.48, ease: EASE }}
            whileHover={
              reduceMotion
                ? {}
                : {
                    scale: 1.05,
                    boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
                    transition: { duration: 0.22 },
                  }
            }
            whileTap={{ scale: 0.97 }}
            className="rounded"
          >
            <Link
              href="/contact"
              className="rounded-full bg-[#111] px-5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#2a2a2a]"
            >
              Talk to us
            </Link>
          </motion.div>
        </div>

        {/* Mobile actions */}
        <div className="ml-auto md:hidden flex items-center gap-3">
          <motion.button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#efe2cf] bg-white text-[#1e1a12] shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            whileHover={reduceMotion ? {} : { scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span className={`h-[2px] w-5 bg-current transition-transform ${mobileOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`h-[2px] w-5 bg-current transition-transform ${mobileOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, delay: 0.2 }}
            whileHover={reduceMotion ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/contact"
              className="rounded-full bg-[#111] px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#2a2a2a]"
            >
              Talk to us
            </Link>
          </motion.div>
        </div>
      </div>

      {mobileOpen && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-[1px] lg:hidden"
            aria-label="Close menu"
            onClick={() => {
              setMobileOpen(false);
              setMobileSolutionsOpen(false);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          />
          <motion.div
            className="absolute left-0 right-0 top-full z-[60] lg:hidden"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
          >
            <div className="mx-auto max-w-[1200px] px-6 pb-6">
              <div className="rounded-2xl border border-[#efe2cf] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.18)] p-5">
                <div className="flex flex-col gap-3 text-[0.95rem] text-[#2c2c2c]">
                  {navLinks
                    .filter((link) => link.label !== "Solutions")
                    .map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-xl border border-transparent px-4 py-3 font-semibold transition-colors ${
                          isActiveLink(link.href, link.label)
                            ? "bg-[#fff7ea] text-[#1e1a12]"
                            : "hover:bg-[#faf6ef]"
                        }`}
                      >
                        <span>{link.label}</span>
                        <span className="text-[#c9b08a]">&gt;</span>
                      </Link>
                    ))}

                  <button
                    type="button"
                    onClick={() => setMobileSolutionsOpen((prev) => !prev)}
                    className={`flex items-center justify-between rounded-xl border border-[#f1e5d2] px-4 py-3 font-semibold ${
                      isSolutionsRoute ? "bg-[#fff7ea] text-[#1e1a12]" : "bg-white"
                    }`}
                    aria-expanded={mobileSolutionsOpen}
                  >
                    <span>Solutions</span>
                    <span className={`transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`}>v</span>
                  </button>

                  {mobileSolutionsOpen && (
                    <div className="flex flex-col gap-2 rounded-xl border border-[#f1e5d2] bg-[#fffdf8] p-3">
                      {solutionsItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href ?? "#"}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileSolutionsOpen(false);
                          }}
                          className="flex flex-col rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-[#f1e5d2] hover:bg-white"
                        >
                          <span className="text-[0.85rem] font-semibold text-[#1e1a12]">
                            {item.title}
                          </span>
                          <span className="text-[0.7rem] text-[#7b746b]">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {mounted &&
        solutionsOpen &&
        createPortal(
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[1px]"
              aria-label="Close solutions"
              onClick={() => setSolutionsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
              <motion.div
                role="dialog"
                aria-modal="true"
                className="w-full max-w-[680px] rounded-2xl border border-[#efe2cf] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.2)]"
                variants={dialogVariants}
                initial="hidden"
                animate="show"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 pt-5">
                  <span className="text-[0.75rem] font-black uppercase tracking-[0.24em] text-[#e8a020]">
                    Solutions
                  </span>
                  <button
                    type="button"
                    onClick={() => setSolutionsOpen(false)}
                    className="text-sm text-[#777] hover:text-[#1e1a12]"
                    aria-label="Close"
                  >
                    x
                  </button>
                </div>
                <div className="px-6 pb-6 pt-4">
                  <div className="rounded-xl border border-[#f3eadb] bg-white">
                    <div className="space-y-4 px-4 py-4">
                      {solutionsItems.map((item) => (
                        <motion.div
                          key={item.number}
                          className="flex gap-4"
                          variants={itemVariants}
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#efe2cf] text-[0.75rem] font-black text-[#c9c3b9]">
                            {item.number}
                          </div>
                          <div className="flex-1">
                            {item.href ? (
                              <Link
                                href={item.href}
                                onClick={() => setSolutionsOpen(false)}
                                className="text-[0.95rem] font-semibold text-[#1e1a12] transition-colors hover:text-[#e8a020]"
                              >
                                {item.title}
                              </Link>
                            ) : (
                              <div className="text-[0.95rem] font-semibold text-[#1e1a12]">
                                {item.title}
                              </div>
                            )}
                            <p className="mt-1 text-[0.74rem] leading-relaxed text-[#6f6a62]">
                              {item.desc}
                            </p>
                            {item.bullets && (
                              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[0.7rem] text-[#7b746b]">
                                {item.bullets.map((bullet) => (
                                  <div key={bullet} className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#e8a020]" />
                                    <span>{bullet}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>,
          document.body
        )}
    </motion.nav>
  );
}
