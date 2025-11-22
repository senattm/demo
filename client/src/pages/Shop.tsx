import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Skeleton';
import { productApi } from '@/api/client';
import { Product } from '@/types';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = [
    { value: 'all', label: 'Tümü' },
    { value: 'suits', label: 'Takım Elbise' },
    { value: 'dresses', label: 'Elbise' },
    { value: 'shirts', label: 'Gömlek' },
    { value: 'accessories', label: 'Aksesuar' },
  ];

  const priceRanges = [
    { value: 'all', label: 'Tüm Fiyatlar', min: 0, max: Infinity },
    { value: '0-2000', label: '₺2.000 altı', min: 0, max: 2000 },
    { value: '2000-5000', label: '₺2.000 - ₺5.000', min: 2000, max: 5000 },
    { value: '5000-10000', label: '₺5.000 - ₺10.000', min: 5000, max: 10000 },
    { value: '10000-20000', label: '₺10.000 - ₺20.000', min: 10000, max: 20000 },
    { value: '20000+', label: '₺20.000 üstü', min: 20000, max: Infinity },
  ];

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38'];
  const allColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach((product) => {
      product.colors.forEach((color) => colors.add(color));
    });
    return Array.from(colors).sort();
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Ürünler yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Price range filter
    const selectedRange = priceRanges.find((r) => r.value === selectedPriceRange);
    if (selectedRange && selectedRange.value !== 'all') {
      filtered = filtered.filter(
        (p) => p.price >= selectedRange.min && p.price <= selectedRange.max
      );
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors.some((color) => selectedColors.includes(color))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popular':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        // featured
        break;
    }

    return filtered;
  }, [products, selectedCategory, selectedPriceRange, selectedSizes, selectedColors, sortBy, priceRanges]);

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('featured');
  };

  const FilterSection = () => (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="font-body font-semibold text-lg mb-4">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`w-full text-left px-4 py-2 rounded-lg font-body text-sm transition-all ${
                selectedCategory === category.value
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-body font-semibold text-lg mb-4">Fiyat Aralığı</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedPriceRange(range.value)}
              className={`w-full text-left px-4 py-2 rounded-lg font-body text-sm transition-all ${
                selectedPriceRange === range.value
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="font-body font-semibold text-lg mb-4">Beden</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1 border-2 rounded font-body text-sm transition-all ${
                selectedSizes.includes(size)
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      {allColors.length > 0 && (
        <div>
          <h3 className="font-body font-semibold text-lg mb-4">Renk</h3>
          <div className="space-y-2">
            {allColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorToggle(color)}
                className={`w-full text-left px-4 py-2 rounded-lg font-body text-sm transition-all ${
                  selectedColors.includes(color)
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-body text-sm hover:border-black transition-colors"
      >
        Filtreleri Temizle
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl text-black mb-4">
            Koleksiyonumuz
          </h1>
          <p className="font-body text-gray-600 text-lg">
            Titizlik ve tutku ile hazırlanmış zamansız parçaları keşfedin
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSection />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="w-full px-4 py-3 bg-black text-white rounded-lg font-body flex items-center justify-center gap-2"
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
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
                Filtrele
              </button>
            </div>

            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <p className="font-body text-gray-600">
                {filteredAndSortedProducts.length} ürün
              </p>
              <div className="flex items-center gap-2">
                <span className="font-body text-sm text-gray-600">
                  Sırala:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="font-body text-sm border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
                >
                  <option value="featured">Öne Çıkanlar</option>
                  <option value="newest">En Yeni</option>
                  <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                  <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                  <option value="popular">Popüler</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-body text-gray-600 text-lg mb-4">
                  Seçtiğiniz filtrelere uygun ürün bulunamadı.
                </p>
                <button
                  onClick={clearFilters}
                  className="font-body text-sm text-black underline hover:no-underline"
                >
                  Filtreleri temizle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-display text-2xl">Filtreler</h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-gray-500 hover:text-black"
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
                </div>
                <FilterSection />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
