import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/constants";
import Button from "@/components/Button";

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const navigate = useNavigate();
  const [confirmRemove, setConfirmRemove] = useState<{
    productId: string;
    productName: string;
  } | null>(null);

  const totalPrice = getTotalPrice();
  const shippingCost =
    totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const handleUpdateQuantity = (
    productId: string,
    currentQuantity: number,
    productName: string
  ) => {
    const newQuantity = currentQuantity - 1;

    if (newQuantity === 0) {
      setConfirmRemove({ productId, productName });
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleConfirmRemove = () => {
    if (confirmRemove) {
      removeItem(confirmRemove.productId);
      addNotification(
        `${confirmRemove.productName} sepetten kaldırıldı`,
        "info"
      );
      setConfirmRemove(null);
    }
  };

  const handleCancelRemove = () => {
    setConfirmRemove(null);
  };

  const handleClearCart = () => {
    clearCart();
    addNotification("Sepet temizlendi", "warning");
  };

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

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product.id,
                          item.quantity,
                          item.product.name
                        )
                      }
                      className="w-8 h-8 border border-black flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
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
                    ₺{totalPrice.toLocaleString("tr-TR")}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Kargo</span>
                    <span
                      className={`font-semibold ${
                        shippingCost === 0 ? "text-green-600" : ""
                      }`}
                    >
                      {shippingCost === 0
                        ? "ÜCRETSİZ"
                        : `₺${shippingCost.toLocaleString("tr-TR")}`}
                    </span>
                  </div>
                  {totalPrice < FREE_SHIPPING_THRESHOLD && (
                    <p className="text-xs text-gray-500 mt-1">
                      ₺
                      {(FREE_SHIPPING_THRESHOLD - totalPrice).toLocaleString(
                        "tr-TR"
                      )}{" "}
                      daha alışveriş yapın, kargo ücretsiz!
                    </p>
                  )}
                  {totalPrice >= FREE_SHIPPING_THRESHOLD && (
                    <p className="text-xs text-green-600 mt-1">
                      ₺2.000 üstü ücretsiz kargo
                    </p>
                  )}
                </div>
                <div className="border-t pt-4 flex justify-between text-xl">
                  <span className="font-semibold">Toplam</span>
                  <span className="font-semibold">
                    ₺{(totalPrice + shippingCost).toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="mb-4"
                onClick={() => navigate("/checkout")}
              >
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
                onClick={handleClearCart}
                className="w-full mt-4 font-body text-sm text-gray-600 hover:text-black transition-colors"
              >
                Sepeti Temizle
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmRemove && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-30"
              onClick={handleCancelRemove}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white p-6 max-w-sm w-full shadow-xl z-10"
            >
              <h3 className="font-display text-xl text-black mb-3 text-center">
                Ürünü kaldırmak istediğinize emin misiniz?
              </h3>

              <p className="font-body text-sm text-gray-600 mb-6 text-center">
                {confirmRemove.productName}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelRemove}
                  className="flex-1 px-4 py-2.5 border border-black font-body text-sm text-black hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleConfirmRemove}
                  className="flex-1 px-4 py-2.5 bg-black font-body text-sm text-white hover:bg-gray-800 transition-colors"
                >
                  Kaldır
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
