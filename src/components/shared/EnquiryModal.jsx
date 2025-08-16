import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { CONTACT, ENQUIRY_WEBHOOK } from '../../config/siteConfig';

export default function EnquiryModal({ onClose, listing, guests, preferredFrom, preferredTo }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState(false);
  const firstInput = useRef(null);
  useEffect(() => {
    firstInput.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const prefDates = preferredFrom && preferredTo
    ? `${format(preferredFrom,'dd MMM yyyy')} → ${format(preferredTo,'dd MMM yyyy')}` : '';

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      listingId: listing.id,
      listingTitle: listing.title,
      guests,
      preferredDates: prefDates,
      ...form
    };

    try {
      if (ENQUIRY_WEBHOOK) {
        const res = await fetch(ENQUIRY_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('webhook failed');
        setOk(true);
      } else {
        const subject = encodeURIComponent(`Enquiry: ${listing.title}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n` +
          `Listing: ${listing.title}\nGuests: ${guests}\n` +
          (prefDates ? `Preferred dates: ${prefDates}\n` : '') +
          (form.message ? `Message: ${form.message}\n` : '')
        );
        window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
        setOk(true);
      }
      window.gtag?.('event','enquiry_submit',{listingId: listing.id});
    } catch {
      alert('Could not send enquiry. Please try WhatsApp/Call/Email buttons.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Enquire about {listing.title}</h3>
        {prefDates && <div className="muted">Preferred dates: {prefDates}</div>}
        <form onSubmit={submit} className="modal-form">
          <label>
            Full name
            <input
              ref={firstInput}
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </label>
          <label>
            Phone
            <input
              required
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </label>
          <label>
            Message (optional)
            <textarea
              rows="3"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            />
          </label>

          <div className="notice-text">
            We’ll confirm availability and price over WhatsApp/phone. Online booking is coming soon.
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn-primary" disabled={submitting}>{submitting ? 'Sending…' : 'Send Enquiry'}</button>
          </div>
          {ok && <div className="success">Thanks! We’ll contact you shortly.</div>}
        </form>
      </div>
    </div>
  );
}
