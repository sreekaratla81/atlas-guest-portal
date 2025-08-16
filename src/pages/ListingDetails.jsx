import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getListingById } from '../data/listings';
import { CONTACT } from '../config/siteConfig';
import EnquiryModal from '../components/shared/EnquiryModal';
import ContactStrip from '../components/shared/ContactStrip';
import StarRating from '../components/shared/StarRating';
import ReviewCount from '../components/shared/ReviewCount';

export default function ListingDetails() {
  const { id } = useParams();
  const listing = getListingById(id);
  const [openEnquiry, setOpenEnquiry] = useState(false);

  if (!listing) return <p>Listing not found.</p>;

  const whatsappLink = (() => {
    const msg = encodeURIComponent(
      `Hi ${CONTACT.companyName}, I'm interested in "${listing.title}".\nPlease share availability and pricing.`
    );
    return `https://wa.me/${CONTACT.whatsappE164.replace('+','')}?text=${msg}`;
  })();

  return (
    <div className="card">
      <div className="lc-media">
        <img src={listing.imageUrl} alt={listing.title} />
      </div>
      <div className="lc-body d-flex flex-column">
        <h3 className="lc-title">{listing.title}</h3>
        {(listing.rating != null || listing.reviewCount != null) && (
          <div className="d-flex align-items-center">
            <StarRating rating={listing.rating} />
            <ReviewCount count={listing.reviewCount} />
          </div>
        )}
        <div className="lc-sub">{listing.location}</div>
        <div className="lc-price">₹{listing.pricePerNight} / night</div>
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
