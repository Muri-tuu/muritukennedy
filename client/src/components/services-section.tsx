import { motion } from "framer-motion";
import GradientText from "@/components/gradient-text";
import strategicFoundationImage from "@assets/Strategic Foundation_1755694471347.jpg";
import servicesBg from "@assets/Services_1755696176183.jpg";
import uixImage from "@assets/UIX_1755692624115.jpg";
import webDevelopmentImage from "@assets/Web Development_1755692624116.jpg";
import { openWhatsAppPopup } from "@/lib/whatsapp";
import ClickSpark from "@/components/click-spark";

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
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="p-1">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold">
              <GradientText colors={["#38bdf8", "#22c55e", "#a78bfa", "#38bdf8"]} animationSpeed={7}>
                Services
              </GradientText>
            </h2>
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
                className="text-center p-4 rounded-2xl border border-border bg-transparent"
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
                  className="w-full aspect-[16/10] object-cover rounded-xl border border-border"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.3 }}
                  />
                <div className="absolute inset-0 pointer-events-none"></div>
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-2 transition-colors">{service.title}</h3>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-sm sm:text-base text-muted-foreground font-medium">{service.subtitle}</p>
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
              <ClickSpark sparkColor="#22c55e" sparkRadius={16} sparkCount={10}>
                <motion.button
                  onClick={() => openWhatsAppPopup({ phoneNumber: "254115594826", message: "Hello Kennedy, I'm interested in discussing a potential project opportunity." })}
                  className="inline-flex items-center px-6 py-3 bg-transparent border border-green-500 text-green-400 font-medium rounded-full hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Me a Message
                </motion.button>
              </ClickSpark>
            </div>
          </motion.div>
          
          {/* Removed internal footer to avoid duplication */}
        </div>
      </div>
    </section>
  );
}
