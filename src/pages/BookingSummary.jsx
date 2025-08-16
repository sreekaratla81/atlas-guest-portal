import { useLocation, useNavigate } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
import { useState } from 'react';
import { getListingById } from '../data/listings';

export default function BookingSummary() {
  const { state } = useLocation();
  const nav = useNavigate();

  if (!state?.listingId || !state?.checkIn || !state?.checkOut) {
    nav('/');
    return null;
  }

  const listing = getListingById(state.listingId);
  const checkIn = new Date(state.checkIn);
  const checkOut = new Date(state.checkOut);
  const nights = Math.max(1, differenceInCalendarDays(checkOut, checkIn));
  const total = nights * listing.pricePerNight;

  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);

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
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json().catch(() => null);
      if (!res.ok) {
        if (result?.errors) setErrors(result.errors);
        else alert('Could not complete booking.');
      } else {
        setSuccess(true);
      }
    } catch {
      alert('Could not complete booking.');
    }
  };

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
          <div>Price: ₹{listing.pricePerNight} × {nights} = <strong>₹{total}</strong></div>
        </div>
      </div>

      <form onSubmit={onProceed} className="guest-form">
        <label>Name<input name="name" required value={form.name} onChange={handleChange('name')} onBlur={handleBlur('name')} className={errors.name ? 'error' : touched.name && !errors.name ? 'success' : ''} />{errors.name && <span className="field-error">{errors.name}</span>}{touched.name && !errors.name && <span className="field-success">✓</span>}</label>
        <label>Phone<input name="phone" required value={form.phone} onChange={handleChange('phone')} onBlur={handleBlur('phone')} className={errors.phone ? 'error' : touched.phone && !errors.phone ? 'success' : ''} />{errors.phone && <span className="field-error">{errors.phone}</span>}{touched.phone && !errors.phone && <span className="field-success">✓</span>}</label>
        <label>Email<input name="email" type="email" required value={form.email} onChange={handleChange('email')} onBlur={handleBlur('email')} className={errors.email ? 'error' : touched.email && !errors.email ? 'success' : ''} />{errors.email && <span className="field-error">{errors.email}</span>}{touched.email && !errors.email && <span className="field-success">✓</span>}</label>
        <button className="primary" type="submit">Proceed to Pay</button>
        {success && <div className="success">Booking details saved.</div>}
      </form>
    </div>
  );
}
