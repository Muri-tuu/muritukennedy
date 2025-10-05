import { motion } from "framer-motion";
import GradientText from "@/components/gradient-text";
import shukaMetaverseIcon from "@assets/Shuka Metaverse_1755692624114.jpg";
import projectsBg from "@assets/Projects_1755693402302.jpg";
import techHubIcon from "@assets/TechHub_1755692624115.png";
import sparkleLaundryIcon from "@assets/Sparkle Laundry Home_1755692624114.png";
import LogoLoop from "@/components/logo-loop";
import { openWhatsAppPopup } from "@/lib/whatsapp";
import ClickSpark from "@/components/click-spark";

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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.15)]">
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
          
          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: project.delay * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.a
                  href="https://github.com/Muri-tuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="mb-6">
                    <motion.div 
                      className="relative bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-gray-600 group-hover:border-blue-500/70 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-500 aspect-square overflow-hidden"
                      animate={{ 
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.img
                        src={project.icon}
                        alt={`${project.title} icon`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">{project.title}</h3>
                  
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <p className="text-sm sm:text-base text-white font-medium group-hover:text-gray-200 transition-colors duration-300">{project.subtitle}</p>
                  </div>
                </motion.a>
              </motion.div>
            ))}
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
              <h3 className="text-lg sm:text-xl font-medium text-gray-300">Featured work</h3>
              <p className="text-sm text-gray-400">A quick scroll through recent projects</p>
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
                fadeOutColor="#0b0b0b"
                ariaLabel="Project logos"
              />
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
