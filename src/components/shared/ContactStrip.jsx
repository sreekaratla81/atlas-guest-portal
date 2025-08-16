import { CONTACT } from '../../config/siteConfig';

export default function ContactStrip() {
  return (
    <div className="contact-strip">
      <a href={`https://wa.me/${CONTACT.whatsappE164.replace('+','')}`} target="_blank" rel="noreferrer">WhatsApp</a>
      <a href={`tel:${CONTACT.phoneE164}`}>Call</a>
      <a href={`mailto:${CONTACT.email}`}>Email</a>
    </div>
  );
}
