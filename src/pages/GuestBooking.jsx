// src/pages/GuestBooking.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DayPicker } from 'react-day-picker';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

const GuestBooking = () => {
    const [listings, setListings] = useState([]);
    const [selected, setSelected] = useState([]); // { listingId, date }
    const [guest, setGuest] = useState({ name: '', phone: '', email: '' });
    const [locale, setLocale] = useState(enUS);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE}/listings`)
            .then(res => setListings(res.data));

        const userLocale = navigator.language;
        import(`date-fns/locale/${userLocale}/index.js`)
            .then(mod => setLocale(mod.default))
            .catch(() => setLocale(enUS));
    }, []);

    const handleSelect = (listingId, dates) => {
        const others = selected.filter(x => x.listingId !== listingId);
        const newDates = (dates || []).map(d => ({ listingId, date: format(d, 'yyyy-MM-dd') }));
        setSelected([...others, ...newDates]);
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
            {listings.map(l => (
                <div key={l.id} className="listing-picker">
                    <h3 id={`listing-${l.id}`}>{l.name}</h3>
                    <DayPicker
                        mode="multiple"
                        selected={selected
                            .filter(x => x.listingId === l.id)
                            .map(x => parseISO(x.date))}
                        onSelect={dates => handleSelect(l.id, dates)}
                        locale={locale}
                        aria-labelledby={`listing-${l.id}`}
                    />
                </div>
            ))}
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
