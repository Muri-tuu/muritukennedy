import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

import profilePicture from "@assets/Profile Picture_1755692636143.jpg";
import CometBackground from "@/components/comet-background";
import LaserFlow from "@/components/laser-flow";

export default function Home() {
  return (
    <div className="relative bg-background text-foreground font-sans overflow-x-hidden min-h-screen">
      <CometBackground />
      <LaserFlow color="#38bdf8" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${profilePicture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      />
      <div
        className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-black/10 via-black/5 to-transparent dark:from-black/60 dark:via-black/40 dark:to-transparent"
        aria-hidden
      />
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
