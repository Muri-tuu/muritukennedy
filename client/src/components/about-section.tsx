import { motion } from "framer-motion";
import GradientText from "@/components/gradient-text";
import whoIsKennedyImage from "@assets/Who is Kennedy_1755692624117.jpg";
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
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
              <div className="flex items-start mb-8">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-lg text-white leading-relaxed">
                  I'm a Mechatronics Engineering student passionate about blending technology and creativity. I love solving digital challenges with smart, efficient solutions and continuously expanding my skill set.
                </p>
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
                  className="bg-dark-800/60 rounded-2xl p-4 sm:p-6 border border-blue-500/30"
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
              
              {/* Social Links */}
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a 
                  href="https://github.com/Muri-tuu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                  <i className="fab fa-github text-xl relative z-10"></i>
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/kennedy-muritu-a35649354/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                  <i className="fab fa-linkedin text-xl relative z-10"></i>
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/muri_tuu/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                  <i className="fab fa-instagram text-xl relative z-10"></i>
                </motion.a>
                <motion.a 
                  href="https://x.com/muri_tuu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                  <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href="https://www.tiktok.com/@muri_tuu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                  <i className="fab fa-tiktok text-xl relative z-10"></i>
                </motion.a>
              </div>
              
            </motion.div>
            
            {/* Image and CTA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:order-2 space-y-8"
            >
              <div className="relative">
                <motion.img
                  src={whoIsKennedyImage}
                  alt="Laptop and coffee cup on bedsheets representing work-life balance"
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-xl mx-auto lg:max-w-none rounded-2xl shadow-2xl border border-gray-600 hover:border-blue-500 transition-all duration-500 cursor-pointer object-cover"
                  style={{ maxHeight: '420px', aspectRatio: '16/10' }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
