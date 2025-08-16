import { useState } from 'react';
import StickyDateBar from '../components/search/StickyDateBar';
import ListingCard from '../components/listings/ListingCard';
import { listings } from '../data/listings';

export default function HomePage() {
  const [filters, setFilters] = useState({ dates: { from: null, to: null }, guests: 1 });

  const handleSearch = ({ dates, guests }) => {
    setFilters({ dates, guests });
  };

  return (
    <div>
      <StickyDateBar onSearch={handleSearch} initialDates={filters.dates} initialGuests={filters.guests} />
      <div className="grid-wrap">
        {listings.map(l => (
          <ListingCard key={l.id} listing={l} prefillDates={filters.dates} prefillGuests={filters.guests} />
        ))}
      </div>
    </div>
  );
}
