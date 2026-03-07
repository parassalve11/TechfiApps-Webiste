import Navbar from "@/components/shared/Navbar";
import FooterCta from "@/components/home/FooterCta";
import Marquee from "@/components/home/Marquee";
import AiSolutionsHero from "@/components/ai-solutions/AiSolutionsHero";
import AiSolutionsOverview from "@/components/ai-solutions/AiSolutionsOverview";
import AiSolutionsCta from "@/components/ai-solutions/AiSolutionsCta";


export default function AiSolutionsPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <AiSolutionsHero />
      
        <AiSolutionsOverview />
        <Marquee />
        <AiSolutionsCta />
      </main>
      <FooterCta />
    </div>
  );
}
