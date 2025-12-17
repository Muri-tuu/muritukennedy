import { motion } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import mSolutionsImage from "@assets/m-solutions-icon.svg";

interface FeaturedProject {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  github?: string;
  external?: string;
  align: "left" | "right";
}

const featuredProjects: FeaturedProject[] = [
  {
    title: "Campus Vote - Decentralized Student Elections",
    description:
      "A modern, secure, and transparent election platform for university students. Built to run on the Scroll blockchain, providing wallet-based authentication, one-vote-per-user enforcement, and real-time results.",
    tech: ["Next.js", "React", "Tailwind CSS", "Web3"],
    github: "https://github.com/Muri-tuu/v0-decentralized-student-elections",
    external: "https://v0-decentralized-student-elections.vercel.app/",
    align: "right",
  },
  {
    title: "M Solutions - Campus Essentials & Tech Services",
    description:
      "A modern e-commerce website for student supplies and professional tech services. Includes product filtering, cart functionality with localStorage persistence, and WhatsApp checkout.",
    image: mSolutionsImage,
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js"],
    github: "https://github.com/Muri-tuu/M-Solutions-Website",
    external: "https://m-solutions-website.vercel.app/",
    align: "left",
  },
  {
    title: "RP Website",
    description:
      "A sample church website built as a clean, modern web experience with responsive layouts and a polished UI.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Muri-tuu/rpwebsite",
    external: "https://rpwebsite.vercel.app/",
    align: "right",
  },
];

const otherProjects = [
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio showcasing my work and skills with smooth animations.",
    tech: ["React", "Framer Motion", "Tailwind"],
    github: "https://github.com/Muri-tuu",
  },
  {
    title: "Task Manager API",
    description: "RESTful API for task management with authentication and real-time updates.",
    tech: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/Muri-tuu",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application with location-based forecasts and interactive maps.",
    tech: ["React", "OpenWeather API", "Chart.js"],
    github: "https://github.com/Muri-tuu",
  },
];

export default function ProjectsSection() {
  return (
    <section id="work" className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground whitespace-nowrap">
            <span className="text-primary font-mono text-xl mr-2">03.</span>
            Some Things I've Built
          </h2>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative grid lg:grid-cols-12 gap-4 items-center ${
                project.align === "left" ? "" : "lg:text-right"
              }`}
            >
              {/* Project Image */}
              <div
                className={`lg:col-span-7 relative group ${
                  project.align === "left" ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <a
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full aspect-video transition-all duration-500 group-hover:grayscale-0 ${
                        project.image.endsWith(".svg")
                          ? "object-contain bg-card p-10"
                          : "object-cover grayscale"
                      }`}
                    />
                  ) : (
                    <div className="w-full aspect-video bg-card border border-border flex items-center justify-center px-8">
                      <span className="text-lg sm:text-xl font-display font-semibold text-foreground text-center">
                        {project.title}
                      </span>
                    </div>
                  )}
                </a>
              </div>

              {/* Project Content */}
              <div
                className={`lg:col-span-6 relative z-10 ${
                  project.align === "left"
                    ? "lg:order-1 lg:col-start-1"
                    : "lg:order-2 lg:col-start-6"
                }`}
              >
                <p className="font-mono text-sm text-primary mb-2">Featured Project</p>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>
                <div className="bg-card p-6 rounded-lg shadow-xl mb-4">
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <ul
                  className={`flex flex-wrap gap-3 font-mono text-sm text-muted-foreground mb-4 ${
                    project.align === "left" ? "" : "lg:justify-end"
                  }`}
                >
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <div
                  className={`flex gap-4 ${
                    project.align === "left" ? "" : "lg:justify-end"
                  }`}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="External Link"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-display font-bold text-foreground">
            Other Noteworthy Projects
          </h3>
          <a
            href="https://github.com/Muri-tuu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-primary hover:underline"
          >
            view the archive
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group bg-card p-6 rounded-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <Folder className="text-primary" size={40} />
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h4>
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
              <ul className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
