export const SITE_NAME = 'Gifter Breadfruit Bars';
export const WHATSAPP_NUMBER = '2348035422843';

export const buildWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
