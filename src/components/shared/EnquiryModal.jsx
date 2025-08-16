import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { CONTACT, ENQUIRY_WEBHOOK } from '../../config/siteConfig';
import { Button } from '../../ui';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{9,14}$/;

export default function EnquiryModal({ onClose, listing, guests, preferredFrom, preferredTo }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', message: ''
  });
  const [errors, setErrors] = useState({});
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

  const validateField = (name, value) => {
    if (name === 'email' && !emailRegex.test(value)) return 'Enter a valid email address';
    if (name === 'phone' && !phoneRegex.test(value)) return 'Enter a valid phone number';
    return '';
  };

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: validateField(name, value) }));
  };

  const validate = () => {
    const errs = {};
    ['phone', 'email'].forEach(key => {
      const err = validateField(key, form[key]);
      if (err) errs[key] = err;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('webhook failed');
        const data = await res.json().catch(() => ({}));
        setOk(data.reference || true);
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
      window.gtag?.('event', 'enquiry_submit', { listingId: listing.id });
    } catch {
      alert('Could not send enquiry. Please try WhatsApp/Call/Email buttons.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {ok ? (
          <div className="success">
            <h3>Thanks! We’ll contact you shortly.</h3>
            {typeof ok === 'string' && <div>Reference: {ok}</div>}
          </div>
        ) : (
          <>
            <h3>Enquire about {listing.title}</h3>
            {prefDates && <div className="muted">Preferred dates: {prefDates}</div>}
            <form onSubmit={submit} className="modal-form" noValidate>
              <label>
                Full name
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  ref={firstInput}
                  required
                  value={form.name}
                  onChange={handleChange('name')}
                />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-describedby="enq-phone-hint"
                  required
                  value={form.phone}
                  onChange={handleChange('phone')}
                />
                <span id="enq-phone-hint" className="hint">
                  Include country code, e.g., +1 555-555-5555
                </span>
              </label>
              {errors.phone && <div className="error">{errors.phone}</div>}
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                />
              </label>
              {errors.email && <div className="error">{errors.email}</div>}
              <label>
                Message (optional)
                <textarea
                  name="message"
                  rows="3"
                  value={form.message}
                  onChange={handleChange('message')}
                />
              </label>
              <div className="notice-text">
                We’ll confirm availability and price over WhatsApp/phone. Online booking is coming soon.
              </div>
              <div className="modal-actions">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Enquiry'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

