import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import Button from "@/components/Button";

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl text-black mb-4">
                Sepetiniz Boş
              </h1>
              <p className="font-body text-gray-600 mb-8">
                Göz alıcı koleksiyonumuzu keşfedin ve size hitap eden parçaları
                bulun
              </p>
              <Button onClick={() => navigate("/shop")}>
                Alışverişe Devam Et
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl text-black mb-12"
        >
          Alışveriş Sepeti
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 border-b pb-6"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-32 h-40 object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${item.product.id}`)}
                />

                <div className="flex-1">
                  <h3
                    className="font-display text-xl text-black mb-2 cursor-pointer hover:text-gray-700"
                    onClick={() => navigate(`/product/${item.product.id}`)}
                  >
                    {item.product.name}
                  </h3>

                  <p className="font-body text-gray-600 text-sm mb-2">
                    Beden: {item.selectedSize} | Renk: {item.selectedColor}
                  </p>

                  <p className="font-body text-lg font-semibold text-black mb-4">
                    ₺{item.product.price.toFixed(2)}
                  </p>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="font-body w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="font-body text-sm text-red-600 hover:text-red-700 transition-colors"
                    >
                      Kaldır
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-body text-xl font-semibold text-black">
                    ₺{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 p-8 sticky top-24">
              <h2 className="font-display text-2xl text-black mb-6">
                Sipariş Özeti
              </h2>

              <div className="space-y-4 mb-6 font-body">
                <div className="flex justify-between">
                  <span className="text-gray-700">Ara Toplam</span>
                  <span className="font-semibold">
                    ₺{getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Kargo</span>
                  <span className="font-semibold">ÜCRETSİZ</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl">
                  <span className="font-semibold">Toplam</span>
                  <span className="font-semibold">
                    ₺{getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <Button variant="primary" size="lg" fullWidth className="mb-4">
                Ödemeye Geç
              </Button>

              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => navigate("/shop")}
              >
                Alışverişe Devam Et
              </Button>

              <button
                onClick={clearCart}
                className="w-full mt-4 font-body text-sm text-gray-600 hover:text-black transition-colors"
              >
                Sepeti Temizle
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
