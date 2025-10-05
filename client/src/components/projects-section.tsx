import { motion } from "framer-motion";
import GradientText from "@/components/gradient-text";
import shukaMetaverseIcon from "@assets/Shuka Metaverse_1755692624114.jpg";
import projectsBg from "@assets/Projects_1755693402302.jpg";
import techHubIcon from "@assets/TechHub_1755692624115.png";
import sparkleLaundryIcon from "@assets/Sparkle Laundry Home_1755692624114.png";
import LogoLoop from "@/components/logo-loop";
import DarkVeil from "@/components/dark-veil";
import { openWhatsAppPopup } from "@/lib/whatsapp";
import ClickSpark from "@/components/click-spark";
import CardSwap, { Card } from "@/components/card-swap";

export default function ProjectsSection() {
  const projects = [
    {
      icon: shukaMetaverseIcon,
      title: "Shuka Metaverse",
      subtitle: "Immersive Web3 Game Interface",
      delay: 0
    },
    {
      icon: techHubIcon,
      title: "TechHub Solutions",
      subtitle: "E-commerce Engine for Print Services",
      delay: 0.1
    },
    {
      icon: sparkleLaundryIcon,
      title: "Sparkle Laundry Home",
      subtitle: "Automated Convenience Platform",
      delay: 0.2
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <DarkVeil />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="p-1">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold">
              <GradientText colors={["#38bdf8", "#ff79c6", "#a78bfa", "#38bdf8"]} animationSpeed={7}>
                Projects
              </GradientText>
            </h2>
          </motion.div>
          
          {/* Projects CardSwap - single row */}
          <div className="mb-12">
            <CardSwap width={420} height={280} cardDistance={90} verticalDistance={60} delay={4500}>
              {projects.map((project) => (
                <Card key={project.title} className="p-3">
                  <div className="block group">
                    <div className="relative rounded-xl overflow-hidden" style={{ height: 180 }}>
                      <img src={project.icon} alt={`${project.title} icon`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-foreground mt-3 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                  </div>
                </Card>
              ))}
            </CardSwap>
            <div className="mt-6 flex justify-center">
              <a href="https://github.com/Muri-tuu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 rounded-xl border border-white/30 bg-white/15 dark:bg-white/10 backdrop-blur-md text-foreground hover:opacity-90 transition">
                View My Work
              </a>
            </div>
          </div>
          
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-serif font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Where Strategy Meets Execution.
            </h3>
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center">
              <ClickSpark sparkColor="#22c55e" sparkRadius={16} sparkCount={10}>
                <motion.button
                  onClick={() => openWhatsAppPopup({ phoneNumber: "254115594826", message: "Hello Kennedy, I'm interested in discussing a potential project opportunity." })}
                  className="inline-flex items-center px-6 py-3 bg-transparent border border-green-500 text-green-400 font-medium rounded-full hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Me a Message
                </motion.button>
              </ClickSpark>
            </div>
          </motion.div>

          {/* Logo Loop: Featured projects */}
          <div className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h3 className="text-lg sm:text-xl font-medium text-muted-foreground">Featured work</h3>
              <p className="text-sm text-muted-foreground">A quick scroll through recent projects</p>
            </motion.div>
            <div className="relative overflow-hidden" style={{ height: "120px" }}>
              <LogoLoop
                logos={[
                  { src: shukaMetaverseIcon, alt: "Shuka Metaverse" },
                  { src: techHubIcon, alt: "TechHub Solutions" },
                  { src: sparkleLaundryIcon, alt: "Sparkle Laundry Home" },
                ]}
                speed={120}
                direction="left"
                logoHeight={64}
                gap={48}
                pauseOnHover
                scaleOnHover
                fadeOut
                ariaLabel="Project logos"
              />
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
