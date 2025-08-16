import { useLocation, useNavigate } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
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

  const onProceed = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      listingId: listing.id,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guests: state.guests,
      name: fd.get('name'),
      phone: fd.get('phone'),
      email: fd.get('email'),
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
          <div>Dates: {format(checkIn,'dd MMM yyyy')} → {format(checkOut,'dd MMM yyyy')} ({nights} night{nights>1?'s':''})</div>
          <div>Guests: {state.guests}</div>
          <div>Price: ₹{listing.pricePerNight} × {nights} = <strong>₹{total}</strong></div>
        </div>
      </div>

      <form onSubmit={onProceed} className="guest-form">
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
      </form>
    </div>
  );
}
