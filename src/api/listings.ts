import { httpGet } from './http';
import { requireEnv } from '../config/env';

export type Listing = {
  id: number | string;
  name: string;
  // extend with fields your UI uses (price, city, images, etc.)
};

export async function fetchListings(): Promise<Listing[]> {
  const base = requireEnv('API_BASE_URL');
  const url = `${base.replace(/\/$/, '')}/listings`;
  return httpGet<Listing[]>(url);
}
