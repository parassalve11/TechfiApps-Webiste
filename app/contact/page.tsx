import ContactFormSection from "@/components/about/ContactFormSection";
import FooterCta from "@/components/home/FooterCta";
import Navbar from "@/components/shared/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <ContactFormSection />
        <FooterCta />
      </main>
    </div>
  );
}
