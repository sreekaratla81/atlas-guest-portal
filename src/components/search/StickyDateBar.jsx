import { useEffect, useRef, useState } from 'react';
import PopoverPortal from '../shared/PopoverPortal';
import { useOnClickOutside, useOnEsc } from '../../hooks/useOnClickOutside';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { fetchAvailability } from '../../services/availability';
import { Button } from '../../ui';

export default function StickyDateBar({ onSearch, initialDates, initialGuests, listingId }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);
  useOnClickOutside([btnRef, popRef], () => setOpen(false));
  useOnEsc(() => setOpen(false));

  const [range, setRange] = useState(initialDates || { from: null, to: null });
  const [guests, setGuests] = useState(initialGuests || 1);
  const [disabledDates, setDisabledDates] = useState([]);

  const [coords, setCoords] = useState({ top: 0, left: 0, width: 320 });
  useEffect(() => {
    function position() {
      const r = btnRef.current?.getBoundingClientRect();
      if (!r) return;
      setCoords({ top: r.bottom + 6, left: r.left, width: Math.max(320, r.width) });
    }
    position();
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    return () => {
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  }, [open]);

  useEffect(() => {
    if (open && listingId && !disabledDates.length) {
      fetchAvailability(listingId)
        .then(d => setDisabledDates(d.map(dt => new Date(dt))))
        .catch(() => {});
    }
  }, [open, listingId, disabledDates.length]);

  const label = range.from && range.to
    ? `${format(range.from,'dd MMM')} → ${format(range.to,'dd MMM')}`
    : 'Preferred dates';
  const guideText = !range.from ? 'Select check-in date' : !range.to ? 'Select check-out date' : '';
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="sb-wrap">
      <button
        ref={btnRef}
        className="sb-chip"
        onClick={() => setOpen(v => !v)}
        aria-label="Open preferred dates calendar"
        aria-expanded={open}
      >
        {label}
      </button>
      {open && (
        <PopoverPortal>
          {isMobile ? (
            <div className="cal-backdrop" onClick={() => setOpen(false)}>
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
      <select className="sb-select" value={guests} onChange={e => setGuests(Number(e.target.value))}>
        {[...Array(6)].map((_,i)=> <option key={i+1} value={i+1}>{i+1} Guest{i? 's':''}</option>)}
      </select>
      <Button onClick={() => onSearch({ dates: range, guests })} disabled={!range.from || !range.to}>
        Search
      </Button>
    </div>
  );
}
