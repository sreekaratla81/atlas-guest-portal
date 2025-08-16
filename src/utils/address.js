export function formatCountry(code, locale = 'en') {
  try {
    const formatter = new Intl.DisplayNames([locale], { type: 'region' });
    return formatter.of(code);
  } catch (e) {
    return code;
  }
}

export function formatAddress(address, locale = 'en') {
  if (!address) return '';
  const { street, city, state, postalCode, country } = address;
  const countryName = country ? formatCountry(country, locale) : '';
  return [street, city, state, postalCode, countryName].filter(Boolean).join(', ');
}

export function getMapLink(address) {
  if (!address) return '#';
  const query = [address.street, address.city, address.state, address.postalCode, address.country]
    .filter(Boolean)
    .join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
