"use client";

import { motion, useReducedMotion } from "framer-motion";

import Navbar from "@/components/shared/Navbar";
import ServicesStrip from "@/components/home/ServicesStrip";
import ContactFormSection from "@/components/about/ContactFormSection";
import { EASE } from "@/components/about/animations";

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
     

        <ContactFormSection />
        {/* <ServicesStrip /> */}
      </main>
    </div>
  );
}
