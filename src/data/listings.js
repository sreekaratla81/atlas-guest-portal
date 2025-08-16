export const listings = [
  { id: 1, title: 'Penthouse with Pool', imageUrl: '/img/penthouse.jpg', location: 'Hyderabad', pricePerNight: 4500 },
  { id: 2, title: 'Cozy Studio', imageUrl: '/img/studio.jpg', location: 'Hyderabad', pricePerNight: 2500 },
];

export const getListingById = (id) => listings.find(l => l.id === id);
