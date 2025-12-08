import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Muri-tuu", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kennedy-muritu-a35649354/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/muri_tuu/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/muri_tuu", label: "X (Twitter)" },
];

export default function Footer() {
  return (
    <footer className="py-6 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Social Links - Mobile Only */}
        <div className="flex justify-center gap-6 mb-6 lg:hidden">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Credit */}
        <div className="text-center">
          <a
            href="https://github.com/Muri-tuu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <p>Designed & Built by Kennedy Muritu</p>
          </a>
        </div>
      </div>
    </footer>
  );
}
