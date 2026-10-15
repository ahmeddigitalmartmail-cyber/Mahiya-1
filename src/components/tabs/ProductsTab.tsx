import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Phone, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Info, 
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { Product, TabType } from '../../types';

interface ProductsTabProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  phone: string;
  initialCategory?: string;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  products,
  onAddToCart,
  phone,
  initialCategory = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    'All',
    'Mobile Accessories',
    'Electronics',
    'Electrical Items',
    'Digital Accessories',
    'Other Products',
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.nameBn.includes(searchQuery) ||
          product.shortDescBn.includes(searchQuery);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Products Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-orange-500/15 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Product Catalog</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            পণ্য ক্যাটালগ (Product Catalog)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            আসল ও যাচাইকৃত মোবাইল অ্যাক্সেসরিজ, ইলেকট্রনিক্স এবং ঘরোয়া ইলেকট্রিক্যাল সরঞ্জাম।
          </p>
        </div>
      </div>

      {/* Search & Filtering Bar */}
      <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search box */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্যের নাম দিয়ে খুঁজুন (Search by name or category)..."
              className="w-full bg-[#0b132b] border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto bg-[#0b132b] border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="default">সাজানো: ডিফল্ট (Default)</option>
              <option value="price-asc">মূল্য: কম থেকে বেশি (Price: Low to High)</option>
              <option value="price-desc">মূল্য: বেশি থেকে কম (Price: High to Low)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-400 mr-1 shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>ক্যাটাগরি:</span>
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-12 text-center text-slate-400">
          <Search className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <h3 className="text-lg font-bold text-white mb-1">কোনো পণ্য পাওয়া যায়নি</h3>
          <p className="text-xs max-w-sm mx-auto mb-4">
            আপনার সার্চ ফিল্টার পরিবর্তন করুন অথবা সব পণ্য দেখতে রিসেট করুন।
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSortBy('default');
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#1c2541] border border-slate-700/60 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-lg flex flex-col group"
            >
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600';
                  }}
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-sm border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-amber-400">
                  DEMO CATALOG
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  স্টকে আছে ({product.stock})
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1 mt-0.5 mb-1 group-hover:text-amber-400 transition-colors">
                    {product.nameBn}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                    {product.name}
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {product.shortDescBn}
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-extrabold text-amber-400">৳{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ৳{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-2.5 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2 px-2.5 rounded-lg text-xs font-semibold transition-colors"
                    >
                      বিস্তারিত
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c2541] border border-slate-700 max-w-lg w-full rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                {selectedProduct.category}
              </span>
              <h3 className="text-xl font-bold text-white leading-tight mt-0.5">
                {selectedProduct.nameBn}
              </h3>
              <p className="text-xs text-slate-400">{selectedProduct.name}</p>
            </div>

            <div className="h-56 bg-slate-900 rounded-xl overflow-hidden mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600';
                }}
              />
            </div>

            <div className="flex items-baseline justify-between mb-4 bg-[#0b132b] p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block">বর্তমান খুচরা মূল্য:</span>
                <span className="text-2xl font-extrabold text-amber-400">
                  ৳{selectedProduct.price}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-xs text-slate-400 line-through ml-2">
                    ৳{selectedProduct.originalPrice}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">স্টক পরিস্থিতি:</span>
                <span className="text-xs font-bold text-emerald-400">
                  ইন স্টক ({selectedProduct.stock} টি উপলব্ধ)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
              {selectedProduct.shortDescBn}
            </p>

            {/* Features list */}
            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">
                  মূল বৈশিষ্ট্যসমূহ:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <a
                href={`tel:${phone}`}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Phone className="w-4 h-4" />
                <span>সরাসরি কল করে অর্ডার</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
