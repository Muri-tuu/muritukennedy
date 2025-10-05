import { motion } from "framer-motion";
import { openWhatsAppPopup } from "@/lib/whatsapp";
import contactBg from "@assets/Services_1755693410305.jpg";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6 text-white">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Ready to bring your vision to life? Let's discuss your project and explore how we can work together to achieve your goals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button
              onClick={() => openWhatsAppPopup({ phoneNumber: "254115594826", message: "Hello Kennedy, I'm interested in discussing a potential project opportunity." })}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
            >
              <i className="fab fa-whatsapp mr-3 text-xl"></i>
              Start a Conversation
            </button>
            
            <a
              href="https://drive.google.com/file/d/1xcfNH0HThexVpjk7nTFRyEHhSWH8ZsCn/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
            >
              <i className="fas fa-file-download mr-3"></i>
              View My Resume
            </a>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-8 mb-12">
            <a href="https://github.com/Muri-tuu" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-white transition-colors duration-300 text-2xl transform hover:scale-110">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/kennedy-muritu-a35649354/" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-blue-500 transition-colors duration-300 text-2xl transform hover:scale-110">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/muri_tuu/" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-pink-500 transition-colors duration-300 text-2xl transform hover:scale-110">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://x.com/muri_tuu" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-blue-400 transition-colors duration-300 text-2xl transform hover:scale-110">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.tiktok.com/@muri_tuu" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-red-500 transition-colors duration-300 text-2xl transform hover:scale-110">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
