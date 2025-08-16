import { useState, useRef } from 'react';
import { SOCIAL } from '../../config/social';
import { NAV_ITEMS } from '../../config/navigation';
import { useOnClickOutside, useOnEsc } from '../../hooks/useOnClickOutside';

export default function Header() {
  const [open, setOpen] = useState(null);
  const navRef = useRef(null);
  useOnClickOutside(navRef, () => setOpen(null));
  useOnEsc(() => setOpen(null));

  return (
    <header className="hdr">
      <div className="hdr__wrap">
        <div className="brand">Atlas Homestays</div>
        <nav className="nav" role="navigation" aria-label="Main">
          <ul role="menubar">
            {NAV_ITEMS.map((item, idx) => (
              <li
                key={item.label}
                role="none"
                className="nav__item"
                ref={open === idx ? navRef : null}
                aria-expanded={open === idx}
              >
                {item.children ? (
                  <>
                    <button
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={open === idx}
                      onClick={() => setOpen(open === idx ? null : idx)}
                      onKeyDown={e => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setOpen(idx);
                          const first = e.currentTarget.nextSibling?.querySelector('a');
                          first?.focus();
                        }
                      }}
                    >
                      {item.label}
                    </button>
                    <ul
                      role="menu"
                      className="nav__submenu"
                      style={{ display: open === idx ? 'block' : 'none' }}
                    >
                      {item.children.map(sub => (
                        <li key={sub.path} role="none">
                          <a role="menuitem" href={sub.path}>{sub.label}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a role="menuitem" href={item.path}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
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
