import React, { useEffect, useState } from 'react';
import ListingCard from '../components/listings/ListingCard';

export default function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      const res = await fetch('/api/listings');
      const data = await res.json();
      if (!ignore) setListings(data ?? []);
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <main className="container">
      <h1>Listings</h1>
      <section className="row">
        {listings.map((listing) => (
          <div className="col-md-4 mb-4" key={listing.id}>
            <ListingCard listing={listing} />
          </div>
        ))}
      </section>
    </main>
  );
}
