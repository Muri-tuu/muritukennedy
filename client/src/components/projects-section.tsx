import { motion } from "framer-motion";
import shukaMetaverseIcon from "@assets/Shuka Metaverse_1755692624114.jpg";
import techHubIcon from "@assets/TechHub_1755692624115.png";
import sparkleLaundryIcon from "@assets/Sparkle Laundry Home_1755692624114.png";
import royalPriesthoodIcon from "@assets/Royal Priesthood_1755692624113.png";

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
    },
    {
      icon: royalPriesthoodIcon,
      title: "Royal Priesthood",
      subtitle: "Digital Ministry Platform",
      delay: 0.3
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <div className="bg-dark-700/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-600">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">Projects</h2>
          </motion.div>
          
          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: project.delay }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.a
                  href="https://github.com/Muri-tuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <motion.div 
                      className="relative bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-gray-600 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 aspect-square overflow-hidden"
                      animate={{ 
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.img
                        src={project.icon}
                        alt={`${project.title} icon`}
                        className="w-full h-full object-cover transition-transform duration-300"
                        whileHover={{ scale: 1.1 }}
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
              <motion.a
                href="https://wa.me/254115594826?text=Hello%20Kennedy,%20I'm%20interested%20in%20discussing%20a%20potential%20project%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-transparent border border-green-500 text-green-400 font-medium rounded-full hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Me a Message
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
