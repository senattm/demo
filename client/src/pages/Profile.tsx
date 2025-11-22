import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Address } from "@/types";
import Button from "@/components/Button";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { updateUser, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useUserStore();
  const addNotification = useNotificationStore((state) => state.addNotification);

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState({
    title: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    isDefault: false,
  });

  if (!user.isAuthenticated) {
    navigate("/auth");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: formData.name,
      email: formData.email,
    });
    addNotification("Profil bilgileriniz güncellendi!", "success");
  };

  const handleOpenAddressModal = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({
        title: address.title,
        fullName: address.fullName,
        phone: address.phone,
        address: address.address,
        city: address.city,
        district: address.district,
        postalCode: address.postalCode,
        isDefault: address.isDefault,
      });
    } else {
      setEditingAddress(null);
      setAddressForm({
        title: "",
        fullName: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        postalCode: "",
        isDefault: false,
      });
    }
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
    setEditingAddress(null);
  };

  const handleAddressFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      updateAddress(editingAddress.id, {
        ...editingAddress,
        ...addressForm,
      });
      addNotification("Adres güncellendi", "success");
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        ...addressForm,
      };
      addAddress(newAddress);
      addNotification("Yeni adres eklendi", "success");
    }
    
    handleCloseAddressModal();
  };

  const handleDeleteAddress = (addressId: string) => {
    if (window.confirm("Bu adresi silmek istediğinize emin misiniz?")) {
      deleteAddress(addressId);
      addNotification("Adres silindi", "info");
    }
  };

  const handleSetDefault = (addressId: string) => {
    setDefaultAddress(addressId);
    addNotification("Varsayılan adres güncellendi", "success");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword.length < 6) {
      addNotification("Yeni şifre en az 6 karakter olmalıdır", "error");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification("Yeni şifreler eşleşmiyor", "error");
      return;
    }

    addNotification("Şifreniz başarıyla güncellendi!", "success");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl text-black mb-8">Profilim</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-body font-semibold text-xl mb-4">
                Kişisel Bilgiler
              </h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block font-body text-sm mb-2 text-gray-700">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm mb-2 text-gray-700">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <Button type="submit" variant="primary" size="md">
                  Bilgileri Güncelle
                </Button>
              </form>
            </div>

            <div>
              <h2 className="font-body font-semibold text-xl mb-4">
                Şifre Değiştir
              </h2>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block font-body text-sm mb-2 text-gray-700">
                    Mevcut Şifre
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm mb-2 text-gray-700">
                    Yeni Şifre
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                    placeholder="En az 6 karakter"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm mb-2 text-gray-700">
                    Yeni Şifre Tekrar
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <Button type="submit" variant="outline" size="md">
                  Şifre Değiştir
                </Button>
              </form>
            </div>
          </div>

          {/* Adres Yönetimi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-body font-semibold text-xl">Teslimat Adreslerim</h2>
              <Button variant="primary" size="sm" onClick={() => handleOpenAddressModal()}>
                + Yeni Adres Ekle
              </Button>
            </div>

            {!user.addresses || user.addresses.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="font-body text-gray-600 mb-4">Henüz kayıtlı adresiniz yok</p>
                <Button variant="outline" size="sm" onClick={() => handleOpenAddressModal()}>
                  İlk Adresinizi Ekleyin
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-6 border-2 rounded-lg transition-all ${
                      address.isDefault
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-body font-semibold text-lg flex items-center gap-2">
                          {address.title}
                          {address.isDefault && (
                            <span className="text-xs bg-black text-white px-2 py-1 rounded">
                              Varsayılan
                            </span>
                          )}
                        </h3>
                        <p className="font-body text-sm text-gray-600">{address.fullName}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-1 mb-4 font-body text-sm text-gray-700">
                      <p>{address.address}</p>
                      <p>{address.district} / {address.city}</p>
                      <p>{address.postalCode}</p>
                      <p className="font-semibold">{address.phone}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenAddressModal(address)}
                        className="flex-1 px-3 py-2 border border-black font-body text-sm hover:bg-black hover:text-white transition-colors"
                      >
                        Düzenle
                      </button>
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="flex-1 px-3 py-2 bg-gray-100 font-body text-sm hover:bg-gray-200 transition-colors"
                        >
                          Varsayılan Yap
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Adres Ekleme/Düzenleme Modalı */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={handleCloseAddressModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-2xl text-black">
                  {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                </h3>
                <button
                  onClick={handleCloseAddressModal}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div>
                  <label className="block font-body text-sm mb-2 text-gray-700">
                    Adres Başlığı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={addressForm.title}
                    onChange={handleAddressFormChange}
                    required
                    placeholder="Ev, İş, vb."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm mb-2 text-gray-700">
                      Ad Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={addressForm.fullName}
                      onChange={handleAddressFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm mb-2 text-gray-700">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={addressForm.phone}
                      onChange={handleAddressFormChange}
                      required
                      placeholder="5321234567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm mb-2 text-gray-700">
                    Adres <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={addressForm.address}
                    onChange={handleAddressFormChange}
                    required
                    rows={3}
                    placeholder="Mahalle, sokak, bina no, daire no"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-body text-sm mb-2 text-gray-700">
                      İl <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressFormChange}
                      required
                      placeholder="İstanbul"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm mb-2 text-gray-700">
                      İlçe <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={addressForm.district}
                      onChange={handleAddressFormChange}
                      required
                      placeholder="Kadıköy"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm mb-2 text-gray-700">
                      Posta Kodu <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={addressForm.postalCode}
                      onChange={handleAddressFormChange}
                      required
                      placeholder="34000"
                      maxLength={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={addressForm.isDefault}
                    onChange={handleAddressFormChange}
                    className="w-4 h-4 mr-2 cursor-pointer"
                  />
                  <label className="font-body text-sm text-gray-700 cursor-pointer">
                    Bu adresi varsayılan yap
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseAddressModal}
                    className="flex-1 px-4 py-3 border border-gray-300 font-body hover:border-black transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-black text-white font-body hover:bg-gray-800 transition-colors"
                  >
                    {editingAddress ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;

