export type WhatsAppPayload = {
  phoneNumber: string;
  message: string;
};

export const openWhatsAppModal = (payload: WhatsAppPayload) => {
  window.dispatchEvent(new CustomEvent<WhatsAppPayload>('open-whatsapp', { detail: payload }));
};

export const openWhatsAppPopup = ({ phoneNumber, message }: WhatsAppPayload) => {
  const encodedMsg = encodeURIComponent(message);
  // Open a themed bridge page within a small popup that then navigates to WhatsApp
  const url = `/whatsapp-bridge?phone=${encodeURIComponent(phoneNumber)}&text=${encodedMsg}`;

  const width = 520;
  const height = 720;
  const left = typeof window !== 'undefined' ? Math.max(0, Math.floor((window.screen.width - width) / 2)) : 100;
  const top = typeof window !== 'undefined' ? Math.max(0, Math.floor((window.screen.height - height) / 2)) : 100;

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
