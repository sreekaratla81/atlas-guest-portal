import api from './api';

export async function fetchAvailability(listingId) {
  const res = await api.get(`/listings/${listingId}/availability`);
  return res.data; // expecting array of ISO date strings or ranges
}
