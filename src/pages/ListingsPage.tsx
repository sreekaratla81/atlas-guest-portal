import { useEffect, useState } from 'react';
import ListingGrid from '@/components/listings/ListingGrid';
import { getApiBase, fetchJson } from '@/lib/http';

export default function ListingsPage() {
  const [rows, setRows] = useState<any[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const base = getApiBase();
    console.debug('[Listings] mount', { base });
    fetchJson<any[]>('/api/listings/public')
      .then(d => {
        console.debug('[Listings] fetched', { count: d?.length ?? 0 });
        setRows(d);
      })
      .catch(e => {
        console.error('[Listings] fetch failed', e);
        setErr('Could not load listings. Please try again.');
      });
  }, []);

  if (err) return <div className="alert alert-danger">{err}</div>;
  if (rows === null) return <div>Loading listings…</div>;
  if (rows.length === 0) return <div>No listings published yet.</div>;
  return <ListingGrid items={rows} />;
}
