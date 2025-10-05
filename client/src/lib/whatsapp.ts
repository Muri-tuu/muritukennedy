export type WhatsAppPayload = {
  phoneNumber: string;
  message: string;
};

export const openWhatsAppModal = (payload: WhatsAppPayload) => {
  window.dispatchEvent(new CustomEvent<WhatsAppPayload>('open-whatsapp', { detail: payload }));
};
