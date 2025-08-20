import { motion } from "framer-motion";
import profilePicture from "@assets/Profile Picture_1755692636143.jpg";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Welcome Card */}
            <div className="bg-dark-700/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-600">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white">
                Welcome to<br />
                My Portfolio
              </h1>
            </div>
            
            {/* Resume Button */}
            <div className="flex justify-start">
              <a
                href="https://drive.google.com/file/d/1xcfNH0HThexVpjk7nTFRyEHhSWH8ZsCn/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-transparent border border-blue-400 text-white font-medium rounded-full hover:bg-blue-400/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Resume/Developer
                <i className="fas fa-download ml-3 text-blue-400"></i>
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="https://github.com/Muri-tuu" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/kennedy-muritu-a35649354/" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="https://www.instagram.com/muri_tuu/" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://x.com/muri_tuu" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                <i className="fab fa-x-twitter text-xl"></i>
              </a>
              <a href="https://www.tiktok.com/@muri_tuu" target="_blank" rel="noopener noreferrer" className="social-icon w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
              <div className="flex items-center ml-4">
                <i className="fas fa-arrow-turn-down text-gray-400 mr-2"></i>
                <span className="text-gray-400 text-sm">@muri_tuu</span>
              </div>
            </div>
          </motion.div>
          
          {/* Right Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:order-2"
          >
            <div className="bg-dark-700/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 text-center">
              <div className="mb-6">
                <img
                  src={profilePicture}
                  alt="Kennedy Muritu - Professional Profile Picture"
                  className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-2xl border-2 border-gray-600 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
                />
              </div>
              
              <h2 className="text-2xl font-serif font-bold text-white mb-6">
                Kennedy<br />Muritu
              </h2>
              
              <a
                href="https://wa.me/254115594826?text=Hello%20Kennedy,%20I'm%20interested%20in%20discussing%20a%20potential%20project%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <i className="fab fa-whatsapp text-white"></i>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-arrow-turn-down text-white mr-2"></i>
                  <span className="text-green-300">Send Me a Message</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
