import { useEffect, useState, useCallback } from 'react';
import { fetchListings } from '../api/listings';
import { ErrorBanner } from '../ui/ErrorBanner';
import { EmptyState } from '../ui/EmptyState';
import ListingCard from '../components/listings/ListingCard';

export default function ListingsPage() {
  const [data, setData] = useState(null);     // null=not loaded, []=empty, [..]=data
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const items = await fetchListings();
      setData(Array.isArray(items) ? items : []);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <div className="container">
        <h2>Find your stay</h2>
        <div className="skeleton-row" />
        <div className="skeleton-row" />
        <div className="skeleton-row" />
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Find your stay</h2>

      {err && (
        <ErrorBanner
          title="We couldn’t load listings"
          details={err}
          onRetry={load}
        />
      )}

      {!err && data?.length === 0 && (
        <EmptyState title="No listings yet" subtitle="Please check back later." />
      )}

      {!err && (data?.length ?? 0) > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
