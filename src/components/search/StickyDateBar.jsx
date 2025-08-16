import { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function StickyDateBar({ onSearch, initialDates, initialGuests }) {
  const [openCal, setOpenCal] = useState(false);
  const [range, setRange] = useState(initialDates || { from: null, to: null });
  const [guests, setGuests] = useState(initialGuests || 1);

  const label = range.from && range.to
    ? `${format(range.from,'dd MMM')} → ${format(range.to,'dd MMM')}`
    : 'Select dates';

  return (
    <div className="sb-wrap">
      <button className="sb-chip" onClick={() => setOpenCal(v => !v)}>
        {label}
      </button>
      {openCal && (
        <div className="sb-popover">
          <DayPicker mode="range" selected={range} onSelect={setRange} />
        </div>
      )}
      <select className="sb-select" value={guests} onChange={e => setGuests(Number(e.target.value))}>
        {[...Array(6)].map((_,i)=> <option key={i+1} value={i+1}>{i+1} Guest{i? 's':''}</option>)}
      </select>
      <button className="btn-primary" onClick={() => onSearch({ dates: range, guests })} disabled={!range.from || !range.to}>
        Search
      </button>
    </div>
  );
}
