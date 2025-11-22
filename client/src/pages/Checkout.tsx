import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useCouponStore } from "@/store/useCouponStore";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/constants";
import Button from "@/components/Button";

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const user = useUserStore((state) => state.user);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const { addOrder, orders } = useOrderStore();
  const { firstOrderDiscount, applyFirstOrderDiscount, removeDiscount, getDiscount } = useCouponStore();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [useNewAddress, setUseNewAddress] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  
  const userOrders = orders.filter((order) => order.userId === user.id);
  const hasOrders = userOrders.length > 0;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountry: "+90",
    phone: "",
    address: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const phoneCountries = [
    { code: "+90", country: "Türkiye", length: 10, format: "532 123 45 67" },
    { code: "+1", country: "ABD/Kanada", length: 10, format: "555 123 4567" },
    { code: "+44", country: "İngiltere", length: 10, format: "7400 123456" },
    { code: "+49", country: "Almanya", length: 10, format: "151 12345678" },
    { code: "+33", country: "Fransa", length: 9, format: "6 12 34 56 78" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    } else if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "");
    } else if (name === "phone") {
      const cleanValue = value.replace(/\D/g, "");
      if (formData.phoneCountry === "+90") {
        if (cleanValue.length <= 3) {
          formattedValue = cleanValue;
        } else if (cleanValue.length <= 6) {
          formattedValue = `${cleanValue.slice(0, 3)} ${cleanValue.slice(3)}`;
        } else if (cleanValue.length <= 8) {
          formattedValue = `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6)}`;
        } else {
          formattedValue = `${cleanValue.slice(0, 3)} ${cleanValue.slice(3, 6)} ${cleanValue.slice(6, 8)} ${cleanValue.slice(8, 10)}`;
        }
      } else {
        formattedValue = cleanValue;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCardNumber = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s/g, "");
    return cleanNumber.length === 16 && /^\d+$/.test(cleanNumber);
  };

  const validateExpiryDate = (date: string) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) return false;
    
    const [month, year] = date.split("/").map(Number);
    if (month < 1 || month > 12) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
  };

  const validateCVV = (cvv: string) => {
    return cvv.length === 3 && /^\d+$/.test(cvv);
  };

  const validatePhone = (phone: string, countryCode: string) => {
    const country = phoneCountries.find((c) => c.code === countryCode);
    if (!country) return false;
    
    const cleanPhone = phone.replace(/\s/g, "");
    
    if (countryCode === "+90") {
      return cleanPhone.length === 10 && /^5\d{9}$/.test(cleanPhone);
    }
    
    return cleanPhone.length === country.length && /^\d+$/.test(cleanPhone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!useNewAddress && !selectedAddressId && user.addresses && user.addresses.length > 0) {
      addNotification("Lütfen bir teslimat adresi seçin", "error");
      return;
    }
    
    if (!validateEmail(formData.email)) {
      addNotification("Geçerli bir e-posta adresi giriniz", "error");
      return;
    }

    if (!validatePhone(formData.phone, formData.phoneCountry)) {
      const country = phoneCountries.find((c) => c.code === formData.phoneCountry);
      if (formData.phoneCountry === "+90") {
        addNotification("Türkiye için telefon numarası 5 ile başlamalı ve 10 haneli olmalıdır", "error");
      } else {
        addNotification(`Telefon numarası ${country?.length} haneli olmalıdır`, "error");
      }
      return;
    }

    if (!validateCardNumber(formData.cardNumber)) {
      addNotification("Geçerli bir kart numarası giriniz (16 hane)", "error");
      return;
    }

    if (!validateExpiryDate(formData.expiryDate)) {
      addNotification("Geçerli bir son kullanma tarihi giriniz (AA/YY)", "error");
      return;
    }

    if (!validateCVV(formData.cvv)) {
      addNotification("CVV 3 haneli olmalıdır", "error");
      return;
    }
    
    let deliveryAddress = formData.address;
    
    if (!useNewAddress && selectedAddressId) {
      const selectedAddress = user.addresses?.find((addr) => addr.id === selectedAddressId);
      if (selectedAddress) {
        deliveryAddress = `${selectedAddress.address}, ${selectedAddress.district}, ${selectedAddress.city} ${selectedAddress.postalCode}`;
      }
    }

    const orderNumber = `ORD-${Date.now()}`;
    const order = {
      id: Math.random().toString(36).substring(7),
      orderNumber,
      userId: user.id || "guest",
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        size: item.selectedSize,
        color: item.selectedColor,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: totalPrice,
      shippingCost,
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: `${formData.phoneCountry} ${formData.phone}`,
        address: deliveryAddress,
      },
      status: "pending" as const,
      createdAt: new Date(),
    };

    addOrder(order);
    addNotification("Siparişiniz başarıyla oluşturuldu!", "success");
    clearCart();
    removeDiscount();
    
    setTimeout(() => {
      if (user.isAuthenticated) {
        navigate("/orders");
      } else {
        navigate("/");
      }
    }, 2000);
  };

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      addNotification("Lütfen bir indirim kodu giriniz", "error");
      return;
    }

    const result = applyFirstOrderDiscount(discountCode.trim(), hasOrders);
    
    if (result.success) {
      addNotification(result.message, "success");
      setDiscountCode("");
    } else {
      addNotification(result.message, "error");
    }
  };

  const handleRemoveDiscount = () => {
    removeDiscount();
    addNotification("İndirim kodu kaldırıldı", "info");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const totalPrice = getTotalPrice();
  const discount = getDiscount(totalPrice);
  const subtotalAfterDiscount = totalPrice - discount;
  const shippingCost = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = subtotalAfterDiscount + shippingCost;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl text-black mb-8">Ödeme</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="font-body font-semibold text-xl mb-4">İletişim Bilgileri</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm mb-2 text-gray-700">Ad</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm mb-2 text-gray-700">Soyad</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block font-body text-sm mb-2 text-gray-700">E-posta</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="ornek@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm mb-2 text-gray-700">Telefon</label>
                      <div className="flex gap-2">
                        <select
                          name="phoneCountry"
                          value={formData.phoneCountry}
                          onChange={handleInputChange}
                          className="px-3 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors bg-white min-w-[100px]"
                        >
                          {phoneCountries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.code} {country.country}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          maxLength={15}
                          placeholder={phoneCountries.find((c) => c.code === formData.phoneCountry)?.format || ""}
                          inputMode="numeric"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-body font-semibold text-xl mb-4">Teslimat Adresi</h2>
                  
                  {user.isAuthenticated && user.addresses && user.addresses.length > 0 && (
                    <div className="mb-6">
                      <div className="flex gap-4 mb-4">
                        <button
                          type="button"
                          onClick={() => setUseNewAddress(false)}
                          className={`flex-1 px-4 py-3 border-2 font-body transition-all ${
                            !useNewAddress
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          Kayıtlı Adreslerim
                        </button>
                        <button
                          type="button"
                          onClick={() => setUseNewAddress(true)}
                          className={`flex-1 px-4 py-3 border-2 font-body transition-all ${
                            useNewAddress
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          Yeni Adres Kullan
                        </button>
                      </div>

                      {!useNewAddress && (
                        <div className="space-y-3 mb-4">
                          {user.addresses.map((address) => (
                            <div
                              key={address.id}
                              onClick={() => setSelectedAddressId(address.id)}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedAddressId === address.id
                                  ? 'border-black bg-gray-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-body font-semibold flex items-center gap-2 mb-1">
                                    {address.title}
                                    {address.isDefault && (
                                      <span className="text-xs bg-black text-white px-2 py-0.5 rounded">
                                        Varsayılan
                                      </span>
                                    )}
                                  </h3>
                                  <p className="font-body text-sm text-gray-600 mb-1">{address.fullName}</p>
                                  <p className="font-body text-sm text-gray-700">{address.address}</p>
                                  <p className="font-body text-sm text-gray-700">
                                    {address.district} / {address.city} - {address.postalCode}
                                  </p>
                                  <p className="font-body text-sm font-semibold mt-1">{address.phone}</p>
                                </div>
                                <div className="flex-shrink-0 ml-3">
                                  <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                      selectedAddressId === address.id
                                        ? 'border-black bg-black'
                                        : 'border-gray-300'
                                    }`}
                                  >
                                    {selectedAddressId === address.id && (
                                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                                        <path d="M4.5 9L1.5 6l1-1 2 2 4-4 1 1-5 5z" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {(useNewAddress || !user.isAuthenticated || !user.addresses || user.addresses.length === 0) && (
                    <div>
                      <label className="block font-body text-sm mb-2 text-gray-700">Adres</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required={useNewAddress || !user.isAuthenticated || !user.addresses || user.addresses.length === 0}
                        rows={4}
                        placeholder="Tam adresinizi giriniz (Sokak, Mahalle, İlçe, Şehir vb.)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors resize-none"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="font-body font-semibold text-xl mb-4">Ödeme Bilgileri</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-body text-sm mb-2 text-gray-700">Kart Üzerindeki İsim</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm mb-2 text-gray-700">Kart Numarası</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        autoComplete="cc-number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-sm mb-2 text-gray-700">Son Kullanma Tarihi</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          placeholder="AA/YY"
                          maxLength={5}
                          autoComplete="cc-exp"
                          inputMode="numeric"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-sm mb-2 text-gray-700">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength={3}
                          placeholder="123"
                          autoComplete="cc-csc"
                          inputMode="numeric"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/cart")}
                  >
                    Sepete Dön
                  </Button>
                  <Button type="submit">
                    Siparişi Tamamla
                  </Button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h2 className="font-body font-semibold text-xl mb-4">Sipariş Özeti</h2>
                <div className="space-y-4 mb-4">
                  {items.map((item, index) => (
                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex gap-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded border border-gray-200"
                      />
                      <div className="flex-1">
                        <p className="font-body text-sm font-semibold">{item.product.name}</p>
                        <p className="font-body text-xs text-gray-600">
                          Beden: {item.selectedSize} | Renk: {item.selectedColor}
                        </p>
                        <p className="font-body text-xs text-gray-600">Adet: {item.quantity}</p>
                      </div>
                      <p className="font-body text-sm font-semibold">
                        ₺{(item.product.price * item.quantity).toLocaleString("tr-TR")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* İndirim Kodu */}
                <div className="border-t border-gray-300 mt-6 pt-6">
                  {!firstOrderDiscount.isApplied ? (
                    <div>
                      <label className="block font-body text-sm font-semibold mb-2">
                        İndirim Kodu
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                          placeholder="İLK10"
                          className="flex-1 px-4 py-2.5 border border-gray-300 font-body text-sm focus:outline-none focus:border-black transition-colors uppercase"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleApplyDiscount();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleApplyDiscount}
                          className="px-6 py-2.5 bg-black text-white font-body text-sm hover:bg-gray-800 transition-colors whitespace-nowrap"
                        >
                          Uygula
                        </button>
                      </div>
                      {!hasOrders && (
                        <p className="font-body text-xs text-purple-600 mt-2">
                          💡 İlk alışverişinizde <span className="font-semibold">İLK10</span> koduyla %10 indirim kazanın
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-body text-sm font-semibold text-purple-900">
                            🎉 İlk Sipariş İndirimi Uygulandı
                          </p>
                          <p className="font-body text-xs text-purple-700 mt-1">
                            {firstOrderDiscount.code} - %{firstOrderDiscount.discount} indirim
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveDiscount}
                          className="text-red-600 hover:text-red-700 font-body text-sm underline"
                        >
                          Kaldır
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-300 mt-6 pt-6 space-y-3">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span>₺{totalPrice.toLocaleString("tr-TR")}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-purple-600">İlk Sipariş İndirimi (%{firstOrderDiscount.discount})</span>
                      <span className="text-purple-600 font-semibold">-₺{discount.toLocaleString("tr-TR")}</span>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-gray-600">Kargo</span>
                      <span className={shippingCost === 0 ? "text-green-600 font-semibold" : ""}>
                        {shippingCost === 0 ? "ÜCRETSİZ" : `₺${shippingCost.toLocaleString("tr-TR")}`}
                      </span>
                    </div>
                    {subtotalAfterDiscount < FREE_SHIPPING_THRESHOLD && (
                      <p className="font-body text-xs text-gray-500 mt-1">
                        ₺{(FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount).toLocaleString("tr-TR")} daha alışveriş yapın, kargo ücretsiz olsun!
                      </p>
                    )}
                    {subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD && (
                      <p className="font-body text-xs text-green-600 mt-1">
                        ₺2.000 üstü ücretsiz kargo
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between font-body text-lg font-bold border-t border-gray-300 pt-3">
                    <span>Toplam</span>
                    <span>₺{finalTotal.toLocaleString("tr-TR")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;

