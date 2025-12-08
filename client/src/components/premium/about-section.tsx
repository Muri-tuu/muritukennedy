import { motion } from "framer-motion";
import profilePicture from "@assets/Profile Picture_1755692636143.jpg";

const skills = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "Three.js",
  "PostgreSQL",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground whitespace-nowrap">
            <span className="text-primary font-mono text-xl mr-2">01.</span>
            About Me
          </h2>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-4 text-muted-foreground"
          >
            <p>
              Hello! My name is Kennedy and I enjoy creating things that live on the internet. 
              My interest in web development started back in 2022 when I decided to try building 
              custom websites — turns out hacking together solutions taught me a lot about HTML, CSS, and JavaScript!
            </p>
            
            <p>
              Fast-forward to today, and I've had the privilege of working on various projects 
              ranging from{" "}
              <span className="text-primary">immersive Web3 experiences</span> to{" "}
              <span className="text-primary">e-commerce platforms</span> and{" "}
              <span className="text-primary">automation solutions</span>. My main focus these days 
              is building accessible, inclusive products and digital experiences.
            </p>
            
            <p>
              I'm currently pursuing my degree in{" "}
              <span className="text-primary">Mechatronics Engineering</span> at Murang'a University 
              of Technology, where I combine my passion for software with hardware systems.
            </p>

            <p className="pt-2">Here are a few technologies I've been working with recently:</p>

            {/* Skills Grid */}
            <ul className="grid grid-cols-2 gap-2 pt-2">
              {skills.map((skill, index) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className="flex items-center gap-2 font-mono text-sm"
                >
                  <span className="text-primary">▹</span>
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative">
              {/* Image wrapper with border effect */}
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={profilePicture}
                  alt="Kennedy Muritu"
                  className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/20 hover:bg-transparent transition-colors duration-300" />
              </div>
              
              {/* Border decoration */}
              <div 
                className="absolute -inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
