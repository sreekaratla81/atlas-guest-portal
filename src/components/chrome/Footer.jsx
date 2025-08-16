import { SOCIAL } from '../../config/social';

export default function Footer() {
  return (
    <footer className="ftr" id="contact">
      <div className="ftr__wrap">
        <div>© {new Date().getFullYear()} Atlas Homestays • Hyderabad</div>
        <div className="ftr__links">
          <a href="/policies">Policies</a>
          <a href={SOCIAL.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={SOCIAL.facebook} target="_blank" rel="noreferrer">Facebook</a>
          <a href={SOCIAL.whatsapp}>WhatsApp</a>
          <a href={SOCIAL.phone}>Call</a>
          <a href={SOCIAL.email}>Email</a>
        </div>
      </div>
    </footer>
  );
}
