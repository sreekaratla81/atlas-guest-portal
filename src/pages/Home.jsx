import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const heroStyle = {
  background: 'url("/hero.jpg") center center/cover no-repeat',
  color: '#fff',
  minHeight: '60vh'
};

const listings = [
  {
    img:
      'https://yourstorage.blob.core.windows.net/listing-images/penthouse-501.jpg',
    title: 'Penthouse 501',
    desc: 'Premium stay with private jacuzzi, home theatre, and sunset view.'
  },
  {
    img: 'https://yourstorage.blob.core.windows.net/listing-images/room-301.jpg',
    title: 'Room 301',
    desc: 'Quiet corner unit. Well-suited for long stays or work from home.'
  },
  {
    img: 'https://yourstorage.blob.core.windows.net/listing-images/room-302.jpg',
    title: 'Room 302',
    desc: 'Designer 1BHK with high-speed internet and kitchen.'
  },
  {
    img: 'https://yourstorage.blob.core.windows.net/listing-images/room-201.jpg',
    title: 'Room 201',
    desc: 'Compact studio with work desk and kitchenette. Budget-friendly.'
  },
  {
    img: 'https://yourstorage.blob.core.windows.net/listing-images/room-202.jpg',
    title: 'Room 202',
    desc: 'Spacious stay with natural light and private bath.'
  },
  {
    img: 'https://yourstorage.blob.core.windows.net/listing-images/room-101.jpg',
    title: 'Room 101',
    desc: '1BHK unit with cozy interiors and balcony access. Max 5 guests.'
  },
  {
    img: 'https://yourstorage.blob.core.windows.net/listing-images/room-102.jpg',
    title: 'Room 102',
    desc: 'Bright and airy 1BHK with modern amenities. Ideal for families.'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = React.useState('');
  const [checkOut, setCheckOut] = React.useState('');
  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const today = new Date().toISOString().split('T')[0];

  const handleCheck = () => {
    navigate('/guest-booking');
  };

  return (
    <>
      <section className="text-center py-5" style={heroStyle}>
        <h1 className="display-4 mb-3">Welcome to Atlas Homestays</h1>
        <p className="lead mb-4">Premium Service Apartments in KPHB.</p>
        <Link to="/listings" className="btn btn-primary btn-lg">
          Browse Listings
        </Link>
      </section>
      {/* Booking Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(30, 30, 30, 0.7)',
        border: '1px solid #d4af37',
        borderRadius: '8px',
        margin: '0 auto',
        marginTop: '-2.5rem',
        marginBottom: '2rem',
        maxWidth: 900,
        padding: '1rem',
        color: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <div style={{ padding: '0 1rem', borderRight: '1px solid #d4af37' }}>
          <label style={{ fontWeight: 600 }}>Check In</label><br />
          <input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)} style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none' }} />
        </div>
        <div style={{ padding: '0 1rem', borderRight: '1px solid #d4af37' }}>
          <label style={{ fontWeight: 600 }}>Check Out</label><br />
          <input type="date" value={checkOut} min={checkIn || today} onChange={e => setCheckOut(e.target.value)} style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none' }} />
        </div>
        <div style={{ padding: '0 1rem', borderRight: '1px solid #d4af37' }}>
          <label style={{ fontWeight: 600 }}>Guests</label><br />
          <select value={adults} onChange={e => setAdults(Number(e.target.value))} style={{ marginRight: 8 }}>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
          </select>
          <select value={children} onChange={e => setChildren(Number(e.target.value))}>
            {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Child{n !== 1 ? 'ren' : ''}</option>)}
          </select>
        </div>
        <button
          onClick={handleCheck}
          style={{
            background: 'none',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '0 1.5rem',
            cursor: 'pointer'
          }}
        >
          Check Availability
        </button>
      </div>

      <section className="listings">
        {listings.map((listing, idx) => (
          <div className="card" key={idx}>
            <img src={listing.img} alt={listing.title} style={{ width: '100%', borderRadius: '0.5rem', height: '200px', objectFit: 'cover' }} />
            <h2 style={{ fontSize: '1.25rem', margin: '0.75rem 0 0.5rem' }}>{listing.title}</h2>
            <p style={{ fontSize: '0.95rem', color: '#555' }}>{listing.desc}</p>
          </div>
        ))}
      </section>

      <section className="contact">
        <p>
          <strong>Contact:</strong> +91-7032493290 (Also on WhatsApp)
        </p>
        <p>
          <strong>Location:</strong> 165, KPHB 7th Phase, Atlas Homes, Hyderabad,
          Telangana, India
        </p>
        <p>
          <a
            href="https://maps.app.goo.gl/yAS7whn2uHNuwtEPA"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps
          </a>
        </p>
      </section>

    </>
  );
};

export default Home;
