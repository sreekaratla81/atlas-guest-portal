import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getListingById } from '../data/listings';
import { CONTACT } from '../config/siteConfig';
import EnquiryModal from '../components/shared/EnquiryModal';
import ContactStrip from '../components/shared/ContactStrip';
import { useCurrency } from '../hooks/useCurrency';

export default function ListingDetails() {
  const { id } = useParams();
  const listing = getListingById(id);
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const { formatCurrency } = useCurrency();

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
        <div className="lc-sub">{listing.location}</div>
        <div className="lc-price">{formatCurrency(listing.pricePerNight)} / night</div>
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
