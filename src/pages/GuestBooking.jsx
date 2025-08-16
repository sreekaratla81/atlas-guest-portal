// src/pages/GuestBooking.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GuestBooking = () => {
    const [listings, setListings] = useState([]);
    const [selected, setSelected] = useState([]);
    const [guest, setGuest] = useState({ name: '', phone: '', email: '' });
    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE}/listings`).then(res => setListings(res.data));
        const today = new Date();
        const days = Array.from({ length: 14 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            return date.toISOString().split('T')[0];
        });
        setCalendarDays(days);
    }, []);

    const toggle = (listingId, date) => {
        const exists = selected.find(x => x.listingId === listingId && x.date === date);
        if (exists) {
            setSelected(selected.filter(x => !(x.listingId === listingId && x.date === date)));
        } else {
            setSelected([...selected, { listingId, date }]);
        }
    };

    const groupByListing = () => {
        const groups = {};
        selected.forEach(({ listingId, date }) => {
            if (!groups[listingId]) groups[listingId] = [];
            groups[listingId].push(date);
        });
        return Object.entries(groups).map(([listingId, dates]) => {
            dates.sort();
            return {
                listingId: parseInt(listingId),
                checkinDate: dates[0],
                checkoutDate: dates[dates.length - 1],
            };
        });
    };

    const submit = async () => {
        const guestRes = await axios.post(`${import.meta.env.VITE_API_BASE}/guests`, guest);
        const guestId = guestRes.data.id;
        const bookings = groupByListing().map(b => ({ ...b, guestId }));
        for (let b of bookings) {
            await axios.post(`${import.meta.env.VITE_API_BASE}/bookings`, b);
        }
        alert("Booking submitted successfully");
        setSelected([]);
    };

    return (
        <div>
            <h2>📅 Multi-Listing Booking</h2>
            <div className="calendar-grid">
                <table>
                    <thead>
                        <tr><th>Listing</th>{calendarDays.map(d => <th key={d}>{d.slice(5)}</th>)}</tr>
                    </thead>
                    <tbody>
                        {listings.map(l => (
                            <tr key={l.id}>
                                <td>{l.name}</td>
                                {calendarDays.map(d => (
                                    <td
                                        key={d}
                                        className={selected.find(x => x.listingId === l.id && x.date === d) ? 'selected' : 'cell'}
                                        onClick={() => toggle(l.id, d)}
                                    >
                                        {selected.find(x => x.listingId === l.id && x.date === d) ? '✔' : ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="summary">
                <h3>Guest Details</h3>
                <label>
                    Name
                    <input
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={guest.name}
                        onChange={e => setGuest({ ...guest, name: e.target.value })}
                    />
                </label>
                <label>
                    Phone
                    <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        aria-describedby="gb-phone-hint"
                        value={guest.phone}
                        onChange={e => setGuest({ ...guest, phone: e.target.value })}
                    />
                    <span id="gb-phone-hint" className="hint">Include country code, e.g., +1 555-555-5555</span>
                </label>
                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={guest.email}
                        onChange={e => setGuest({ ...guest, email: e.target.value })}
                    />
                </label>
                <button onClick={submit}>Book Selected</button>
            </div>
        </div>
    );
};

export default GuestBooking;
