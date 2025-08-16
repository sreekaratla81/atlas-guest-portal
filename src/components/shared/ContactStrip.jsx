import React from 'react';
import { useCurrency } from '../../hooks/useCurrency';

export default function ContactStrip({ price, whatsappLink, onEnquire }) {
  const { formatCurrency } = useCurrency();
  return (
    <div className="contact-strip">
      <div className="price">{formatCurrency(price)} / night</div>
      <button className="btn-dark" onClick={onEnquire}>Enquire Now</button>
      <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="icon-btn whatsapp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
}
