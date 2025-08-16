import { useState } from 'react';
import { CONTACT } from '../../config/siteConfig';

export default function ContactStrip({ price, whatsappLink, onEnquire }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="contact-strip">
      <div className="price">₹{price} / night</div>
      {showOptions ? (
        <>
          <button
            className="btn-dark"
            onClick={() => {
              onEnquire();
              setShowOptions(false);
            }}
          >
            Enquire
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="icon-btn whatsapp"
            onClick={() => setShowOptions(false)}
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a
            href={`tel:${CONTACT.phoneE164}`}
            aria-label="Call"
            className="icon-btn"
            onClick={() => setShowOptions(false)}
          >
            <i className="fa-solid fa-phone"></i>
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            aria-label="Email"
            className="icon-btn"
            onClick={() => setShowOptions(false)}
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
        </>
      ) : (
        <button className="btn-dark" onClick={() => setShowOptions(true)}>
          Book Now
        </button>
      )}
    </div>
  );
}
