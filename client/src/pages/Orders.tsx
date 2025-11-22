import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { useOrderStore } from "@/store/useOrderStore";
import Button from "@/components/Button";

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const getOrdersByUserId = useOrderStore((state) => state.getOrdersByUserId);

  if (!user.isAuthenticated || !user.id) {
    navigate("/auth");
    return null;
  }

  const orders = getOrdersByUserId(user.id);

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Beklemede";
      case "processing":
        return "Hazırlanıyor";
      case "shipped":
        return "Kargoya Verildi";
      case "delivered":
        return "Teslim Edildi";
      case "cancelled":
        return "İptal Edildi";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (orders.length === 0) {
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
                Siparişlerim
              </h1>
              <p className="font-body text-gray-600 mb-8">
                Henüz bir siparişiniz bulunmuyor
              </p>
              <Button onClick={() => navigate("/shop")}>
                Alışverişe Başla
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl text-black mb-8">
            Siparişlerim
          </h1>

          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="font-body font-semibold text-lg text-black">
                      Sipariş #{order.orderNumber}
                    </p>
                    <p className="font-body text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span
                    className={`inline-block px-4 py-2 rounded-full font-body text-sm font-semibold mt-2 md:mt-0 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div className="space-y-4 mb-4">
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex gap-4 items-center"
                    >
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-body font-semibold text-black">
                          {item.productName}
                        </p>
                        <p className="font-body text-sm text-gray-600">
                          Beden: {item.size} | Renk: {item.color} | Adet: {item.quantity}
                        </p>
                        <p className="font-body text-sm font-semibold text-black">
                          ₺{(item.price * item.quantity).toLocaleString("tr-TR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-body text-sm mb-2">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span>₺{order.totalAmount.toLocaleString("tr-TR")}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm mb-2">
                    <span className="text-gray-600">Kargo</span>
                    <span>
                      {order.shippingCost === 0
                        ? "ÜCRETSİZ"
                        : `₺${order.shippingCost.toLocaleString("tr-TR")}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-body text-lg font-bold border-t border-gray-200 pt-2 mt-2">
                    <span>Toplam</span>
                    <span>
                      ₺{(order.totalAmount + order.shippingCost).toLocaleString("tr-TR")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-body text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Teslimat Adresi:</span>
                  </p>
                  <p className="font-body text-sm text-gray-800">
                    {order.customerInfo.firstName} {order.customerInfo.lastName}
                    <br />
                    {order.customerInfo.address}
                    <br />
                    {order.customerInfo.phone}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;

