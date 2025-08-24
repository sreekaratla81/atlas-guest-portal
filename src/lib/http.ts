export function getApiBase() {
  const v = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (!v || !/^https?:\/\//.test(v)) {
    console.error('[ENV] Invalid VITE_API_BASE_URL', v);
    return '';
  }
  return v.replace(/\/+$/, '');
}

export async function fetchJson<T>(path: string): Promise<T> {
  const base = getApiBase();
  if (!base) throw new Error('API base URL missing');
  const res = await fetch(`${base}${path}`, {
    headers: { Accept: 'application/json' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
