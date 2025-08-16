export default function ReviewCount({ count }) {
  if (count == null) return null;
  return (
    <div className="review-count">
      {count} review{count === 1 ? '' : 's'}
    </div>
  );
}

