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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const firstInput = useRef(null);
  useEffect(() => {
    firstInput.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const prefDates = preferredFrom && preferredTo
    ? `${format(preferredFrom,'dd MMM yyyy')} → ${format(preferredTo,'dd MMM yyyy')}` : '';

  const validateField = (field, value) => {
    if (field === 'name') return value ? '' : 'Name is required';
    if (field === 'phone') return /^\d{10}$/.test(value) ? '' : 'Phone must be 10 digits';
    if (field === 'email') return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email';
    return '';
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm(f => ({ ...f, [field]: value }));
    if (touched[field]) {
      setErrors(err => ({ ...err, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field) => (e) => {
    const value = e.target.value;
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(err => ({ ...err, [field]: validateField(field, value) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {
      name: validateField('name', form.name),
      phone: validateField('phone', form.phone),
      email: validateField('email', form.email)
    };
    setErrors(errs);
    setTouched({ name: true, phone: true, email: true });
    if (Object.values(errs).some(Boolean)) return;

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
        const result = await res.json().catch(() => null);
        if (!res.ok) {
          if (result?.errors) setErrors(result.errors);
          else throw new Error('webhook failed');
        } else {
          setOk(true);
        }
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
          <label>Full name<input ref={firstInput} required value={form.name} onChange={handleChange('name')} onBlur={handleBlur('name')} className={errors.name ? 'error' : touched.name && !errors.name ? 'success' : ''} />{errors.name && <span className="field-error">{errors.name}</span>}{touched.name && !errors.name && <span className="field-success">✓</span>}</label>
          <label>Phone<input required value={form.phone} onChange={handleChange('phone')} onBlur={handleBlur('phone')} className={errors.phone ? 'error' : touched.phone && !errors.phone ? 'success' : ''} />{errors.phone && <span className="field-error">{errors.phone}</span>}{touched.phone && !errors.phone && <span className="field-success">✓</span>}</label>
          <label>Email<input type="email" required value={form.email} onChange={handleChange('email')} onBlur={handleBlur('email')} className={errors.email ? 'error' : touched.email && !errors.email ? 'success' : ''} />{errors.email && <span className="field-error">{errors.email}</span>}{touched.email && !errors.email && <span className="field-success">✓</span>}</label>
          <label>Message (optional)<textarea rows="3" value={form.message} onChange={e=>setForm(f=>({...f, message:e.target.value}))} /></label>

          <div className="notice-text">We’ll confirm availability and price over WhatsApp/phone. Online booking is coming soon.</div>

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
