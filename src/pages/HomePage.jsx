import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="container">
      <h1>Find your stay</h1>
      <section className="grid">
        {/* cards / hero / content */}
        <Link to="/listings" className="btn">Browse Listings</Link>
      </section>
    </main>
  );
}
