const DEFAULT_TIMEOUT_MS = 12000;

function withTimeout<T>(p: Promise<T>, ms = DEFAULT_TIMEOUT_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`Request timeout after ${ms}ms`)), ms);
    p.then(v => { clearTimeout(t); resolve(v); }, e => { clearTimeout(t); reject(e); });
  });
}

export async function httpGet<T>(url: string, init?: RequestInit): Promise<T> {
  // eslint-disable-next-line no-console
  console.debug('[HTTP] GET', url, init);
  try {
    const res = await withTimeout(fetch(url, { ...init, headers: { 'Accept': 'application/json', ...(init?.headers || {}) } }));
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      const err = new Error(`[HTTP] ${res.status} ${res.statusText} for ${url} :: ${body.slice(0, 300)}`);
      // eslint-disable-next-line no-console
      console.error(err);
      throw err;
    }
    // Defensive: ensure JSON
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
      const text = await res.text();
      throw new Error(`[HTTP] Non-JSON response for ${url}. content-type=${ct}. body(head)= ${text.slice(0, 300)}`);
    }
    const data = await res.json() as T;
    // eslint-disable-next-line no-console
    console.debug('[HTTP] OK', url, data);
    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[HTTP] GET failed', url, e);
    throw e;
  }
}
