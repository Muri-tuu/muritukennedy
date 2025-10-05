import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";

import profilePicture from "@assets/Profile Picture_1755692636143.jpg";
import CometBackground from "@/components/comet-background";

export default function Home() {
  return (
    <div className="relative bg-dark-900 text-white font-sans overflow-x-hidden min-h-screen">
      <CometBackground />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${profilePicture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(12px)",
        }}
      />
      <div className="fixed inset-0 -z-10 bg-black/60" />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
