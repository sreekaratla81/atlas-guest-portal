import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../config';

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [addonsOpen, setAddonsOpen] = useState(false);

    useEffect(() => {
        axios.get(`${API_BASE}/listings/${id}`).then(res => setListing(res.data));
    }, [id]);

    if (!listing) return <p>Loading...</p>;

    return (
        <div className="card">
            <img
                src="https://via.placeholder.com/800x400?text=Listing"
                className="card-img-top"
                alt={listing.name}
                style={{ height: '625px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column">
                <h3 className="card-title">{listing.name}</h3>
                <p className="card-text">Type: {listing.type}</p>
                <p className="card-text">Max Guests: {listing.maxGuests}</p>
                <p className="card-text">₹{listing.pricePerNight} / night</p>
                <div className="mt-2">
                    <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => setAddonsOpen(!addonsOpen)}
                        aria-expanded={addonsOpen}
                    >
                        Add-ons available {addonsOpen ? '▲' : '▼'}
                    </button>
                    {addonsOpen && (
                        <ul className="list-unstyled text-muted small mt-1 mb-0">
                            <li>Airport transfer</li>
                            <li>Local tour packages</li>
                        </ul>
                    )}
                </div>
                <button
                    className="btn btn-danger mt-auto"
                    style={{ backgroundColor: '#FF5A5F', borderColor: '#FF5A5F' }}
                >
                    Reserve
                </button>
            </div>
        </div>
    );
};

export default ListingDetails;

