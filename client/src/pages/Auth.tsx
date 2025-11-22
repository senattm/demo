import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import Button from "@/components/Button";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      addNotification("Geçerli bir e-posta adresi giriniz", "error");
      return;
    }

    if (formData.password.length < 6) {
      addNotification("Şifre en az 6 karakter olmalıdır", "error");
      return;
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        addNotification("Şifreler eşleşmiyor", "error");
        return;
      }

      if (!formData.name.trim()) {
        addNotification("Ad Soyad giriniz", "error");
        return;
      }
    }

    login({
      id: Math.random().toString(36).substring(7),
      name: formData.name || formData.email.split("@")[0],
      email: formData.email,
      isAuthenticated: true,
    });

    addNotification(
      isLogin ? "Başarıyla giriş yapıldı!" : "Hesabınız oluşturuldu!",
      "success"
    );
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <h1 className="font-display text-4xl text-black mb-8 text-center">
            {isLogin ? "Giriş Yap" : "Üye Ol"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block font-body text-sm mb-2 text-gray-700">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                  placeholder="Adınız Soyadınız"
                />
              </div>
            )}

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
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label className="block font-body text-sm mb-2 text-gray-700">
                Şifre
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                placeholder="En az 6 karakter"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block font-body text-sm mb-2 text-gray-700">
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body focus:outline-none focus:border-black transition-colors"
                  placeholder="Şifrenizi tekrar giriniz"
                />
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth>
              {isLogin ? "Giriş Yap" : "Üye Ol"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className="font-body text-sm text-gray-600 hover:text-black transition-colors"
            >
              {isLogin
                ? "Hesabınız yok mu? Üye Ol"
                : "Zaten hesabınız var mı? Giriş Yap"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;

