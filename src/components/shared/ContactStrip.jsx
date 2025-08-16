import React from 'react';

export default function ContactStrip({ price, whatsappLink, onEnquire }) {
  return (
    <div className="contact-strip">
      <div className="price">₹{price} / night</div>
      <button className="btn-dark" onClick={onEnquire}>Enquire Now</button>
      <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="icon-btn whatsapp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
}
