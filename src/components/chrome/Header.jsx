import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../../hooks/useCurrency';

export default function Header() {
  const { currency } = useCurrency?.() ?? { currency: 'INR' };

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="brand">Atlas Homestays</Link>
        <nav className="nav">
          <Link to="/listings">Listings</Link>
          <Link to="/bookings">Bookings</Link>
        </nav>
        <div className="currency">{currency}</div>
      </div>
    </header>
  );
}
