import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatButton from '@/components/ChatButton';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Placeholder routes */}
            <Route path="/about" element={
              <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="font-display text-5xl text-black mb-4">Hakkımızda</h1>
                  <p className="font-body text-gray-600">Çok Yakında</p>
                </div>
              </div>
            } />
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

