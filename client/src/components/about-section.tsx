import { motion } from "framer-motion";
import whoIsKennedyImage from "@assets/Who is Kennedy_1755692624117.jpg";
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <div className="bg-dark-700/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-gray-600">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">
              Who is Kennedy?
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start mb-8">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-lg text-white leading-relaxed">
                  I'm a Mechatronics Engineering student passionate about blending technology and creativity. I love solving digital challenges with smart, efficient solutions and continuously expanding my skill set.
                </p>
              </div>
              
              {/* Educational Logos */}
              <div className="mb-8">
                <div className="bg-dark-800/60 rounded-2xl p-6 border border-blue-500/30">
                  <div className="flex items-center justify-center space-x-8">
                    <motion.img
                      src={khsLogo}
                      alt="Kagumo High School Logo"
                      className="h-12 w-auto object-contain"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    />
                    <motion.img
                      src={directedLogo}
                      alt="DirectEd Development Foundation Logo"
                      className="h-12 w-auto object-contain"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                    <motion.img
                      src={mutLogo}
                      alt="Murang'a University of Technology Logo"
                      className="h-12 w-auto object-contain"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="flex items-center space-x-4">
                <i className="fas fa-arrow-turn-down text-gray-400"></i>
                <motion.button
                  onClick={scrollToProjects}
                  className="inline-flex items-center px-6 py-3 bg-transparent border border-green-500 text-green-400 font-medium rounded-full hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  The Journey
                </motion.button>
              </div>
            </motion.div>
            
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <div className="relative">
                <motion.img
                  src={whoIsKennedyImage}
                  alt="Laptop and coffee cup on bedsheets representing work-life balance"
                  className="w-full h-auto rounded-2xl shadow-2xl border border-gray-600 hover:border-blue-500 transition-all duration-300 cursor-pointer"
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
