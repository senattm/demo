import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {product.featured && (
          <div className="absolute top-4 left-4 bg-primary-gold text-black px-3 py-1 text-xs font-body font-semibold tracking-wider">
            ÖNE ÇIKAN
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-body text-sm tracking-widest">
              STOKTA YOK
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="font-display text-lg text-black group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 font-body uppercase tracking-wider">
          {product.category}
        </p>

        <p className="font-body text-lg font-semibold text-black">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
