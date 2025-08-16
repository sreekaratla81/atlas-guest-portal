import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactStrip from './components/shared/ContactStrip';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <ContactStrip />
    </>
  );
}
