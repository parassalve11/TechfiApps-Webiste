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
import VideoComponent from "@/components/shared/VideoComponent";
import { siteVideos } from "@/lib/videoData";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AboutHero />
      <ServicesStrip />
      <MissionSection />
      <section className="relative min-h-[135vh] overflow-hidden bg-[#0f1115] py-18 md:py-24">
        <div className="absolute -left-16 top-8 h-44 w-44 rounded-full bg-[#e8a020] opacity-20 blur-3xl" />
        <div className="absolute right-8 bottom-8 h-52 w-52 rounded-full bg-[#f8e6c7] opacity-20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="space-y-5 lg:pt-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8a020]">
              Team Focus
            </p>
            <h2 className="text-[clamp(2.4rem,5vw,4.4rem)] font-black leading-[0.92] text-white">
              Where AI governance meets execution.
            </h2>
            <p className="text-[0.98rem] leading-relaxed text-[#d2d6df]">
              A fixed cinematic frame with aggressive parallax movement that keeps attention locked
              as the section scrolls.
            </p>
          </div>
          <VideoComponent
            videoSrc={siteVideos.about.src}
            effect="parallax"
            wrapperClassName="lg:sticky lg:top-20"
            className="aspect-[16/10] min-h-[62vh] object-cover"
          />
        </div>
      </section>
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
