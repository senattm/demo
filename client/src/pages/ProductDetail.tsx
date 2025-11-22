import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productApi } from '@/api/client';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import Button from '@/components/Button';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const data = await productApi.getById(id);
        setProduct(data);
        setSelectedSize(data.sizes[0] || '');
        setSelectedColor(data.colors[0] || '');
      } catch (error) {
        console.error('Ürün yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem(product, quantity, selectedSize, selectedColor);
    addNotification(`${product.name} sepete eklendi! 🛍️`, 'success');
  };

  const handleToggleFavorite = () => {
    if (!product) return;

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      addNotification(`${product.name} favorilerden çıkarıldı`, 'info');
    } else {
      addToFavorites(product);
      addNotification(`${product.name} favorilere eklendi! 💜`, 'success');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl text-black mb-4">Ürün Bulunamadı</h2>
          <Button onClick={() => navigate('/shop')}>Mağazaya Dön</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <button
          onClick={() => navigate('/shop')}
          className="font-body text-sm text-gray-600 hover:text-black mb-8 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Mağazaya Dön
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-black' : ''
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl text-black mb-4">
              {product.name}
            </h1>

            <p className="font-body text-3xl text-black mb-6">
              ₺{product.price.toFixed(2)}
            </p>

            <p className="font-body text-gray-700 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">
              <p className="font-body font-semibold text-black mb-2">Malzeme</p>
              <p className="font-body text-gray-700">{product.material}</p>
            </div>

            <div className="mb-6">
              <p className="font-body font-semibold text-black mb-3">Beden</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    type="button"
                    className={`font-body px-6 py-3 border-2 transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-black hover:border-black hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-body font-semibold text-black mb-3">Renk</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    type="button"
                    className={`font-body px-6 py-3 border-2 transition-all cursor-pointer ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-black hover:border-black hover:bg-gray-50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="font-body font-semibold text-black mb-3">Adet</p>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer font-semibold"
                >
                  -
                </button>
                <span className="font-body text-lg w-12 text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
              </Button>

              <motion.button
                onClick={handleToggleFavorite}
                className={`w-full py-4 border-2 rounded font-body font-medium flex items-center justify-center gap-2 transition-all ${
                  isFavorite(product.id)
                    ? 'border-pink-500 bg-pink-50 text-pink-600'
                    : 'border-gray-300 text-black hover:border-pink-500 hover:text-pink-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  initial={false}
                  animate={{
                    fill: isFavorite(product.id) ? "#ec4899" : "none",
                    stroke: isFavorite(product.id) ? "#ec4899" : "currentColor",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </motion.svg>
                {isFavorite(product.id) ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
