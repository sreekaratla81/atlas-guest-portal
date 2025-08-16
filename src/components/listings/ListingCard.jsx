import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import EnquiryModal from '../shared/EnquiryModal';
import { CONTACT } from '../../config/siteConfig';

export default function ListingCard({ listing, prefillDates, prefillGuests }) {
  const [openCal, setOpenCal] = useState(false);
  const [range, setRange] = useState(prefillDates || { from: null, to: null });
  const [guests, setGuests] = useState(prefillGuests || 1);
  const [openEnquiry, setOpenEnquiry] = useState(false);

  const preferredLabel = range.from && range.to
    ? `${format(range.from,'dd MMM')} → ${format(range.to,'dd MMM')}`
    : '';

  const whatsappLink = (() => {
    const msg = encodeURIComponent(
      `Hi ${CONTACT.companyName}, I'm interested in "${listing.title}".\n` +
      `Guests: ${guests}\n` +
      (preferredLabel ? `Preferred dates: ${preferredLabel}\n` : '') +
      `Please share availability and pricing.`
    );
    return `https://wa.me/${CONTACT.whatsappE164.replace('+','')}?text=${msg}`;
  })();

  const telLink = `tel:${CONTACT.phoneE164}`;
  const mailtoLink = (() => {
    const subject = encodeURIComponent(`Enquiry: ${listing.title}`);
    const body = encodeURIComponent(
      `Hello ${CONTACT.companyName},\n\n` +
      `I'm interested in "${listing.title}".\n` +
      `Guests: ${guests}\n` +
      (preferredLabel ? `Preferred dates: ${preferredLabel}\n` : '') +
      `My details:\nName: \nPhone: \nEmail: \n\nThanks!`
    );
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  })();

  const hasPref = range.from && range.to;

  return (
    <div className="lc-card">
      <div className="lc-media">
        <img src={listing.imageUrl} alt={listing.title} />
      </div>
      <div className="lc-body">
        <div className="lc-header">
          <h3 className="lc-title">{listing.title}</h3>
          <div className="lc-sub">{listing.location}</div>
          <div className="lc-price">₹{listing.pricePerNight} / night</div>
        </div>

        <div className="lc-controls">
          <button className="lc-chip" aria-label="Open preferred dates calendar" onClick={() => setOpenCal(v => !v)}>
            📅 {hasPref ? preferredLabel : 'Preferred dates'}
          </button>

          {openCal && (
            <div className="lc-popover">
              <DayPicker mode="range" selected={range} onSelect={setRange} />
            </div>
          )}

          <select className="lc-select" value={guests} onChange={e => setGuests(Number(e.target.value))}>
            {[...Array(6)].map((_,i) => <option key={i+1} value={i+1}>{i+1} Guest{i? 's':''}</option>)}
          </select>

          <div className={`lc-pill ${hasPref ? 'ok' : 'muted'}`}>
            {hasPref ? 'Dates noted (no instant booking)' : 'Add preferred dates'}
          </div>

          <div className="lc-actions">
            <button className="btn-primary" onClick={() => { setOpenEnquiry(true); window.gtag?.('event','enquiry_open',{listingId: listing.id}); }}>
              Enquire Now
            </button>
            <div className="btn-split">
              <a className="btn-ghost" href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
              <a className="btn-ghost" href={telLink}>Call</a>
              <a className="btn-ghost" href={mailtoLink}>Email</a>
            </div>
          </div>
        </div>
      </div>

      {openEnquiry && (
        <EnquiryModal
          onClose={() => setOpenEnquiry(false)}
          listing={listing}
          guests={guests}
          preferredFrom={range.from}
          preferredTo={range.to}
        />
      )}
    </div>
  );
}
