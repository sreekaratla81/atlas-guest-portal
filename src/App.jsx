import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GuestBooking from './pages/GuestBooking';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import Header from './components/chrome/Header';
import Footer from './components/chrome/Footer';

function App() {
    return (
        <>
            <Header />
            <main className="container my-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/listings" element={<Listings />} />
                    <Route path="/listings/:id" element={<ListingDetails />} />
                    <Route path="/guest-booking" element={<GuestBooking />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
