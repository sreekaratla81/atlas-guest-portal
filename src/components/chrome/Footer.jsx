import { SOCIAL } from '../../config/social';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr__wrap">
        <div>© {new Date().getFullYear()} Atlas Homestays • Hyderabad</div>
        <div className="ftr__links">
          <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="icon-btn">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href={SOCIAL.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="icon-btn">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href={SOCIAL.whatsapp} aria-label="WhatsApp" className="icon-btn whatsapp">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href={SOCIAL.phone} aria-label="Call" className="icon-btn">
            <i className="fa-solid fa-phone"></i>
          </a>
          <a href={SOCIAL.email} aria-label="Email" className="icon-btn">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
