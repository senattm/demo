import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import Button from "@/components/Button";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    login({
      ...user,
      name: formData.name,
      email: formData.email,
    });
    addNotification("Profil bilgileriniz güncellendi!", "success");
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

                <div>
                  <label className="block font-body text-sm mb-2 text-gray-700">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                    placeholder="5321234567"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm mb-2 text-gray-700">
                    Adres
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Adresinizi giriniz"
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
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

