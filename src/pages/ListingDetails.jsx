import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getListingById } from '../data/listings';
import { CONTACT } from '../config/siteConfig';
import EnquiryModal from '../components/shared/EnquiryModal';
import ContactStrip from '../components/shared/ContactStrip';
import Breadcrumb from '../components/shared/Breadcrumb';
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

  const formattedAddress = formatAddress(listing.address);
  const mapLink = getMapLink(listing.address);

  return (
    <>
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Listings', to: '/listings' }, { label: listing.title }]} />
      <div className="card">
        <div className="lc-media">
          <img src={listing.imageUrl} alt={listing.title} />
        </div>
        <div className="lc-body d-flex flex-column">
          <h3 className="lc-title">{listing.title}</h3>
        <div className="lc-sub">{listing.location}</div>
        <div className="lc-price">₹{listing.pricePerNight} / night</div>
      </div>
      {openEnquiry && (
        <EnquiryModal
          onClose={() => setOpenEnquiry(false)}
          listing={listing}
          guests={1}
          preferredFrom={null}
          preferredTo={null}
        />
      )}
      {typeof window !== 'undefined' && window.innerWidth < 768 && (
        <ContactStrip
          price={listing.pricePerNight}
          whatsappLink={whatsappLink}
          onEnquire={() => setOpenEnquiry(true)}
        />
      )}
    </div>
    </>
  );
}
