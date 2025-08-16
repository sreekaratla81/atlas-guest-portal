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

  const onPay = () => {
    const payload = {
      listingId: listing.id,
      ...form,
      amount: total
    };
    console.log('Proceed to Pay (Razorpay in Phase 2)', payload);
  };

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
        </div>
      </div>

      <div className="progress-bar">
        <div className="bar" style={{ width: `${((step - 1) / 2) * 100}%` }} />
      </div>
      <div className="progress-steps">
        <span className={step === 1 ? 'active' : ''}>Select Dates</span>
        <span className={step === 2 ? 'active' : ''}>Details</span>
        <span className={step === 3 ? 'active' : ''}>Pay</span>
      </div>

      {step === 1 && (
        <form
          className="guest-form"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          <label>
            Check‑in
            <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} required />
          </label>
          <label>
            Check‑out
            <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange} required />
          </label>
          <div className="step-nav">
            <button className="primary" type="submit">
              Next
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          className="guest-form"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(3);
          }}
        >
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <div className="step-nav">
            <button type="button" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="primary" type="submit">
              Next
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div>
          <div className="cost-breakdown">
            <div>
              <span>₹{listing.pricePerNight} × {nights} nights</span>
              <span>₹{rate}</span>
            </div>
            <div>
              <span>Fees</span>
              <span>₹{fees}</span>
            </div>
            <div>
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <div className="badges">
            <span className="badge">Secure payment via Razorpay</span>
          </div>
          <div className="step-nav">
            <button type="button" onClick={() => setStep(2)}>
              Back
            </button>
            <button className="primary" type="button" onClick={onPay}>
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
