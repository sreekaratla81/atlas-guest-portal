import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      const res = await fetch(`/api/listings/${id}`);
      const data = await res.json();
      if (!ignore) setListing(data);
    })();
    return () => { ignore = true; };
  }, [id]);

  if (!listing) return <main className="container">Loading...</main>;

  return (
    <main className="container">
      <div className="card">
        <h1>{listing.title}</h1>
        <p>{listing.description}</p>
        {/* more fields */}
      </div>
    </main>
  );
}
