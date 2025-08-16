export const listings = [
  {
    id: 501,
    title: 'Penthouse 501',
    imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/501/cover.jpg',
    address: {
      street: 'KPHB Colony',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500072',
      country: 'IN'
    },
    pricePerNight: 4500,
    rating: 4.8,
    reviewCount: 42,
    host: {
      name: 'Anita Verma',
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Hyderabad local who loves hosting and sharing insider tips with guests.',
    },
    refund: 'Full refund up to 5 days before check‑in',
    houseRules: 'No smoking or pets',
    policiesLink: '/policies',
  },
  {
    id: 301,
    title: 'Room 301',
    imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/301/cover.jpg',
    address: {
      street: 'KPHB Colony',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500072',
      country: 'IN'
    },
    pricePerNight: 3000,
    rating: 4.7,
    reviewCount: 28,
    host: {
      name: 'Anita Verma',
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Hyderabad local who loves hosting and sharing insider tips with guests.',
    },
    refund: 'Full refund up to 5 days before check‑in',
    houseRules: 'No smoking or pets',
    policiesLink: '/policies',
  },
  {
    id: 302,
    title: 'Room 302',
    imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/302/cover.jpg',
    address: {
      street: 'KPHB Colony',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500072',
      country: 'IN'
    },
    pricePerNight: 3200,
    rating: 4.6,
    reviewCount: 31,
    host: {
      name: 'Anita Verma',
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Hyderabad local who loves hosting and sharing insider tips with guests.',
    },
    refund: 'Full refund up to 5 days before check‑in',
    houseRules: 'No smoking or pets',
    policiesLink: '/policies',
  },
  {
    id: 201,
    title: 'Room 201',
    imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/201/cover.jpg',
    address: {
      street: 'KPHB Colony',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500072',
      country: 'IN'
    },
    pricePerNight: 2500,
    rating: 4.5,
    reviewCount: 19,
    host: {
      name: 'Anita Verma',
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Hyderabad local who loves hosting and sharing insider tips with guests.',
    },
    refund: 'Full refund up to 5 days before check‑in',
    houseRules: 'No smoking or pets',
    policiesLink: '/policies',
  },
  {
    id: 202,
    title: 'Room 202',
    imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/202/cover.jpg',
    address: {
      street: 'KPHB Colony',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500072',
      country: 'IN'
    },
    pricePerNight: 2600,
    rating: 4.5,
    reviewCount: 21,
    host: {
      name: 'Anita Verma',
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Hyderabad local who loves hosting and sharing insider tips with guests.',
    },
    refund: 'Full refund up to 5 days before check‑in',
    houseRules: 'No smoking or pets',
    policiesLink: '/policies',
  },
  {
    id: 101,
    title: 'Room 101',
    imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/101/cover.jpg',
    address: {
      street: 'KPHB Colony',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500072',
      country: 'IN'
    },
    pricePerNight: 2400,
    rating: 4.4,
    reviewCount: 15,
    host: {
      name: 'Anita Verma',
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Hyderabad local who loves hosting and sharing insider tips with guests.',
    },
    refund: 'Full refund up to 5 days before check‑in',
    houseRules: 'No smoking or pets',
    policiesLink: '/policies',
  },
  {
    id: 102,
    title: 'Room 102',
    imageUrl: 'https://atlashomestorage.blob.core.windows.net/listing-images/102/cover.jpg',
    address: {
      street: 'KPHB Colony',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500072',
      country: 'IN'
    },
    pricePerNight: 2300,
    rating: 4.3,
    reviewCount: 12,
    host: {
      name: 'Anita Verma',
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Hyderabad local who loves hosting and sharing insider tips with guests.',
    },
    refund: 'Full refund up to 5 days before check‑in',
    houseRules: 'No smoking or pets',
    policiesLink: '/policies',
  }
];

export const getListingById = (id) => listings.find(l => l.id === Number(id));

