// src/pages/GuestBooking.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

const GuestBooking = () => {
    const [listings, setListings] = useState([]);
    const [selected, setSelected] = useState([]); // { listingId, date }
    const [guest, setGuest] = useState({ name: '', phone: '', email: '' });
    const [extras, setExtras] = useState({ airportPickup: false, localTours: false });
    const [calendarDays, setCalendarDays] = useState([]);
    const navigate = useNavigate();

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
        navigate('/booking/confirmation', { state: { bookingSummary: bookings, extras: [] } });
        setSelected([]);
        setExtras({ airportPickup: false, localTours: false });
    };

    return (
         <div>
             <h1>📅 Multi-Listing Booking</h1>
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
                 <h2>Guest Details</h2>
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
                <input placeholder='Name' value={guest.name} onChange={e => setGuest({ ...guest, name: e.target.value })} />
                <input placeholder='Phone' value={guest.phone} onChange={e => setGuest({ ...guest, phone: e.target.value })} />
                <input placeholder='Email' value={guest.email} onChange={e => setGuest({ ...guest, email: e.target.value })} />

                <fieldset className="extras-section">
                    <legend>Enhance Your Stay</legend>
                    <label>
                        <input
                            type="checkbox"
                            checked={extras.airportPickup}
                            onChange={e => setExtras({ ...extras, airportPickup: e.target.checked })}
                        />
                        Airport Pickup - $30
                        <span className="extra-desc"> Convenient ride from the airport.</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={extras.localTours}
                            onChange={e => setExtras({ ...extras, localTours: e.target.checked })}
                        />
                        Local Tours - $50
                        <span className="extra-desc"> Guided exploration of the city.</span>
                    </label>
                </fieldset>

                <button onClick={submit}>Book Selected</button>
            </div>
        </div>
    );
};

export default GuestBooking;
