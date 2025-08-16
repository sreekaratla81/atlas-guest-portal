import React from 'react';
import { Link } from 'react-router-dom';

const highlights = [
  { icon: 'fa-solid fa-hand-sparkles', label: 'Enhanced Hygiene' },
  { icon: 'fa-solid fa-door-closed', label: 'Secure Entry' },
  { icon: 'fa-solid fa-headset', label: 'Local Support' },
];

export default function SafetyHighlights() {
  return (
    <section className="safety-highlights" aria-label="Safety highlights">
      <ul>
        {highlights.map(item => (
          <li key={item.label}>
            <Link to="/safety-protocols" className="safety-item">
              <i className={item.icon} aria-hidden="true"></i>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
