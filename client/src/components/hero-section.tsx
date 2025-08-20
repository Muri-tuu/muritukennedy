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
              <motion.a
                href="https://drive.google.com/file/d/1xcfNH0HThexVpjk7nTFRyEHhSWH8ZsCn/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-transparent border border-blue-400 text-white font-medium rounded-full hover:bg-blue-400/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                Resume/Developer
                <i className="fas fa-download ml-3 text-blue-400"></i>
              </motion.a>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
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
                <motion.img
                  src={profilePicture}
                  alt="Kennedy Muritu - Professional Profile Picture"
                  className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-2xl border-2 border-gray-600 hover:border-blue-500 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <h2 className="text-2xl font-serif font-bold text-white mb-6">
                <a href="https://www.linkedin.com/in/kennedy-muritu-a35649354/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300 hover:underline">
                  Kennedy<br />Muritu
                </a>
              </h2>
              
              <motion.a
                href="https://wa.me/254115594826?text=Hello%20Kennedy,%20I'm%20interested%20in%20discussing%20a%20potential%20project%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-600/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <i className="fab fa-whatsapp text-white"></i>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-arrow-turn-down text-white mr-2"></i>
                  <span className="text-green-300">Send Me a Message</span>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
