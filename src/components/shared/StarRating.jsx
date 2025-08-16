export default function StarRating({ rating }) {
  const value = typeof rating === 'number' ? rating.toFixed(1) : rating;
  return (
    <div className="star-rating">
      <i className="fa-solid fa-star" aria-hidden="true"></i>
      <span className="ms-1">{value}</span>
    </div>
  );
}

