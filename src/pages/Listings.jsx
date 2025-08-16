import ListingCard from '../components/listings/ListingCard';
import { listings } from '../data/listings';
import { useState } from 'react';

export default function Listings() {
  const [filters] = useState({ dates: { from: null, to: null }, guests: 1 });

  return (
    <div className="container">
      <section className="grid">
        {listings.map(l => (
          <div key={l.id} className="card card--half">
            <ListingCard listing={l} prefillDates={filters.dates} prefillGuests={filters.guests} />
          </div>
        ))}
      </section>
    </div>
  );
}
    useEffect(() => {
        axios.get(`${API_BASE}/listings`).then(res => setListings(res.data));
    }, []);

    const handleImageError = (e) => {
        e.target.src = '/hero.jpg';
    };

    return (
        <div className="row">
            {listings.map(listing => (
                <div className="col-md-4 mb-4" key={listing.id}>
                    <div className="card h-100">
                        <img
                            src={listing.imageUrl}
                            className="card-img-top"
                            alt={listing.name || listing.title}
                            loading="lazy"
                            onError={handleImageError}
                            style={{ height: '470px', objectFit: 'cover' }}
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{listing.name || listing.title}</h5>
                            {listing.pricePerNight || listing.price ? (
                                <p className="card-text">₹{listing.pricePerNight || listing.price} / night</p>
                            ) : null}
                            {listing.rating ? (
                                <p className="card-text">Rating: {listing.rating}</p>
                            ) : null}
                            <Link className="btn btn-primary mt-auto" to={`/listings/${listing.id}`}>View Details</Link>
                            <button className="btn btn-primary mt-2">Reserve</button>
                            <button className="btn btn-danger mt-2" style={{ backgroundColor: '#D32F2F', borderColor: '#D32F2F' }}>Reserve</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Listings;
