export type WhatsAppPayload = {
  phoneNumber: string;
  message: string;
};

export const openWhatsAppModal = (payload: WhatsAppPayload) => {
  window.dispatchEvent(new CustomEvent<WhatsAppPayload>('open-whatsapp', { detail: payload }));
};

export const openWhatsAppPopup = ({ phoneNumber, message }: WhatsAppPayload) => {
  const encodedMsg = encodeURIComponent(message);
  // Direct to WhatsApp web on desktop and wa.me on mobile in a centered popup
  const desktopUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMsg}`;
  const mobileUrl = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const url = isMobile ? mobileUrl : desktopUrl;

  const width = 520;
  const height = 720;
  // Dock popup to the right side of the current window
  const baseLeft = (typeof window !== 'undefined' ? (window.screenX || (window as any).screenLeft || 0) : 0);
  const baseTop = (typeof window !== 'undefined' ? (window.screenY || (window as any).screenTop || 0) : 0);
  const outerW = (typeof window !== 'undefined' ? (window.outerWidth || window.innerWidth) : width);
  const left = Math.max(0, Math.floor(baseLeft + outerW - width - 16));
  const top = Math.max(0, Math.floor(baseTop + 80));

  const features = [
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    'resizable=yes',
    'scrollbars=yes',
    'status=no',
    'toolbar=no',
    'menubar=no',
  ].join(',');

  const popup = window.open(url, 'whatsapp_popup', features);
  if (!popup) {
    // Popup blocked; fallback to same-window navigation to the bridge page
    window.location.href = url;
    return false;
  }
  popup.focus();
  return true;
};
