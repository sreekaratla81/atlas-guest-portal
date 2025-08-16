import { Routes, Route } from 'react-router-dom';
import Header from './components/chrome/Header';
import Footer from './components/chrome/Footer';
import HomePage from './pages/HomePage';
import ListingDetails from './pages/ListingDetails';
import GuestBooking from './pages/GuestBooking';
import BookingSummary from './pages/BookingSummary';
import BookingConfirmation from './pages/BookingConfirmation';

export default function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/guest-booking" element={<GuestBooking />} />
        <Route path="/booking/summary" element={<BookingSummary />} />
        <Route path="/booking/confirmation" element={<BookingConfirmation />} />
      </Routes>
      <Footer />
    </>
  );
}
