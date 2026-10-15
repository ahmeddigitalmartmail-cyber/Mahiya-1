import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Search, 
  ShoppingBag, 
  Phone, 
  CheckCircle, 
  X, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Product, TabType } from '../../types';

interface ElectronicsTabProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  phone: string;
  setActiveTab: (tab: TabType) => void;
}

export const ElectronicsTab: React.FC<ElectronicsTabProps> = ({
  products,
  onAddToCart,
  phone,
  setActiveTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const electronicsProducts = useMemo(() => {
    return products.filter((p) => {
      const isElec = p.category === 'Electronics' || p.category === 'Mobile Accessories';
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameBn.includes(searchQuery);
      return isElec && matchesSearch;
    });
  }, [products, searchQuery]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Electronics & Mobile Gear</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            ইলেকট্রনিক্স পণ্যসমূহ (Electronics)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            স্মার্টফোন ফাস্ট চার্জার, মজবুত ডাটা ক্যাবল, ব্লুটুথ হেডফোন, পাওয়ার ব্যাংক ও পোর্টেবল সাউন্ডবক্স।
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ইলেকট্রনিক্স পণ্য খুঁজুন (Search electronics)..."
            className="w-full bg-[#0b132b] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          onClick={() => setActiveTab('products')}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          <span>সকল ক্যাটাগরি ব্রাউজ করুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Electronics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {electronicsProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#1c2541] border border-slate-700/60 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-lg flex flex-col group"
          >
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600';
                }}
              />
              <div className="absolute top-2 left-2 bg-slate-950/85 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-amber-400">
                DEMO CATALOG
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
                    <span>কার্ট</span>
                  </button>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2 px-2.5 rounded-lg text-xs font-semibold"
                  >
                    বিস্তারিত
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c2541] border border-slate-700 max-w-lg w-full rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {selectedProduct.category}
            </span>
            <h3 className="text-xl font-bold text-white mt-1 mb-3">
              {selectedProduct.nameBn}
            </h3>

            <div className="h-52 bg-slate-900 rounded-xl overflow-hidden mb-4">
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

            <div className="flex items-center justify-between bg-[#0b132b] p-3 rounded-xl border border-slate-800 mb-4">
              <div>
                <span className="text-xs text-slate-400 block">মূল্য:</span>
                <span className="text-2xl font-extrabold text-amber-400">৳{selectedProduct.price}</span>
              </div>
              <span className="text-xs text-emerald-400 font-bold">
                স্টকে আছে ({selectedProduct.stock} টি)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 mb-4">
              {selectedProduct.shortDescBn}
            </p>

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
