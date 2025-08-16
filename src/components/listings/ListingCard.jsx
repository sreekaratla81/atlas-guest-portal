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

  return (
    <div className="lc-card">
      <div className="lc-media">
        <img src={listing.imageUrl} alt={listing.title} />
      </div>
      <div className="lc-body">
        <div className="lc-header">
          <h3 className="lc-title">{listing.title}</h3>
          <div className="lc-sub">{listing.location}</div>
          <div className="lc-price">₹{listing.pricePerNight} / night</div>
        </div>

        <div className="lc-controls">
          <button className="lc-chip" onClick={() => setOpenCal(v => !v)}>
            📅 {range.from && range.to ? `${format(range.from,'dd MMM')} → ${format(range.to,'dd MMM')}` : 'Dates'}
          </button>

          {openCal && (
            <div className="lc-popover">
              <DayPicker mode="range" selected={range} onSelect={setRange} />
            </div>
          )}

          <select className="lc-select" value={guests} onChange={e => setGuests(Number(e.target.value))}>
            {[...Array(6)].map((_,i) => <option key={i+1} value={i+1}>{i+1} Guest{i? 's':''}</option>)}
          </select>

          <div className={`lc-pill ${canBook ? 'ok' : 'muted'}`}>
            {canBook ? 'Available' : 'Select dates'}
          </div>

          <button
            className="btn-primary"
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
      </div>
    </div>
  );
}
