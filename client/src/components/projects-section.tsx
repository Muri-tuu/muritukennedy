import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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
      description: "Built an engaging metaverse gaming platform that bridges traditional gaming with blockchain technology, featuring immersive user experiences and seamless Web3 integration.",
      gradient: "from-cyan-400 to-blue-500",
      delay: 0
    },
    {
      icon: techHubIcon,
      title: "TechHub Solutions",
      subtitle: "E-commerce Engine for Print Services",
      description: "Developed a comprehensive e-commerce platform specifically tailored for print services, featuring inventory management, custom order processing, and integrated payment solutions.",
      gradient: "from-purple-400 to-pink-500",
      delay: 0.1
    },
    {
      icon: sparkleLaundryIcon,
      title: "Sparkle Laundry Home",
      subtitle: "Automated Convenience Platform",
      description: "Created an automated laundry service platform that streamlines the entire process from pickup scheduling to delivery tracking, enhancing customer convenience and operational efficiency.",
      gradient: "from-yellow-400 to-orange-500",
      delay: 0.2
    },
    {
      icon: royalPriesthoodIcon,
      title: "Royal Priesthood",
      subtitle: "Digital Ministry Platform",
      description: "Designed and developed a comprehensive digital platform for ministry operations, including sermon streaming, community engagement features, and donation management systems.",
      gradient: "from-yellow-400 to-amber-500",
      delay: 0.3
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-white">Projects</h2>
          <p className="text-xl text-gray-300 italic">Where Strategy Meets Execution.</p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: project.delay }}
              viewport={{ once: true }}
              className="project-card bg-gradient-to-br from-dark-800 to-dark-700 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center animate-float group-hover:animate-none`}>
                  <img
                    src={project.icon}
                    alt={`${project.title} icon`}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="text-blue-400 w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{project.subtitle}</p>
              <p className="text-gray-400 text-sm">{project.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://wa.me/254115594826?text=Hello%20Kennedy,%20I'm%20interested%20in%20discussing%20a%20potential%20project%20opportunity."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
          >
            <i className="fab fa-whatsapp mr-3 text-xl"></i>
            Send Me a Message
          </a>
        </motion.div>
      </div>
    </section>
  );
}
