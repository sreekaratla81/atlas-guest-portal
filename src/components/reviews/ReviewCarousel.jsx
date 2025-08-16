import { useState } from 'react';
import { reviews } from '../../data/reviews';

export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex(i => (i + 1) % reviews.length);
  const prev = () => setIndex(i => (i - 1 + reviews.length) % reviews.length);
  const review = reviews[index];
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

  return (
    <section className="rc-wrap">
      <h2 className="rc-title">Guest Reviews</h2>
      <div className="rc-card">
        <div className="rc-stars" aria-label={`${review.rating} star review`}>{stars}</div>
        <p className="rc-text">"{review.text}"</p>
        <div className="rc-meta">
          <span className="rc-name">{review.name}</span>
          <span className="rc-date">{review.date}</span>
          <span className="rc-badge">Verified Stay</span>
        </div>
      </div>
      <div className="rc-controls">
        <button onClick={prev} aria-label="Previous review">‹</button>
        <button onClick={next} aria-label="Next review">›</button>
      </div>
    </section>
  );
}
