import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PopoverPortal from '../shared/PopoverPortal';
import { useOnClickOutside, useOnEsc } from '../../hooks/useOnClickOutside';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import EnquiryModal from '../shared/EnquiryModal';
import { CONTACT } from '../../config/siteConfig';
import { Button } from '../../ui';
import { formatAddress, getMapLink } from '../../utils/address';
import { useCurrency } from '../../hooks/useCurrency';
import { fetchAvailability } from '../../services/availability';

export default function ListingCard({ listing, prefillDates, prefillGuests }) {
  const [openCal, setOpenCal] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);
  useOnClickOutside([btnRef, popRef], () => setOpenCal(false));
  useOnEsc(() => setOpenCal(false));

  const [range, setRange] = useState(prefillDates || { from: null, to: null });
  const [guests, setGuests] = useState(prefillGuests || 1);
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const { formatCurrency } = useCurrency();
  const [showActions, setShowActions] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);

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

  useEffect(() => {
    if (openCal && !disabledDates.length) {
      fetchAvailability(listing.id)
        .then(d => setDisabledDates(d.map(dt => new Date(dt))))
        .catch(() => {});
    }
  }, [openCal, listing.id, disabledDates.length]);

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
  const formattedAddress = formatAddress(listing.address);
  const mapLink = getMapLink(listing.address);
  const guideText = !range.from ? 'Select check-in date' : !range.to ? 'Select check-out date' : '';
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="lc-card">
      <div className="lc-media">
        <img src={listing.imageUrl} alt={listing.title} />
      </div>
      <div className="lc-body">
        <div className="lc-header">
          <h3 className="lc-title"><Link to={`/listings/${listing.id}`}>{listing.title}</Link></h3>
          <div className="lc-sub"><a href={mapLink} target="_blank" rel="noreferrer">{formattedAddress}</a></div>
          <div className="lc-price">{formatCurrency(listing.pricePerNight)} / night</div>
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
            {showActions ? (
              <>
                <Button
                  variant="dark"
                  onClick={() => {
                    setOpenEnquiry(true);
                    setShowActions(false);
                  }}
                >
                  Enquire
                </Button>
                <a
                  className="icon-btn whatsapp"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  onClick={() => setShowActions(false)}
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a
                  className="icon-btn"
                  href={`tel:${CONTACT.phoneE164}`}
                  aria-label="Call"
                  onClick={() => setShowActions(false)}
                >
                  <i className="fa-solid fa-phone"></i>
                </a>
                <a
                  className="icon-btn"
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Enquiry: ' + listing.title)}`}
                  aria-label="Email"
                  onClick={() => setShowActions(false)}
                >
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </>
            ) : (
              <Button
                variant="dark"
                onClick={() => setShowActions(true)}
                aria-haspopup="true"
                aria-expanded={showActions}
              >
                Book Now
              </Button>
            )}
          </div>
        </div>
      </div>

      {openCal && (
        <PopoverPortal>
          {isMobile ? (
            <div className="cal-backdrop" onClick={() => setOpenCal(false)}>
              <div
                ref={popRef}
                className="cal-sheet"
                onClick={e => e.stopPropagation()}
              >
                <div className="dp-header">
                  <div className="dp-guide">{guideText}</div>
                  <button
                    className="dp-clear"
                    onClick={() => setRange({ from: null, to: null })}
                    disabled={!range.from && !range.to}
                  >
                    Clear dates
                  </button>
                </div>
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  disabled={disabledDates}
                />
              </div>
            </div>
          ) : (
            <div
              ref={popRef}
              className="popover"
              style={{ top: coords.top, left: coords.left, width: coords.width }}
            >
              <div className="dp-header">
                <div className="dp-guide">{guideText}</div>
                <button
                  className="dp-clear"
                  onClick={() => setRange({ from: null, to: null })}
                  disabled={!range.from && !range.to}
                >
                  Clear dates
                </button>
              </div>
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={disabledDates}
              />
            </div>
          )}
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
