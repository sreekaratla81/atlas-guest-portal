import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactStrip from './components/shared/ContactStrip';
import Header from './components/chrome/Header';
import Footer from './components/chrome/Footer';

export default function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
      <ContactStrip />
    </>
  );
}
