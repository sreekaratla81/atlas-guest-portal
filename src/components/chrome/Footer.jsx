import { SOCIAL } from '../../config/social';

export default function Footer() {
  const socialLinks = [
    { href: SOCIAL.instagram, icon: 'fa-instagram', label: 'Instagram' },
    { href: SOCIAL.facebook, icon: 'fa-facebook', label: 'Facebook' },
  ].filter(({ href }) => href);

  return (
    <footer className="ftr">
      <div className="ftr__wrap">
        <div>© {new Date().getFullYear()} Atlas Homestays • Hyderabad</div>
        {socialLinks.length > 0 && (
          <div className="ftr__social">
            <span className="ftr__follow">Follow us</span>
            <div className="ftr__links">
              {socialLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="icon-btn"
                >
                  <i className={`fa-brands ${icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
