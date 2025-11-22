import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Skeleton';
import Button from '@/components/Button';
import { productApi } from '@/api/client';
import { Product } from '@/types';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await productApi.getFeatured();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Öne çıkan ürünler yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />

      {/* İlk Sipariş İndirim Bilgilendirmesi */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-black text-white py-3"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="font-body text-sm tracking-wide">
            İlk alışverişinizde{' '}
            <span className="font-semibold border-b border-white/50">İLK10</span>{' '}
            koduyla{' '}
            <span className="font-semibold">%10 indirim</span>{' '}
            kazanın
          </p>
        </div>
      </motion.div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl text-black mb-4">
              Öne Çıkan Koleksiyon
            </h2>
            <p className="font-body text-gray-600 text-lg max-w-2xl mx-auto">
              Zamansız zarafeti ve çağdaş sofistikeliği bünyesinde barındıran özenle seçilmiş parçalar
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[...Array(4)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/shop')}
            >
              Tüm Koleksiyonu Görüntüle
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
