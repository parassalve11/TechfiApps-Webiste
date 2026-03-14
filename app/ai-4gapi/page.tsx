import Navbar from "@/components/shared/Navbar";
import FooterCta from "@/components/home/FooterCta";
import Marquee from "@/components/home/Marquee";
import Ai4gHero from "@/components/ai-4gapi/Ai4gHero";
import CloudManagementBanner from "@/components/ai-4gapi/CloudManagementBanner";
import AiToolsSection from "@/components/ai-4gapi/AiToolsSection";
import AiMigrationsSection from "@/components/ai-4gapi/AiMigrationsSection";
import EndToEndSection from "@/components/ai-4gapi/EndToEndSection";
import Ai4gCta from "@/components/ai-4gapi/Ai4gCta";
import VideoComponent from "@/components/shared/VideoComponent";
import { siteVideos } from "@/lib/videoData";

export default function Ai4gApiPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Ai4gHero />
      
        <CloudManagementBanner />
        <section className="relative min-h-[140vh] bg-[#0a0d11] py-16 md:py-22 flex items-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,160,32,0.18),transparent_60%)]" />
          <div className="relative max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <VideoComponent
              videoSrc={siteVideos.ai4gapi.src}
              effect="reveal"
              wrapperClassName="lg:sticky lg:top-20"
              className="aspect-[16/9] min-h-[68vh] object-cover"
            />
            <div className="space-y-5 lg:pt-20">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8a020]">
                API Collaboration
              </p>
              <h2 className="text-[clamp(2.3rem,5vw,4.6rem)] font-black leading-[0.9] text-white">
                Full-screen reveal for enterprise API rollouts.
              </h2>
              <p className="text-[0.98rem] leading-relaxed text-[#d7dbe5]">
                Black shutters open across the viewport to expose the video in a dramatic, cinematic
                sequence.
              </p>
            </div>
          </div>
        </section>
        <Marquee />
        <AiToolsSection />
        <AiMigrationsSection />
        <EndToEndSection />
        <Ai4gCta />
      </main>
      <FooterCta />
    </div>
  );
}
