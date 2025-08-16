import { useLocation, useNavigate } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
import { useState } from 'react';
import { getListingById } from '../data/listings';
import { BOOKING_WEBHOOK } from '../config/siteConfig';

// Displays a summary of the booking and confirms via webhook

import { formatAddress } from '../utils/address';
import { useCurrency } from '../hooks/useCurrency';
import { BOOKING_WEBHOOK } from '../config/siteConfig';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{9,14}$/;

export default function BookingSummary() {
  const { state } = useLocation();
  const nav = useNavigate();
  const { formatCurrency } = useCurrency();

  if (!state?.listingId || !state?.checkIn || !state?.checkOut) {
    nav('/');
    return null;
  }

  const listing = getListingById(state.listingId);
  const [form, setForm] = useState({
    checkIn: state.checkIn,
    checkOut: state.checkOut,
    guests: state.guests,
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState('');
  const [step, setStep] = useState(1);

  const checkIn = new Date(form.checkIn);
  const checkOut = new Date(form.checkOut);
  const nights = Math.max(1, differenceInCalendarDays(checkOut, checkIn));
  const rate = listing.pricePerNight * nights;
  const fees = Math.round(rate * 0.1);
  const taxes = Math.round(rate * 0.12);
  const total = rate + fees + taxes;

  const validateField = (name, value) => {
    if (name === 'name' && !value.trim()) return 'Name is required';
    if (name === 'email' && !emailRegex.test(value)) return 'Enter a valid email address';
    if (name === 'phone' && !phoneRegex.test(value)) return 'Enter a valid phone number';
    return '';
  };

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors(err => ({ ...err, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name) => (e) => {
    const value = e.target.value;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(err => ({ ...err, [name]: validateField(name, value) }));
  };

  const onProceed = async (e) => {
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
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests,
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState('');

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!phoneRegex.test(form.phone)) errs.phone = 'Enter a valid phone number';
    if (!emailRegex.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.name) errs.name = 'Name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onProceed = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload = {
      listingId: listing.id,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guests: state.guests,
      name: form.name,
      phone: form.phone,
      email: form.email,
      amount: total
    };
    try {
      if (BOOKING_WEBHOOK) {
        const res = await fetch(BOOKING_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (data.errors) setErrors(data.errors);
          else throw new Error('webhook failed');
        } else {
          setReference(data.reference || data.bookingRef || '');
        }
        if (!res.ok) throw new Error('webhook failed');
        const data = await res.json().catch(() => ({}));
        setReference(data.reference || data.bookingRef || '');
      } else {
        alert('Booking submitted. Configure BOOKING_WEBHOOK to enable confirmations.');
        setReference('TEMP');
      }
    } catch {
      alert('Could not complete booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (reference) {
    return (
      <div className="summary">
        <h2>Booking Confirmed</h2>
        <p>Your booking reference is <strong>{reference}</strong>.</p>
        <p>We have sent a confirmation message. Our team will reach out with next steps.</p>
        <button className="primary" onClick={() => nav('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="summary">
      <h2>Booking Summary</h2>
      <div className="row">
        <img src={listing.imageUrl} alt={listing.title} />
        <div>
          <h3>{listing.title}</h3>
          <div>{listing.location}</div>
          <div>
            Dates: {format(checkIn, 'dd MMM yyyy')} → {format(checkOut, 'dd MMM yyyy')} ({nights} night{nights > 1 ? 's' : ''})
          </div>
          <div>Guests: {form.guests}</div>
          <div>Price: ₹{listing.pricePerNight} × {nights} = <strong>₹{rate}</strong></div>
          <div className="cost-breakdown">
            <div>Fees<span>₹{fees}</span></div>
            <div>Taxes<span>₹{taxes}</span></div>
            <div className="total">Total<span>₹{total}</span></div>
          </div>
          <div>{formatAddress(listing.address)}</div>
          <div>Dates: {format(checkIn,'dd MMM yyyy')} → {format(checkOut,'dd MMM yyyy')} ({nights} night{nights>1?'s':''})</div>
          <div>Guests: {state.guests}</div>
          <div>Price: {formatCurrency(listing.pricePerNight)} × {nights} = <strong>{formatCurrency(total)}</strong></div>
        </div>
      </div>

      <form onSubmit={onProceed} className="guest-form">
        <label>Name<input name="name" required /></label>
        <label>Phone<input name="phone" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <button className="btn btn-primary" type="submit">Proceed to Pay</button>
        <label>Name<input name="name" required value={form.name} onChange={handleChange('name')} onBlur={handleBlur('name')} className={errors.name ? 'error' : touched.name && !errors.name ? 'success' : ''} />{errors.name && <span className="field-error">{errors.name}</span>}{touched.name && !errors.name && <span className="field-success">✓</span>}</label>
        <label>Phone<input name="phone" type="tel" required value={form.phone} onChange={handleChange('phone')} onBlur={handleBlur('phone')} className={errors.phone ? 'error' : touched.phone && !errors.phone ? 'success' : ''} />{errors.phone && <span className="field-error">{errors.phone}</span>}{touched.phone && !errors.phone && <span className="field-success">✓</span>}</label>
        <label>Email<input name="email" type="email" required value={form.email} onChange={handleChange('email')} onBlur={handleBlur('email')} className={errors.email ? 'error' : touched.email && !errors.email ? 'success' : ''} />{errors.email && <span className="field-error">{errors.email}</span>}{touched.email && !errors.email && <span className="field-success">✓</span>}</label>
        <label>
          Name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-describedby="bs-phone-hint"
            required
          />
          <span id="bs-phone-hint" className="hint">Include country code, e.g., +1 555-555-5555</span>
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <button className="primary" type="submit">Proceed to Pay</button>
        <label>Name<input name="name" value={form.name} onChange={handleChange('name')} required /></label>
        {errors.name && <div className="error">{errors.name}</div>}
        <label>Phone<input name="phone" type="tel" value={form.phone} onChange={handleChange('phone')} required /></label>
        {errors.phone && <div className="error">{errors.phone}</div>}
        <label>Email<input name="email" type="email" value={form.email} onChange={handleChange('email')} required /></label>
        {errors.email && <div className="error">{errors.email}</div>}
        <button className="primary" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Proceed to Pay'}</button>
      </form>
    </div>
  );
}
