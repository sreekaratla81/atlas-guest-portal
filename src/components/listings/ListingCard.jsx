import { useEffect, useRef, useState } from 'react';
import PopoverPortal from '../shared/PopoverPortal';
import { useOnClickOutside, useOnEsc } from '../../hooks/useOnClickOutside';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import EnquiryModal from '../shared/EnquiryModal';
import { CONTACT } from '../../config/siteConfig';

export default function ListingCard({ listing, prefillDates, prefillGuests }) {
  const [openCal, setOpenCal] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);
  useOnClickOutside([btnRef, popRef], () => setOpenCal(false));
  useOnEsc(() => setOpenCal(false));

  const [range, setRange] = useState(prefillDates || { from: null, to: null });
  const [guests, setGuests] = useState(prefillGuests || 1);
  const [openEnquiry, setOpenEnquiry] = useState(false);

  const [coords, setCoords] = useState({ top: 0, left: 0, width: 320 });
  useEffect(() => {
    function position() {
      const r = btnRef.current?.getBoundingClientRect();
      if (!r) return;
      setCoords({
        top: r.bottom + 6,
        left: Math.max(8, Math.min(r.left, window.innerWidth - 340)),
        width: Math.max(320, r.width)
      });
    }
    if (openCal) {
      position();
      window.addEventListener('resize', position);
      window.addEventListener('scroll', position, true);
      return () => {
        window.removeEventListener('resize', position);
        window.removeEventListener('scroll', position, true);
      };
    }
  }, [openCal]);

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
          <div className="lc-date">
            <button
              ref={btnRef}
              className="lc-chip"
              onClick={() => setOpenCal(v => !v)}
              aria-label="Open preferred dates calendar"
              aria-expanded={openCal}
            >
              📅 {hasPref ? preferredLabel : 'Preferred dates'}
            </button>
          </div>

          <select className="lc-select" value={guests} onChange={e => setGuests(Number(e.target.value))}>
            {[...Array(6)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Guest{i ? 's' : ''}
              </option>
            ))}
          </select>

          <div className={`lc-pill ${hasPref ? 'ok' : 'muted'}`}>
            {hasPref ? 'Dates noted (no instant booking)' : 'Add preferred dates'}
          </div>

          <div className="lc-actions">
            <button className="btn-primary" onClick={() => setOpenEnquiry(true)}>
              Enquire Now
            </button>
            <a className="btn-ghost" href={whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="btn-ghost" href={`tel:${CONTACT.phoneE164}`}>
              Call
            </a>
            <a
              className="btn-ghost"
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Enquiry: ' + listing.title)}`}
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {openCal && (
        <PopoverPortal>
          <div ref={popRef} className="popover" style={{ top: coords.top, left: coords.left, width: coords.width }}>
            <DayPicker mode="range" selected={range} onSelect={setRange} />
          </div>
        </PopoverPortal>
      )}

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
