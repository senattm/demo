import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import SearchModal from "./SearchModal";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalFavorites = useFavoritesStore((state) => state.favorites.length);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false);
    };

    if (isUserMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Mağaza", path: "/shop" },
    { name: "İletişim", path: "#iletisim" },
  ];

  const handleNavClick = (path: string) => {
    if (path === "#iletisim") {
      if (window.location.pathname === "/") {
        const element = document.getElementById("iletisim");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById("iletisim");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center">
            <h1
              className={`font-display text-2xl lg:text-3xl tracking-wider transition-colors ${
                isScrolled || !isHomePage ? "text-black" : "text-white"
              }`}
            >
              ELEGĀNT
            </h1>
          </button>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`font-body text-sm tracking-widest uppercase transition-colors hover:text-primary-gold ${
                  isScrolled || !isHomePage ? "text-black" : "text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Search, User, Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`transition-colors ${
                isScrolled || !isHomePage
                  ? "text-black hover:text-primary-gold"
                  : "text-white hover:text-primary-gold"
              }`}
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>

            {/* User Icon */}
            <div className="relative hidden md:block">
              {user.isAuthenticated ? (
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }}
                    className={`transition-colors ${
                      isScrolled || !isHomePage
                        ? "text-black hover:text-primary-gold"
                        : "text-white hover:text-primary-gold"
                    }`}
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="font-body text-sm font-semibold text-black">
                          {user.name}
                        </p>
                        <p className="font-body text-xs text-gray-600">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 font-body text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Profilim
                      </button>
                      <button
                        onClick={() => {
                          navigate("/orders");
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 font-body text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Siparişlerim
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                          navigate("/");
                        }}
                        className="w-full text-left px-4 py-2 font-body text-sm text-gray-700 hover:bg-gray-100 transition-colors border-t border-gray-200"
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/auth")}
                  className={`transition-colors ${
                    isScrolled || !isHomePage
                      ? "text-black hover:text-primary-gold"
                      : "text-white hover:text-primary-gold"
                  }`}
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Favorites Icon */}
            <button
              onClick={() => navigate("/favorites")}
              className={`relative transition-colors ${
                isScrolled || !isHomePage
                  ? "text-black hover:text-pink-500"
                  : "text-white hover:text-pink-300"
              }`}
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              {totalFavorites > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-body font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalFavorites}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => navigate("/cart")}
              className={`relative transition-colors ${
                isScrolled || !isHomePage
                  ? "text-black hover:text-primary-gold"
                  : "text-white hover:text-primary-gold"
              }`}
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
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-gold text-black text-xs font-body font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden transition-colors ${
                isScrolled || !isHomePage ? "text-black" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-6 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      handleNavClick(link.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-body text-sm tracking-widest uppercase transition-colors hover:text-primary-gold text-left ${
                      isScrolled || !isHomePage ? "text-black" : "text-white"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}

                <button
                  onClick={() => {
                    navigate("/favorites");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`font-body text-sm tracking-widest uppercase transition-colors hover:text-primary-gold text-left flex items-center gap-2 ${
                    isScrolled || !isHomePage ? "text-black" : "text-white"
                  }`}
                >
                  <span>Favorilerim</span>
                  {totalFavorites > 0 && (
                    <span className="bg-pink-500 text-white text-xs font-body font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalFavorites}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    navigate("/cart");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`font-body text-sm tracking-widest uppercase transition-colors hover:text-primary-gold text-left flex items-center gap-2 ${
                    isScrolled || !isHomePage ? "text-black" : "text-white"
                  }`}
                >
                  <span>Sepetim</span>
                  {totalItems > 0 && (
                    <span className="bg-primary-gold text-black text-xs font-body font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </motion.nav>
  );
};

export default Navbar;
