import About from "@/components/home/About";
import DarkBanner from "@/components/home/DarkBanner";
import FooterCta from "@/components/home/FooterCta";
import Hero from "@/components/home/Hero";
import Integration from "@/components/home/Integration";
import Marquee from "@/components/home/Marquee";
import ServiceCards from "@/components/home/ServiceCards";
import ServicesStrip from "@/components/home/ServicesStrip";
import Stats from "@/components/home/Stats";
import Navbar from "@/components/shared/Navbar";
import VideoComponent from "@/components/shared/VideoComponent";
import { siteVideos } from "@/lib/videoData";

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
        <section className="bg-[#f8f3eb] py-14 md:py-18">
          <div className="max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-center">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8a020]">
                Team In Action
              </p>
              <h2 className="text-[clamp(2rem,4.6vw,3.8rem)] font-black leading-[0.92] text-[#1e1a12]">
                How product teams actually build.
              </h2>
              <p className="text-[0.98rem] leading-relaxed text-[#5f564c]">
                A cinematic reveal of real-world collaboration inside the Techify delivery flow.
              </p>
            </div>
            <VideoComponent
              videoSrc={siteVideos.home.src}
              effect="cinematic"
              className="aspect-video object-cover"
            />
          </div>
        </section>
        <section className="bg-white py-14 md:py-18">
          <div className="max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8a020]">
                Meeting Snapshot
              </p>
              <h3 className="text-[clamp(1.8rem,4vw,3.1rem)] font-black leading-[0.92] text-[#1e1a12]">
                Real client discussions, real delivery momentum.
              </h3>
              <p className="text-[0.96rem] leading-relaxed text-[#5f564c]">
                A polished mobile-format showcase using our spotlight animation for a clean,
                premium presentation.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[360px]">
              <VideoComponent
                videoSrc={siteVideos.officeMeetingMobile.src}
                effect="spotlight"
                className="aspect-[9/16] object-cover"
              />
            </div>
          </div>
        </section>
        <ServicesStrip />
        <Integration />
        <Marquee />
        <Stats />
        <DarkBanner />
        <About />
        <ServiceCards />
        <FooterCta />
      </main>
    </div>
  );
}
