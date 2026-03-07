import Navbar from "@/components/shared/Navbar";
import FooterCta from "@/components/home/FooterCta";
import Marquee from "@/components/home/Marquee";
import Ai4gHero from "@/components/ai-4gapi/Ai4gHero";
import CloudManagementBanner from "@/components/ai-4gapi/CloudManagementBanner";
import AiToolsSection from "@/components/ai-4gapi/AiToolsSection";
import AiMigrationsSection from "@/components/ai-4gapi/AiMigrationsSection";
import EndToEndSection from "@/components/ai-4gapi/EndToEndSection";
import Ai4gCta from "@/components/ai-4gapi/Ai4gCta";


export default function Ai4gApiPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Ai4gHero />
      
        <CloudManagementBanner />
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
