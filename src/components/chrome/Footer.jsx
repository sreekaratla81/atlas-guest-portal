import { SOCIAL } from '../../config/social';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr__wrap">
        <div>© {new Date().getFullYear()} Atlas Homestays • Hyderabad</div>
        <div className="ftr__social">
          <span className="ftr__follow">Follow us</span>
          <div className="ftr__links">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="icon-btn"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="icon-btn"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
