import { Button } from '../../ui';
import React from 'react';
import { useCurrency } from '../../hooks/useCurrency';

export default function ContactStrip({ price, whatsappLink, onEnquire }) {
  const { formatCurrency } = useCurrency();
  return (
    <div className="contact-strip">
      <div className="price">{formatCurrency(price)} / night</div>
      <Button variant="dark" onClick={onEnquire}>Enquire Now</Button>
      <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="icon-btn whatsapp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
}
