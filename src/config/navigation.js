import { listings } from '../data/listings';

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  {
    label: 'Listings',
    path: '/listings',
    children: listings.map(l => ({ label: l.title, path: `/listings/${l.id}` }))
  },
  { label: 'About', path: '#about' },
  { label: 'Contact', path: '#contact' }
];
