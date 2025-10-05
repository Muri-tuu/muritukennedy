import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { openWhatsAppPopup } from "@/lib/whatsapp";
import ClickSpark from "@/components/click-spark";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "services", "contact"];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;
          
          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/70 to-transparent backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Kennedy
            </span>
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 text-white"
              data-no-splash
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8" data-no-splash>
              {["home", "about", "projects", "services", "contact"].map((section) => (
                <ClickSpark key={`cs-${section}`} sparkColor="#38bdf8" sparkRadius={12} sparkCount={8}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                      activeSection === section 
                        ? "text-blue-400" 
                        : "text-white hover:text-blue-400"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </ClickSpark>
              ))}
              <ClickSpark sparkColor="#38bdf8" sparkRadius={16} sparkCount={10}>
                <motion.button
                  onClick={() => openWhatsAppPopup({ phoneNumber: "254115594826", message: "Hello Kennedy, I'm interested in discussing a potential project opportunity." })}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hire Me <i className="fas fa-handshake ml-1"></i>
                </motion.button>
              </ClickSpark>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-dark-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-700 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="text-lg" /> : <Menu className="text-lg" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-800/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["home", "about", "projects", "services", "contact"].map((section) => (
              <ClickSpark key={`mcs-${section}`} sparkColor="#38bdf8" sparkRadius={12} sparkCount={8}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`nav-link block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 w-full text-left ${
                    activeSection === section 
                      ? "text-blue-400" 
                      : "text-white hover:text-blue-400"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </ClickSpark>
            ))}
            <ClickSpark sparkColor="#38bdf8" sparkRadius={16} sparkCount={10}>
              <motion.button
                onClick={() => openWhatsAppPopup({ phoneNumber: "254115594826", message: "Hello Kennedy, I'm interested in discussing a potential project opportunity." })}
                className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Hire Me <i className="fas fa-handshake ml-1"></i>
              </motion.button>
            </ClickSpark>
          </div>
        </div>
      )}
    </nav>
  );
}
