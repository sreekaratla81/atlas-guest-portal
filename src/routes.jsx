import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/chrome/Header';
import Footer from './components/chrome/Footer';
import ListingsPage from '@/pages/ListingsPage';
import ListingDetails from './pages/ListingDetails';
import GuestBooking from './pages/GuestBooking';
import BookingSummary from './pages/BookingSummary';
import BookingConfirmation from './pages/BookingConfirmation';
import SafetyProtocols from './pages/SafetyProtocols';

export default function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/listings" replace />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/guest-booking" element={<GuestBooking />} />
        <Route path="/booking/summary" element={<BookingSummary />} />
        <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        <Route path="/safety-protocols" element={<SafetyProtocols />} />
      </Routes>
      <Footer />
    </>
  );
}
