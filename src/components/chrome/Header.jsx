import { SOCIAL } from '../../config/social';

export default function Header() {
  return (
    <header className="hdr">
      <div className="hdr__wrap">
        <div className="brand">Atlas Homestays</div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="hdr__actions">
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
    </header>
  );
}
