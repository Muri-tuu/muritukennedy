import { motion } from "framer-motion";
import { GraduationCap, Award, School } from "lucide-react";
import whoIsKennedyImage from "@assets/Who is Kennedy_1755692624117.jpg";

export default function AboutSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Who is Kennedy?
          </h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              I'm a Mechatronics Engineering student passionate about blending technology and creativity. I love solving digital challenges with smart, efficient solutions and continuously expanding my skill set.
            </p>
            
            {/* Educational Background */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Educational Journey</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Murang'a University of Technology</p>
                    <p className="text-gray-400 text-sm">Mechatronics Engineering</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full flex items-center justify-center">
                    <Award className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-white">DirectEd Development Foundation</p>
                    <p className="text-gray-400 text-sm">Software Development Program</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                    <School className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Kagumo High School</p>
                    <p className="text-gray-400 text-sm">Secondary Education</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <span>The Journey</span>
              <i className="fas fa-arrow-down ml-2"></i>
            </button>
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
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl blur-2xl opacity-20"></div>
              <img
                src={whoIsKennedyImage}
                alt="Laptop and coffee cup on bedsheets representing work-life balance"
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
