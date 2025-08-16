import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import ListingCard from '../components/listings/ListingCard';

const Listings = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE}/listings`).then(res => setListings(res.data));
    }, []);

    return (
        <div className="container">
            <h1>Listings</h1>
            <section className="grid">
                {listings.map(listing => (
                    <div key={listing.id} className="card card--half">
                        <ListingCard listing={listing} />
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Listings;
