export const listings = [
  { id: 501, title: 'Penthouse 501', imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/501/cover.jpg', location: 'KPHB, Hyderabad', pricePerNight: 4500 },
  { id: 301, title: 'Room 301', imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/301/cover.jpg', location: 'KPHB, Hyderabad', pricePerNight: 3000 },
  { id: 302, title: 'Room 302', imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/302/cover.jpg', location: 'KPHB, Hyderabad', pricePerNight: 3200 },
  { id: 201, title: 'Room 201', imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/201/cover.jpg', location: 'KPHB, Hyderabad', pricePerNight: 2500 },
  { id: 202, title: 'Room 202', imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/202/cover.jpg', location: 'KPHB, Hyderabad', pricePerNight: 2600 },
  { id: 101, title: 'Room 101', imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/101/cover.jpg', location: 'KPHB, Hyderabad', pricePerNight: 2400 },
  { id: 102, title: 'Room 102', imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/102/cover.jpg', location: 'KPHB, Hyderabad', pricePerNight: 2300 }
];

export const getListingById = (id) => listings.find(l => l.id === Number(id));
