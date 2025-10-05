import { useEffect, useState } from 'react';

export default function WhatsAppModal() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ phoneNumber: string; message: string }>).detail;
      if (!detail) return;
      setPhone(detail.phoneNumber);
      setMessage(detail.message);
      setOpen(true);
    };
    window.addEventListener('open-whatsapp', handler as EventListener);
    return () => window.removeEventListener('open-whatsapp', handler as EventListener);
  }, []);

  if (!open) return null;

  const encodedMsg = encodeURIComponent(message);
  const webUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;
  const mobileUrl = `https://wa.me/${phone}?text=${encodedMsg}`;

  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const iframeSrc = isMobile ? mobileUrl : webUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative bg-dark-700 rounded-xl w-full max-w-3xl h-[70vh] shadow-2xl border border-gray-700 overflow-hidden">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Close
        </button>
        <iframe
          title="WhatsApp"
          src={iframeSrc}
          className="w-full h-full bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
