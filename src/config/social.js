import { CONTACT } from './siteConfig';

export const SOCIAL = {
  instagram: 'https://instagram.com/atlashomestays',
  facebook: 'https://facebook.com/atlashomestays',
  whatsapp: `https://wa.me/${CONTACT.whatsappE164.replace('+','')}`,
  email: `mailto:${CONTACT.email}`,
  phone: `tel:${CONTACT.phoneE164}`
};
