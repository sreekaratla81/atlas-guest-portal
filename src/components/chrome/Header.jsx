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
          <a href={SOCIAL.whatsapp}>WhatsApp</a>
          <a href={SOCIAL.phone}>Call</a>
          <a href={SOCIAL.email}>Email</a>
        </div>
      </div>
    </header>
  );
}
