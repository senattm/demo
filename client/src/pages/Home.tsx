import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
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
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
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

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80"
                alt="Hakkımızda"
                className="w-full h-[600px] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-5xl text-black mb-6">
                Lüksü Yeniden Tanımlıyoruz
              </h2>
              <p className="font-body text-gray-700 text-lg mb-6 leading-relaxed">
                ZARAFET'te gerçek lüksün detaylarda gizli olduğuna inanıyoruz. Koleksiyonumuzdaki her parça,
                sofistikeliği, kaliteyi ve zamansız stili yansıtmak için özenle seçilmiştir.
              </p>
              <p className="font-body text-gray-700 text-lg mb-8 leading-relaxed">
                İtalyan terzilikten Fransız couture'üne kadar, küresel zanaat ağımız her giysi parçasının 
                en yüksek işçilik standartlarını karşılamasını sağlar.
              </p>
              <Button variant="primary" size="lg" onClick={() => navigate('/about')}>
                Hikayemiz
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
