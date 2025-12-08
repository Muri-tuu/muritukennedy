import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Muri-tuu", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kennedy-muritu-a35649354/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/muri_tuu/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/muri_tuu", label: "X (Twitter)" },
];

export default function SideElements() {
  return (
    <>
      {/* Left Side - Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed left-6 lg:left-10 bottom-0 hidden lg:flex flex-col items-center gap-6 z-40"
      >
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label={label}
            whileHover={{ y: -3 }}
          >
            <Icon size={20} />
          </motion.a>
        ))}
        <div className="w-px h-24 bg-muted-foreground" />
      </motion.div>

      {/* Right Side - Email */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed right-6 lg:right-10 bottom-0 hidden lg:flex flex-col items-center gap-6 z-40"
      >
        <motion.a
          href="mailto:kennedymuritu@gmail.com"
          className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest"
          style={{ writingMode: "vertical-rl" }}
          whileHover={{ y: -3 }}
        >
          kennedymuritu@gmail.com
        </motion.a>
        <div className="w-px h-24 bg-muted-foreground" />
      </motion.div>
    </>
  );
}
