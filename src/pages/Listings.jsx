import ListingCard from '../components/listings/ListingCard';
import { listings } from '../data/listings';
import { useState } from 'react';

export default function Listings() {
  const [filters] = useState({ dates: { from: null, to: null }, guests: 1 });

  return (
    <div className="container">
      <section className="grid">
        {listings.map(l => (
          <div key={l.id} className="card card--half">
            <ListingCard listing={l} prefillDates={filters.dates} prefillGuests={filters.guests} />
          </div>
        ))}
      </section>
    </div>
  );
}
