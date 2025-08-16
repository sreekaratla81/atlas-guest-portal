import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingSummary from './pages/BookingSummary';
import BookingConfirmation from './pages/BookingConfirmation';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking/summary" element={<BookingSummary />} />
      <Route path="/booking/confirmation" element={<BookingConfirmation />} />
    </Routes>
  );
}
