import Navigation from "@/components/premium/navigation";
import HeroSection from "@/components/premium/hero-section";
import AboutSection from "@/components/premium/about-section";
import ExperienceSection from "@/components/premium/experience-section";
import ProjectsSection from "@/components/premium/projects-section";
import ContactSection from "@/components/premium/contact-section";
import Footer from "@/components/premium/footer";
import SideElements from "@/components/premium/side-elements";
import ScrollProgress from "@/components/premium/scroll-progress";

export default function HomePremium() {
  return (
    <div className="relative bg-background text-foreground min-h-screen">
      <ScrollProgress />
      <Navigation />
      <SideElements />
      
      <main className="max-w-6xl mx-auto">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
