import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

import profilePicture from "@assets/Profile Picture_1755692636143.jpg";
import DarkVeil from "@/components/dark-veil";

export default function Home() {
  return (
    <div className="relative bg-background text-foreground font-sans overflow-x-hidden min-h-screen">
      <div className="fixed inset-0 -z-10" aria-hidden>
        <DarkVeil />
      </div>
      {/* Remove heavy image blur overlay to let WebGL show through */}
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
