import { motion } from "framer-motion";
import { openWhatsAppPopup } from "@/lib/whatsapp";
import { useState } from "react";
import ClickSpark from "@/components/click-spark";
import contactBg from "@assets/Services_1755693410305.jpg";

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSent(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      let data: any = null;
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try { data = await res.json(); } catch { data = null; }
      } else {
        try { const text = await res.text(); data = text ? { message: text } : null; } catch { data = null; }
      }
      if (!res.ok) throw new Error(data?.message || 'Failed to send');
      setSent('Thanks! Your message has been sent.');
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message || 'Failed to send');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 inline-block">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-2">
              Let's Create Something Amazing
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Ready to bring your vision to life? Let's discuss your project and explore how we can work together to achieve your goals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <ClickSpark sparkColor="#22c55e" sparkRadius={18} sparkCount={10}>
              <button
                onClick={() => openWhatsAppPopup({ phoneNumber: "254115594826", message: "Hello Kennedy, I'm interested in discussing a potential project opportunity." })}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
              >
                <i className="fab fa-whatsapp mr-3 text-xl"></i>
                Start a Conversation
              </button>
            </ClickSpark>
            
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

          <form onSubmit={submit} className="max-w-2xl mx-auto text-left rounded-2xl p-6" data-no-splash>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-foreground">Name</label>
                <input
                  className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-foreground">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder={(typeof navigator !== 'undefined' && (navigator as any).credentials) ? 'Using browser email if available' : ''}
                  required={!(typeof navigator !== 'undefined' && (navigator as any).credentials)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-1 text-foreground">Message</label>
              <textarea
                className="w-full px-3 py-2 h-32 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? 'Sending…' : 'Send Email'}
              </button>
              {sent && <span className="text-green-600 dark:text-green-400 text-sm">{sent}</span>}
              {error && <span className="text-red-600 dark:text-red-400 text-sm">{error}</span>}
            </div>
          </form>
          
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
