import Navbar from "@/components/shared/Navbar";
import FooterCta from "@/components/home/FooterCta";
import Marquee from "@/components/home/Marquee";
import AiSolutionsHero from "@/components/ai-solutions/AiSolutionsHero";
import AiSolutionsOverview from "@/components/ai-solutions/AiSolutionsOverview";
import AiSolutionsCta from "@/components/ai-solutions/AiSolutionsCta";
import VideoComponent from "@/components/shared/VideoComponent";
import { siteVideos } from "@/lib/videoData";

export default function AiSolutionsPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <AiSolutionsHero />
      
        <AiSolutionsOverview />
        <section className="relative min-h-[130vh] overflow-hidden bg-[#fefaf2] py-16 md:py-22">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#e8a020] opacity-10 blur-3xl" />
          <div className="relative max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
            <div className="space-y-5 lg:pt-20">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8a020]">
                Product Velocity
              </p>
              <h2 className="text-[clamp(2.2rem,5vw,4.1rem)] font-black leading-[0.9] text-[#1e1a12]">
                Interactive spotlight on AI execution.
              </h2>
              <p className="text-[0.98rem] leading-relaxed text-[#5f564c]">
                Scroll into a fixed hero frame and hover to push depth, scale, and perspective for
                an immersive feel.
              </p>
            </div>
            <VideoComponent
              videoSrc={siteVideos.aiSolutions.src}
              effect="interactive"
              wrapperClassName="lg:sticky lg:top-20"
              className="aspect-[16/10] min-h-[64vh] object-cover"
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b101a] py-16 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,172,254,0.18),transparent_55%)]" />
          <div className="relative max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <VideoComponent
              videoSrc={siteVideos.openSpace.src}
              effect="holographic"
              className="aspect-[16/10] object-cover"
            />
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8fd7ff]">
                Open Space Flow
              </p>
              <h3 className="text-[clamp(1.9rem,4.2vw,3.2rem)] font-black leading-[0.92] text-white">
                Holographic innovation showcase.
              </h3>
              <p className="text-[0.96rem] leading-relaxed text-[#cfd8e8]">
                A polished holographic entrance for high-velocity team collaboration in real working
                environments.
              </p>
            </div>
          </div>
        </section>
        <Marquee />
        <AiSolutionsCta />
      </main>
      <FooterCta />
    </div>
  );
}
