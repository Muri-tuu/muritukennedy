export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              © 2025 Kennedy Muritu | Built with <span className="text-red-500">❤️</span> on Replit
            </p>
          </div>
          
          {/* Footer Social Links */}
          <div className="flex space-x-6">
            <a href="https://github.com/Muri-tuu" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/kennedy-muritu-a35649354/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-500 transition-colors duration-300">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="https://www.instagram.com/muri_tuu/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-pink-500 transition-colors duration-300">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="https://x.com/muri_tuu" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-400 transition-colors duration-300">
              <i className="fab fa-x-twitter text-xl"></i>
            </a>
            <a href="https://www.tiktok.com/@muri_tuu" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-500 transition-colors duration-300">
              <i className="fab fa-tiktok text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
