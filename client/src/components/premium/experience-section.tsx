import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Experience {
  company: string;
  title: string;
  period: string;
  url: string;
  points: string[];
}

const experiences: Experience[] = [
  {
    company: "Murang'a University",
    title: "Mechatronics Engineering Student",
    period: "2023 — Present",
    url: "https://www.mut.ac.ke",
    points: [
      "Pursuing a degree in Mechatronics Engineering, combining mechanical, electrical, and software systems",
      "Developing skills in embedded systems, automation, and control systems",
      "Working on projects that integrate hardware and software solutions",
      "Collaborating with peers on innovative engineering solutions",
    ],
  },
  {
    company: "DirectEd Development",
    title: "Scholar & Developer",
    period: "2022 — 2023",
    url: "https://directed.dev",
    points: [
      "Selected as a scholar in the DirectEd Development Foundation program",
      "Gained hands-on experience in web development and software engineering",
      "Built projects using modern web technologies including React and Node.js",
      "Participated in mentorship programs with industry professionals",
    ],
  },
  {
    company: "Freelance",
    title: "Web Developer",
    period: "2022 — Present",
    url: "#",
    points: [
      "Design and develop custom websites for clients across various industries",
      "Build responsive, accessible, and performant web applications",
      "Implement modern UI/UX practices to enhance user experience",
      "Collaborate with clients to translate their vision into digital products",
    ],
  },
];

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground whitespace-nowrap">
            <span className="text-primary font-mono text-xl mr-2">02.</span>
            Where I've Been
          </h2>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4"
        >
          {/* Tabs */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
            {experiences.map((exp, index) => (
              <button
                key={exp.company}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-3 font-mono text-sm whitespace-nowrap text-left transition-all duration-200 relative ${
                  activeTab === index
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {exp.company}
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-0.5 md:w-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 min-h-[300px] pl-0 md:pl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                  {experiences[activeTab].title}{" "}
                  <a
                    href={experiences[activeTab].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @ {experiences[activeTab].company}
                  </a>
                </h3>
                <p className="font-mono text-sm text-muted-foreground mb-6">
                  {experiences[activeTab].period}
                </p>
                <ul className="space-y-4">
                  {experiences[activeTab].points.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-3 text-muted-foreground"
                    >
                      <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
