import { useEffect, useRef, useState } from 'react';
import PopoverPortal from '../shared/PopoverPortal';
import { useOnClickOutside, useOnEsc } from '../../hooks/useOnClickOutside';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useTranslation } from 'react-i18next';
import { dateLocales } from '../../i18n';

export default function StickyDateBar({ onSearch, initialDates, initialGuests }) {
  const { t, i18n } = useTranslation();
  const locale = dateLocales[i18n.language];
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);
  useOnClickOutside([btnRef, popRef], () => setOpen(false));
  useOnEsc(() => setOpen(false));

  const [range, setRange] = useState(initialDates || { from: null, to: null });
  const [guests, setGuests] = useState(initialGuests || 1);

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

  const label = range.from && range.to
    ? `${format(range.from,'P',{ locale })} → ${format(range.to,'P',{ locale })}`
    : t('search.preferredDates');

  return (
    <div className="sb-wrap">
      <button
        ref={btnRef}
        className="sb-chip"
        onClick={() => setOpen(v => !v)}
        aria-label={t('search.openCalendar')}
        aria-expanded={open}
      >
        {label}
      </button>
      {open && (
        <PopoverPortal>
          <div ref={popRef} className="popover" style={{ top: coords.top, left: coords.left, width: coords.width }}>
            <DayPicker mode="range" selected={range} onSelect={setRange} locale={locale} />
          </div>
        </PopoverPortal>
      )}
      <select className="sb-select" value={guests} onChange={e => setGuests(Number(e.target.value))}>
        {[...Array(6)].map((_,i)=> <option key={i+1} value={i+1}>{t('common.guest', { count: i+1 })}</option>)}
      </select>
      <button className="btn-primary" onClick={() => onSearch({ dates: range, guests })} disabled={!range.from || !range.to}>
        {t('search.search')}
      </button>
    </div>
  );
}
