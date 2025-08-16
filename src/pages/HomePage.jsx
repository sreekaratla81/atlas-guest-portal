import { useState } from 'react';
import StickyDateBar from '../components/search/StickyDateBar';
import ListingCard from '../components/listings/ListingCard';
import { listings } from '../data/listings';
import { FEATURED_LISTING_IDS } from '../config/featured';
import SafetyHighlights from '../components/safety/SafetyHighlights';

export default function HomePage() {
  const [filters, setFilters] = useState({ dates: { from: null, to: null }, guests: 1 });

  const handleSearch = ({ dates, guests }) => {
    setFilters({ dates, guests });
  };

  const handleInstantBook = () => {
    if (!filters.dates.from || !filters.dates.to) {
      alert('Please select your dates to confirm availability.');
      return;
    }
    alert('Starting instant reservation...');
  };

  const featured = listings.filter(l => FEATURED_LISTING_IDS.includes(Number(l.id)));
  const others = listings.filter(l => !FEATURED_LISTING_IDS.includes(Number(l.id)));

  return (
    <div className="container">
      <StickyDateBar onSearch={handleSearch} initialDates={filters.dates} initialGuests={filters.guests} />
      <button
        className="btn-dark instant-btn"
        onClick={handleInstantBook}
        disabled={!filters.dates.from || !filters.dates.to}
      >
        Book Instantly
      </button>
      <div className="hero-banner">
        <h1>Book Instantly</h1>
        <p>Enjoy 24/7 support—trusted by over 5,000 guests.</p>
      </div>
      <section className="grid">
        {featured.map(l => (
          <div key={`f-${l.id}`} className="card card--featured">
            <ListingCard listing={l} prefillDates={filters.dates} prefillGuests={filters.guests} />
          </div>
        ))}

        {others.map(l => (
          <div key={l.id} className="card card--half">
            <ListingCard listing={l} prefillDates={filters.dates} prefillGuests={filters.guests} />
          </div>
        ))}
      </section>
      <section className="reviews">
        <h2>Guest Reviews</h2>
        <p>Reviews coming soon.</p>
      </section>
      <SafetyHighlights />
    </div>
  );
}
