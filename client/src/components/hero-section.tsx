import { motion } from "framer-motion";
import profilePicture from "@assets/Profile Picture_1755692636143.jpg";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              <span className="block text-white">Welcome to</span>
              <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                My Portfolio
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Hi, I'm <span className="text-blue-400 font-semibold">Kennedy Muritu</span> - A passionate Mechatronics Engineering student crafting digital experiences that blend innovation with functionality.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="https://drive.google.com/file/d/1xcfNH0HThexVpjk7nTFRyEHhSWH8ZsCn/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <i className="fas fa-download mr-2"></i>
                Download Resume
              </a>
              <a
                href="https://wa.me/254115594826?text=Hello%20Kennedy,%20I'm%20interested%20in%20discussing%20a%20potential%20project%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                Send Me a Message
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-6">
              <a href="https://github.com/Muri-tuu" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-white transition-colors duration-300 text-xl">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/kennedy-muritu-a35649354/" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-blue-500 transition-colors duration-300 text-xl">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/muri_tuu/" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-pink-500 transition-colors duration-300 text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://x.com/muri_tuu" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-blue-400 transition-colors duration-300 text-xl">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://www.tiktok.com/@muri_tuu" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-red-500 transition-colors duration-300 text-xl">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </motion.div>
          
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:order-2"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur-3xl opacity-30 animate-glow"></div>
              <img
                src={profilePicture}
                alt="Kennedy Muritu - Professional Profile Picture"
                className="relative z-10 w-full h-auto rounded-full shadow-2xl border-4 border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
              />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-dark-800 px-4 py-2 rounded-full border border-gray-700">
                <p className="text-white font-medium text-center">Kennedy Muritu</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
