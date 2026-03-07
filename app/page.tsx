import About from "@/components/home/About";
import DarkBanner from "@/components/home/DarkBanner";
import FooterCta from "@/components/home/FooterCta";
import Hero from "@/components/home/Hero";
import Integration from "@/components/home/Integration";
import Marquee from "@/components/home/Marquee";
import ServiceCards from "@/components/home/ServiceCards";
import ServicesStrip from "@/components/home/ServicesStrip";
import Stats from "@/components/home/Stats";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <div className="hero-surface">
        <div className="hero-intro-panel hero-intro-panel-primary" aria-hidden="true" />
        <div className="hero-intro-panel hero-intro-panel-secondary" aria-hidden="true" />
        <div className="hero-intro-orb" aria-hidden="true" />
        <div className="hero-intro-frame" aria-hidden="true" />
        <header>
          <Navbar />
          <Hero />
        </header>
      </div>
      <main>
        <ServicesStrip />
        <Integration />
        <Marquee />
        <Stats />
        <DarkBanner />
        <About />
        <ServiceCards />
        <FooterCta />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
