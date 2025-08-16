import { SOCIAL } from '../../config/social';
import { useCurrency } from '../../hooks/useCurrency';

export default function Header() {
  const { currency, setCurrency, supportedCurrencies } = useCurrency();
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
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="currency-select"
            aria-label="Select currency"
          >
            {supportedCurrencies.map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
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
