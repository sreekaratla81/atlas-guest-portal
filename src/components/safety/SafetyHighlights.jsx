import React from 'react';
import { Link } from 'react-router-dom';

const highlights = [
  { icon: 'fa-solid fa-hand-sparkles', label: 'Enhanced Hygiene' },
  { icon: 'fa-solid fa-door-closed', label: 'Secure Entry' },
  { icon: 'fa-solid fa-headset', label: 'Local Support' },
];

export default function SafetyHighlights() {
  return (
    <section className="safety-highlights">
      {highlights.map(item => (
        <Link key={item.label} to="/safety" className="safety-item">
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </Link>
      ))}
    </section>
  );
}
