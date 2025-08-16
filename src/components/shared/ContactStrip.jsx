import React from 'react';
import { Button } from '../../ui';

export default function ContactStrip({ price, whatsappLink, onEnquire }) {
  return (
    <div className="contact-strip">
      <div className="price">₹{price} / night</div>
      <Button variant="dark" onClick={onEnquire}>Enquire Now</Button>
      <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="icon-btn whatsapp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
}
