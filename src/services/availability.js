import api from './api';

/**
 * Fetch availability data for a listing. The API is expected to return an
 * array of ISO date strings or ranges. If the request fails or the response is
 * not in the expected format, an empty array is returned instead.
 *
 * @param {string|number} listingId Identifier of the listing
 * @returns {Promise<Array>} Availability information
 */
export async function fetchAvailability(listingId) {
  if (!listingId) return [];
  try {
    const res = await api.get(`/listings/${listingId}/availability`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    // Network or server errors are silently ignored upstream, so just return
    // an empty array to avoid breaking the UI.
    return [];
  }
}
