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
          filter: "blur(12px)",
        }}
      />
      <div className="fixed inset-0 -z-10 bg-black/15" />
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
