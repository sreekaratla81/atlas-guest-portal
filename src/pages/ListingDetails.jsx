import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { CONTACT } from '../config/siteConfig';
import EnquiryModal from '../components/shared/EnquiryModal';
import ContactStrip from '../components/shared/ContactStrip';
import { useCurrency } from '../hooks/useCurrency';

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const { formatCurrency } = useCurrency();

  useEffect(() => {
    axios.get(`${API_BASE}/listings/${id}`).then(res => {
      setListing(res.data);
    });
  }, [id]);

  if (!listing) return <p>Loading...</p>;

  const whatsappLink = (() => {
    const msg = encodeURIComponent(
      `Hi ${CONTACT.companyName}, I'm interested in "${listing.title}".\nPlease share availability and pricing.`
    );
    return `https://wa.me/${CONTACT.whatsappE164.replace('+','')}?text=${msg}`;
  })();

  return (
    <div className="card">
      <div className="lc-media position-relative">
        {(() => {
          const images = listing.images || listing.imageUrls || [listing.imageUrl];
          const handleImageError = (e) => {
            e.target.src = '/hero.jpg';
          };
          const prev = () => setImageIndex((imageIndex - 1 + images.length) % images.length);
          const next = () => setImageIndex((imageIndex + 1) % images.length);
          return (
            <>
              <img
                src={images[imageIndex]}
                alt={`${listing.title} image ${imageIndex + 1}`}
                loading="lazy"
                onError={handleImageError}
              />
              {images.length > 1 && (
                <>
                  <button className="carousel-control-prev" onClick={prev}>
                    ‹
                  </button>
                  <button className="carousel-control-next" onClick={next}>
                    ›
                  </button>
                </>
              )}
            </>
          );
        })()}
      </div>
      <div className="lc-body d-flex flex-column">
        <h3 className="lc-title">{listing.title}</h3>
        <div className="lc-sub">{listing.location}</div>
        {listing.pricePerNight || listing.price ? (
          <div className="lc-price">₹{listing.pricePerNight || listing.price} / night</div>
        ) : null}
        {listing.rating && <div className="lc-rating">Rating: {listing.rating}</div>}
        {listing.amenities && listing.amenities.length > 0 && (
          <div className="lc-amenities mt-3">
            <h5>Amenities</h5>
            <ul>
              {listing.amenities.map((am) => (
                <li key={am}>{am}</li>
              ))}
            </ul>
          </div>
        )}
        {listing.cancellationPolicy && (
          <div className="lc-cancellation mt-3">
            <h5>Cancellation Policy</h5>
            <p>{listing.cancellationPolicy}</p>
          </div>
        )}
        {listing.reviewScore && (
          <div className="lc-review mt-3">
            <h5>Review Score</h5>
            <p>{listing.reviewScore}</p>
          </div>
        )}
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
  );
}
