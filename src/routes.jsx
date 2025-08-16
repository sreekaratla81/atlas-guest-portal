import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/chrome/Header';
import Footer from './components/chrome/Footer';
import ListingDetails from './pages/ListingDetails';
import SafetyProtocols from './pages/SafetyProtocols';

export default function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/safety" element={<SafetyProtocols />} />
      </Routes>
      <Footer />
    </>
  );
}
