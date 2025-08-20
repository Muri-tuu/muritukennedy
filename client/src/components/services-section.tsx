import { motion } from "framer-motion";
import servicesImage from "@assets/Services_1755692624113.jpg";
import uixImage from "@assets/UIX_1755692624115.jpg";
import webDevelopmentImage from "@assets/Web Development_1755692624116.jpg";

export default function ServicesSection() {
  const services = [
    {
      image: servicesImage,
      title: "Strategic Foundation",
      subtitle: "Digital Strategy & Architecture Audit",
      description: "Comprehensive analysis of your digital ecosystem to identify opportunities, optimize performance, and create scalable architecture foundations that drive long-term success.",
      gradient: "from-blue-500 to-purple-600",
      delay: 0
    },
    {
      image: uixImage,
      title: "Conversion-Focused Design",
      subtitle: "UI/UX That Drives Results",
      description: "User-centered design solutions that not only look stunning but are strategically crafted to maximize conversions, enhance user engagement, and deliver measurable business outcomes.",
      gradient: "from-purple-500 to-pink-600",
      delay: 0.1
    },
    {
      image: webDevelopmentImage,
      title: "Engineered Execution",
      subtitle: "High-Performance Web Development",
      description: "Robust, scalable web solutions built with cutting-edge technologies. From responsive frontends to powerful backends, delivering exceptional performance and reliability.",
      gradient: "from-cyan-500 to-blue-600",
      delay: 0.2
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-white">Services</h2>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: service.delay }}
              viewport={{ once: true }}
              className="service-card bg-gradient-to-br from-dark-700 to-dark-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group"
            >
              <div className="mb-8 relative overflow-hidden rounded-xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90`}></div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="mb-6 flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-2xl font-bold text-blue-400">{service.title}</h3>
              </div>
              <p className="text-gray-300 mb-4 font-medium">{service.subtitle}</p>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Tagline & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-serif font-bold mb-8 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            We Plan, Desing then Build
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://wa.me/254115594826?text=Hello%20Kennedy,%20I'm%20interested%20in%20discussing%20a%20potential%20project%20opportunity."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
            >
              <i className="fab fa-whatsapp mr-3 text-xl"></i>
              Send Me a Message
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
