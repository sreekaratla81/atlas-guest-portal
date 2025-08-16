import React, { useState } from 'react';
import { BOOKING_WEBHOOK } from '../config/siteConfig';
import { useNavigate } from 'react-router-dom';

export default function BookingSummary() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', checkIn: '', checkOut: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(BOOKING_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      navigate('/thank-you');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Booking Summary</h1>
      <form onSubmit={handleSubmit}>
        {/* your fields using name= and value= with onChange={handleChange} */}
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Confirm Booking'}</button>
      </form>
    </main>
  );
}
