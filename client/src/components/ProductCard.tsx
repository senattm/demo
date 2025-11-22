import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import QuickAddModal from "./QuickAddModal";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();
  const isInFavorites = isFavorite(product.id);

  const handleAddToCart = (size: string, color: string, quantity: number) => {
    addItem(product, quantity, size, color);
    addNotification(`${product.name} sepete eklendi! 🛍️`, "success");
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInFavorites) {
      removeFromFavorites(product.id);
      addNotification(`${product.name} favorilerden çıkarıldı`, "info");
    } else {
      addToFavorites(product);
      addNotification(`${product.name} favorilere eklendi! 💜`, "success");
    }
  };

  return (
    <>
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

          <motion.button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-10 hover:scale-110 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
              initial={false}
              animate={{
                fill: isInFavorites ? "#ec4899" : "none",
                stroke: isInFavorites ? "#ec4899" : "#000",
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
          </motion.button>

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

          <div className="flex items-center justify-between gap-2">
            <p className="font-body text-lg font-semibold text-black">
              ₺{product.price.toFixed(2)}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (product.inStock) {
                  setIsModalOpen(true);
                }
              }}
              disabled={!product.inStock}
              className={`px-6 py-2 font-body font-medium text-sm transition-all whitespace-nowrap ${
                product.inStock
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.inStock ? "Sepete Ekle" : "Stokta Yok"}
            </button>
          </div>
        </div>
      </motion.div>

      <QuickAddModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductCard;
