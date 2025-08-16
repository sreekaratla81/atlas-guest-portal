import { SOCIAL } from '../../config/social';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();

  return (
    <header className="hdr">
      <div className="hdr__wrap">
        <div className="brand">Atlas Homestays</div>
        <nav className="nav">
          <a href="/">{t('navigation.home')}</a>
          <a href="#about">{t('navigation.about')}</a>
          <a href="#contact">{t('navigation.contact')}</a>
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
          <select
            value={i18n.language}
            onChange={e => i18n.changeLanguage(e.target.value)}
            className="lang-select"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>
      </div>
    </header>
  );
}
