import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-display text-3xl tracking-wider mb-4">
              ELEGĀNT
            </h2>
            <p className="font-body text-gray-400 max-w-md">
              Zamansız zarafeti ve sofistike stili keşfedin. İnce zevklere sahip
              olanlar için premium moda.
            </p>
          </div>

          <div>
            <h3 className="font-body font-semibold text-lg mb-4 tracking-wider">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="font-body text-gray-400 hover:text-primary-gold transition-colors"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="font-body text-gray-400 hover:text-primary-gold transition-colors"
                >
                  Mağaza
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-body text-gray-400 hover:text-primary-gold transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-body text-gray-400 hover:text-primary-gold transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-body font-semibold text-lg mb-4 tracking-wider">
              İletişim
            </h3>
            <ul className="space-y-2 font-body text-gray-400">
              <li>destek@elegant.com</li>
              <li>+90 (555) 123-4567</li>
              <li className="pt-4">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="hover:text-primary-gold transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="hover:text-primary-gold transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="font-body text-gray-400 text-sm">
            © {new Date().getFullYear()} ELEGĀNT. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
