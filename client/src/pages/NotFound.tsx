import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <h1 className="font-display text-[150px] md:text-[200px] leading-none text-black">
            404
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-display text-3xl md:text-4xl text-black mb-4"
        >
          Sayfa Bulunamadı
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-body text-gray-600 text-lg mb-8 leading-relaxed"
        >
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          <br />
          Lütfen URL'i kontrol edin veya ana sayfaya dönün.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/')}
          >
            Ana Sayfa
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/shop')}
          >
            Mağazaya Git
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="font-body text-sm text-gray-500">
            Yardıma mı ihtiyacınız var?{' '}
            <button
              onClick={() => navigate('/#iletisim')}
              className="underline hover:text-black transition-colors"
            >
              Bize ulaşın
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;

