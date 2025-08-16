import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

export default function ListingCard({ listing, prefillDates, prefillGuests }) {
  const nav = useNavigate();
  const [openCal, setOpenCal] = useState(false);
  const [range, setRange] = useState(prefillDates || { from: null, to: null });
  const [guests, setGuests] = useState(prefillGuests || 1);

  const canBook = range.from && range.to && guests > 0;
  const label = range.from && range.to
    ? `${format(range.from,'dd MMM')} → ${format(range.to,'dd MMM')}`
    : 'Select dates';

  return (
    <div className="card">
      <img src={listing.imageUrl} alt={listing.title} className="hero" />
      <h3>{listing.title}</h3>
      <div className="muted">{listing.location}</div>
      <div className="price">₹{listing.pricePerNight} / night</div>

      <div className="controls">
        <select value={guests} onChange={e => setGuests(Number(e.target.value))}>
          {[...Array(6)].map((_,i) => <option key={i+1} value={i+1}>{i+1}</option>)}
        </select>
        <button className="date-btn" onClick={() => setOpenCal(v => !v)}>{label}</button>
      </div>

      {openCal && (
        <div className="popover">
          <DayPicker mode="range" selected={range} onSelect={setRange} />
        </div>
      )}

      <div className="availability">
        {range.from && range.to ? <span>✅ Available</span> : <span>📅 Select dates</span>}
      </div>

      <button
        className="primary"
        disabled={!canBook}
        onClick={() => nav('/booking/summary', {
          state: {
            listingId: listing.id,
            checkIn: range.from?.toISOString(),
            checkOut: range.to?.toISOString(),
            guests
          }
        })}
      >
        Book Now
      </button>
    </div>
  );
}
