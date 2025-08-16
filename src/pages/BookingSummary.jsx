import { useLocation, useNavigate } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
import { useState } from 'react';
import { getListingById } from '../data/listings';
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
  const [step, setStep] = useState(1);

  const checkIn = new Date(form.checkIn);
  const checkOut = new Date(form.checkOut);
  const nights = Math.max(1, differenceInCalendarDays(checkOut, checkIn));
  const rate = listing.pricePerNight * nights;
  const fees = Math.round(rate * 0.1);
  const taxes = Math.round(rate * 0.12);
  const total = rate + fees + taxes;

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
          <div>Dates: {format(checkIn,'dd MMM yyyy')} → {format(checkOut,'dd MMM yyyy')} ({nights} night{nights>1?'s':''})</div>
          <div>Guests: {state.guests}</div>
          <div>Price: {formatCurrency(listing.pricePerNight)} × {nights} = <strong>{formatCurrency(total)}</strong></div>
        </div>
      </div>

      <form onSubmit={onProceed} className="guest-form">
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
