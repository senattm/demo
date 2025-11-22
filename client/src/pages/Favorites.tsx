import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import ProductCard from '@/components/ProductCard';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl text-black mb-4">
            Favorilerim
          </h1>
          <p className="font-body text-gray-600 text-lg">
            Beğendiğiniz ürünler burada
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-24 h-24 mx-auto text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <h2 className="font-display text-3xl text-black mb-4">
              Favori ürününüz yok
            </h2>
            <p className="font-body text-gray-600 mb-8">
              Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca
              bulabilirsiniz
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="font-body px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Alışverişe Başla
            </button>
          </motion.div>
        ) : (
          <>
            <div className="mb-8">
              <p className="font-body text-gray-600">
                {favorites.length} favori ürün
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {favorites.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;

