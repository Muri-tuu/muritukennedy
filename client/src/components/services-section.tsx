import { motion } from "framer-motion";
import strategicFoundationImage from "@assets/Strategic Foundation_1755694471347.jpg";
import servicesBg from "@assets/Services_1755696176183.jpg";
import uixImage from "@assets/UIX_1755692624115.jpg";
import webDevelopmentImage from "@assets/Web Development_1755692624116.jpg";

export default function ServicesSection() {
  const services = [
    {
      image: strategicFoundationImage,
      title: "Strategic Foundation",
      subtitle: "Digital Strategy & Architecture Audit",
      delay: 0
    },
    {
      image: uixImage,
      title: "Conversion-Focused Design",
      subtitle: "UI/UX That Drives Results",
      delay: 0.1
    },
    {
      image: webDevelopmentImage,
      title: "Engineered Execution",
      subtitle: "High-Performance Web Development",
      delay: 0.2
    }
  ];

  return (
    <section
      id="services"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(10,10,10,0.75), rgba(10,10,10,0.75)), url(${servicesBg})`,
      }}
    >
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
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">Services</h2>
          </motion.div>
          
          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: service.delay }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div 
                  className="mb-6 relative overflow-hidden rounded-xl cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[16/10] object-cover rounded-xl"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">{service.title}</h3>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-sm sm:text-base text-white/90 font-medium">{service.subtitle}</p>
                </div>
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
            <h3 className="text-2xl sm:text-3xl font-serif font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              We Plan, Design then Build
            </h3>
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center">
              <motion.a
                href="https://wa.me/254115594826?text=Hello%20Kennedy,%20I'm%20interested%20in%20discussing%20a%20potential%20project%20opportunity."
                className="inline-flex items-center px-6 py-3 bg-transparent border border-green-500 text-green-400 font-medium rounded-full hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Me a Message
              </motion.a>
            </div>
          </motion.div>
          
          {/* Social Links & Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-gray-600 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Social Links */}
              <div className="flex flex-wrap justify-center md:justify-start space-x-4 sm:space-x-6 mb-4 md:mb-0">
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
              
              {/* Footer Text */}
              <div className="text-center md:text-right">
                <p className="text-gray-400 mb-2">
                  © 2025 <a href="https://www.linkedin.com/in/kennedy-muritu-a35649354/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Kennedy Muritu</a>
                </p>
                <p className="text-gray-400">
                  Built with <span className="text-red-500">❤️</span> on Replit
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
