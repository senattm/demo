import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import Button from "./Button";

interface QuickAddModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (size: string, color: string, quantity: number) => void;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(selectedSize, selectedColor, quantity);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-[101]"
        >
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover rounded"
                  />
                </div>

                <div className="flex flex-col">
                  <button
                    onClick={onClose}
                    className="self-end text-gray-500 hover:text-black transition-colors mb-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <h2 className="font-display text-2xl text-black mb-2">
                    {product.name}
                  </h2>

                  <p className="font-body text-2xl font-semibold text-black mb-6">
                    ₺{product.price.toLocaleString("tr-TR")}
                  </p>

                  <div className="mb-4">
                    <p className="font-body font-semibold text-black mb-2">
                      Beden
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`font-body px-4 py-2 border-2 transition-all cursor-pointer ${
                            selectedSize === size
                              ? "border-black bg-black text-white"
                              : "border-gray-300 text-black hover:border-black hover:bg-gray-50"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-body font-semibold text-black mb-2">
                      Renk
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`font-body px-4 py-2 border-2 transition-all cursor-pointer ${
                            selectedColor === color
                              ? "border-black bg-black text-white"
                              : "border-gray-300 text-black hover:border-black hover:bg-gray-50"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="font-body font-semibold text-black mb-2">
                      Adet
                    </p>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer font-semibold"
                      >
                        -
                      </button>
                      <span className="font-body text-lg w-12 text-center font-semibold">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleAddToCart}
                  >
                    Sepete Ekle
                  </Button>
                </div>
              </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickAddModal;

