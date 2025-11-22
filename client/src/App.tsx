import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatButton from '@/components/ChatButton';
import Notification from '@/components/Notification';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Orders from '@/pages/Orders';
import Favorites from '@/pages/Favorites';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Notification />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/favorites" element={<Favorites />} />
            
            {/* Placeholder routes */}
            <Route path="/contact" element={
              <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="font-display text-5xl text-black mb-4">İletişim</h1>
                  <p className="font-body text-gray-600">Çok Yakında</p>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
        <ChatButton />
      </div>
    </Router>
  );
};

export default App;

