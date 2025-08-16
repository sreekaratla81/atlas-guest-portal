import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingSummary from './pages/BookingSummary';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking/summary" element={<BookingSummary />} />
    </Routes>
  );
}
