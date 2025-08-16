import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { CONTACT } from '../config/siteConfig';
import EnquiryModal from '../components/shared/EnquiryModal';
import ContactStrip from '../components/shared/ContactStrip';
import StarRating from '../components/shared/StarRating';
import ReviewCount from '../components/shared/ReviewCount';
import { formatAddress, getMapLink } from '../utils/address';
import { useCurrency } from '../hooks/useCurrency';

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
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

  const formattedAddress = formatAddress(listing.address);
  const mapLink = getMapLink(listing.address);

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
        {(listing.rating != null || listing.reviewCount != null) && (
          <div className="d-flex align-items-center">
            <StarRating rating={listing.rating} />
            <ReviewCount count={listing.reviewCount} />
          </div>
        )}
        <div className="lc-sub">
          <a href={mapLink} target="_blank" rel="noreferrer">{formattedAddress}</a>
        </div>
        {(listing.pricePerNight || listing.price) && (
          <div className="lc-price">
            {formatCurrency(listing.pricePerNight || listing.price)} / night
          </div>
        )}
        {listing.host && (
          <div className="host-info">
            <img src={listing.host.photoUrl} alt={listing.host.name} />
            <div>
              <div className="host-name">Hosted by {listing.host.name}</div>
              {listing.host.bio && <div className="host-bio">{listing.host.bio}</div>}
            </div>
          </div>
        )}
        {(listing.refund || listing.houseRules || listing.policiesLink) && (
          <div className="policies">
            {listing.refund && <div><strong>Refund:</strong> {listing.refund}</div>}
            {listing.houseRules && <div><strong>House rules:</strong> {listing.houseRules}</div>}
            {listing.policiesLink && <a href={listing.policiesLink}>View full policies</a>}
          </div>
        )}
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

