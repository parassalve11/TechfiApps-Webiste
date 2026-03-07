import Navbar from "@/components/shared/Navbar";
import FooterCta from "@/components/home/FooterCta";
import AboutHero from "@/components/about/AboutHero";
import ServicesStrip from "@/components/home/ServicesStrip";
import MissionSection from "@/components/about/MissionSection";
import LeadershipSection from "@/components/about/LeadershipSection";
import TeamSection from "@/components/about/TeamSection";
import ProductSection from "@/components/about/ProductSection";
import TestimonialsSection from "@/components/about/TestimonialsSection";
import ContactFormSection from "@/components/about/ContactFormSection";
import Marquee from "@/components/home/Marquee";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AboutHero />
      <ServicesStrip />
      <MissionSection />
      <Marquee />
      <LeadershipSection />
      <TeamSection />
      
      <ProductSection />
      <TestimonialsSection />
      <ContactFormSection />
      <FooterCta />
    </div>
  );
}
