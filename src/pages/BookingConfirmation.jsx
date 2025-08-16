import React from 'react';
import { useLocation } from 'react-router-dom';

export default function BookingConfirmation() {
  const { state } = useLocation();
  const bookings = state?.bookingSummary || [];
  const extras = state?.extras || [];
  const addOns = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'airport', label: 'Airport Pickup' },
    { id: 'late-checkout', label: 'Late Checkout' }
  ];

  return (
    <div className="confirmation">
      <h2>Booking Confirmed</h2>
      <p>Thank you for your reservation.</p>

      {bookings.length > 0 && (
        <div>
          <h3>Reservation Summary</h3>
          <ul>
            {bookings.map((b, idx) => (
              <li key={idx}>
                Listing #{b.listingId}: {b.checkinDate} → {b.checkoutDate}
              </li>
            ))}
          </ul>
        </div>
      )}

      {extras.length > 0 && (
        <div>
          <h3>Selected Extras</h3>
          <ul>
            {extras.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        </div>
      )}

      <h3>Optional Add-Ons</h3>
      <ul>
        {addOns.map(add => (
          <li key={add.id}>
            {add.label}
            <button className="primary" style={{ marginLeft: '0.5rem' }}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
