import { motion } from "framer-motion";
import GradientText from "@/components/gradient-text";
import PrismaticBurst from "@/components/prismatic-burst";
import GlassIcons from "@/components/glass-icons";
import aboutBg from "@assets/About_1755693396253.jpg";
import khsLogo from "@assets/KHS_Logo-removebg-preview_1755692624111.png";
import directedLogo from "@assets/DirectED_Logo-removebg-preview_1755692624110.png";
import mutLogo from "@assets/MUT_logo-removebg-preview_1755692624112.png";

export default function AboutSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <PrismaticBurst animationType="rotate3d" intensity={1.6} speed={0.4} distort={0.8} rayCount={24} mixBlendMode="lighten" colors={["#ff007a", "#4d3dff", "#ffffff"]} />
      <div className="max-w-7xl mx-auto">
        <div className="p-0">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold">
              <GradientText colors={["#38bdf8", "#a78bfa", "#22c55e", "#38bdf8"]} animationSpeed={6}>
                Who is Kennedy?
              </GradientText>
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-8">
                <div className="rounded-2xl border border-white/30 bg-white/20 dark:bg-white/10 backdrop-blur-xl px-6 py-6 max-w-2xl text-center">
                  <p className="text-lg text-foreground leading-relaxed">
                    I'm a Mechatronics Engineering student passionate about blending technology and creativity. I love solving digital challenges with smart, efficient solutions and continuously expanding my skill set.
                  </p>
                </div>
              </div>
              
              {/* Educational Logos */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="rounded-2xl p-4 sm:p-6 border border-border bg-secondary/50"
                  whileHover={{ scale: 1.02, borderColor: "rgb(59 130 246)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-center space-x-4 sm:space-x-6 lg:space-x-8">
                    <motion.img
                      src={khsLogo}
                      alt="Kagumo High School Logo"
                      loading="lazy"
                      decoding="async"
                      className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
                      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <motion.img
                      src={directedLogo}
                      alt="DirectEd Development Foundation Logo"
                      loading="lazy"
                      decoding="async"
                      className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
                      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <motion.img
                      src={mutLogo}
                      alt="Murang'a University of Technology Logo"
                      loading="lazy"
                      decoding="async"
                      className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
                      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
              
              {/* CTA Button */}
              <div className="flex items-center justify-center mb-8">
                <motion.button
                  onClick={scrollToProjects}
                  className="inline-flex items-center px-6 py-3 bg-transparent border border-green-500 text-green-400 font-medium rounded-full hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  The Journey
                </motion.button>
              </div>
              
              {/* Social Links - GlassIcons */}
              <div className="flex justify-center">
                <GlassIcons
                  items={[
                    { href: 'https://github.com/Muri-tuu', color: 'indigo', label: 'GitHub' },
                    { href: 'https://www.linkedin.com/in/kennedy-muritu-a35649354/', color: 'blue', label: 'LinkedIn' },
                    { href: 'https://www.instagram.com/muri_tuu/', color: 'purple', label: 'Instagram' },
                    { href: 'https://x.com/muri_tuu', color: 'indigo', label: 'X' },
                    { href: 'https://drive.google.com/file/d/1xcfNH0HThexVpjk7nTFRyEHhSWH8ZsCn/view?usp=drive_link', color: 'green', label: 'Resume' },
                  ]}
                />
              </div>
              
            </motion.div>
            
            {/* Image and CTA */}
            <div className="lg:order-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
