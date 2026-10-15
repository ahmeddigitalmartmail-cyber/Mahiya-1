import React from 'react';
import { 
  ArrowRight, 
  ShoppingBag, 
  Zap, 
  Phone, 
  MapPin, 
  Smartphone, 
  Cpu, 
  Lightbulb, 
  Wrench, 
  Globe, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { BusinessConfig, Product, ServiceItem, TabType } from '../../types';

interface HomeTabProps {
  config: BusinessConfig;
  setActiveTab: (tab: TabType) => void;
  featuredProducts: Product[];
  services: ServiceItem[];
  onAddToCart: (product: Product) => void;
  onOpenProductDetails: (product: Product) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  config,
  setActiveTab,
  featuredProducts,
  onAddToCart,
  onOpenProductDetails,
}) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      {/* Official Brand Store Banner */}
      {config.bannerUrl && (
        <div className="w-full rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#070d1e] max-h-[380px] flex items-center justify-center relative group">
          <img
            src={config.bannerUrl}
            alt={`${config.businessName} Official Banner`}
            className="w-full h-auto object-cover max-h-[380px]"
          />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#111d4a] via-[#0d1b2a] to-[#0b132b] border border-slate-700/60 p-6 sm:p-10 lg:p-16 shadow-2xl text-center">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Brand Logo Emblem */}
          {config.logoUrl && (
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-xl shadow-amber-500/10 bg-[#070d1e] p-1 flex items-center justify-center">
              <img src={config.logoUrl} alt={config.businessName} className="w-full h-full object-cover rounded-2xl" />
            </div>
          )}

          {/* Brand Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-amber-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{config.taglineEn}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-200">{config.category}</span>
          </div>

          {/* Business Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-sm">
            {config.businessName}
          </h1>

          {/* Bangla Slogan */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-amber-400 mb-6 drop-shadow">
            “{config.sloganBn}”
          </p>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            আপনার প্রয়োজনীয় টেলিকম সেবা, ইলেকট্রনিক্স পণ্য এবং ডিজিটাল সেবা সম্পর্কে জানুন 
            <strong className="text-white font-semibold"> {config.businessName}</strong>-এর ওয়েবসাইটে। 
            আমরা দিচ্ছি প্রামাণ্য পণ্যের নির্ভরযোগ্য নিশ্চয়তা ও আন্তরিক সেবা।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('services')}
              className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-blue-700/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Explore Services</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Products</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className="bg-slate-800/90 hover:bg-slate-800 text-slate-100 border border-slate-700 px-5 py-3.5 rounded-xl text-sm sm:text-base font-semibold flex items-center gap-2 transition-all hover:border-slate-500"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Contact Us</span>
            </button>

            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/90 hover:bg-slate-800 text-slate-100 border border-slate-700 px-5 py-3.5 rounded-xl text-sm sm:text-base font-semibold flex items-center gap-2 transition-all hover:border-slate-500"
            >
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Quick Stats / Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80 text-left">
            <div className="bg-[#0b132b]/80 p-3.5 rounded-xl border border-slate-800">
              <div className="text-amber-400 font-bold text-lg flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                <span>টেলিকম ডেস্ক</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">সব অপারেটরের রিচার্জ ও বিশেষ বান্ডেল</p>
            </div>

            <div className="bg-[#0b132b]/80 p-3.5 rounded-xl border border-slate-800">
              <div className="text-blue-400 font-bold text-lg flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                <span>ইলেকট্রনিক্স</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">ফাস্ট চার্জার, ক্যাবল, হেডফোন ও গ্যাজেট</p>
            </div>

            <div className="bg-[#0b132b]/80 p-3.5 rounded-xl border border-slate-800">
              <div className="text-orange-400 font-bold text-lg flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>ইলেকট্রিক্যাল</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">মাল্টিপ্লাগ, সুইচ, সকেট ও এলইডি লাইট</p>
            </div>

            <div className="bg-[#0b132b]/80 p-3.5 rounded-xl border border-slate-800">
              <div className="text-emerald-400 font-bold text-lg flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>ডিজিটাল সেবা</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">অনলাইন ফরম, আবেদন ও কম্পিউটার প্রিন্ট</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Grid */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Zap className="w-4 h-4" />
              <span>আমাদের প্রধান সেবাসমূহ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Services & Capabilities
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
          >
            <span>সব সেবা দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Mobile Recharge Card */}
          <div className="bg-[#1c2541] border border-slate-700/60 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Telecom</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">মোবাইল ও আইটপ রিচার্জ</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                জিপি, বাংলালিংক, রবি, এয়ারটেল, টেলিটক ও স্কিটো ব্যালেন্স ও ইন্টারনেট প্যাক লোড।
              </p>
            </div>
            <button
              onClick={() => setActiveTab('recharge')}
              className="w-full bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>রিচার্জ ডেস্কে যান</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Electronics Card */}
          <div className="bg-[#1c2541] border border-slate-700/60 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Electronics</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">ইলেকট্রনিক্স ও গ্যাজেট</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                পিডি ফাস্ট চার্জার, টাইপ-সি কেবল, ব্লুটুথ হেডফোন, সাউন্ডবক্স ও টেকসই পাওয়ার ব্যাংক।
              </p>
            </div>
            <button
              onClick={() => setActiveTab('electronics')}
              className="w-full bg-slate-800 hover:bg-orange-600 text-slate-200 hover:text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>ইলেকট্রনিক্স ক্যাটালগ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Electrical Items Card */}
          <div className="bg-[#1c2541] border border-slate-700/60 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Electrical</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">ইলেকট্রিক্যাল আইটেম</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                নিরাপদ মাল্টিপ্লাগ, সুইচ, সকেট, সার্কিট ব্রেকার ও এনার্জি সেভিং এলইডি বাল্ব।
              </p>
            </div>
            <button
              onClick={() => setActiveTab('electrical')}
              className="w-full bg-slate-800 hover:bg-amber-600 text-slate-200 hover:text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>ইলেকট্রিক্যাল সামগ্রী</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. Servicing Card */}
          <div className="bg-[#1c2541] border border-slate-700/60 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Servicing</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">ডিভাইস সার্ভিসিং অনুসন্ধান</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                মোবাইল চার্জিং জ্যাক সমস্যা, ডিসপ্লে, বাটন ও গ্যাজেটের প্রাথমিক ডায়াগনোসিস ও সমাধান।
              </p>
            </div>
            <button
              onClick={() => setActiveTab('servicing')}
              className="w-full bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>সমস্যা জমা দিন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span>নির্বাচিত পণ্যসামগ্রী</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Products & Accessories
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('products')}
            className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
          >
            <span>সকল পণ্য ক্যাটালগ দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
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
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600';
                  }}
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-sm border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-amber-400">
                  DEMO CATALOG
                </div>
                {product.stock > 0 && (
                  <div className="absolute bottom-2.5 right-2.5 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    স্টকে আছে ({product.stock})
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1 mt-0.5 mb-1.5 group-hover:text-amber-400 transition-colors">
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
                      className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => onOpenProductDetails(product)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2 px-3 rounded-lg text-xs font-semibold transition-colors"
                    >
                      বিস্তারিত
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Business Introduction & Trust Highlights */}
      <section className="bg-gradient-to-r from-[#111d4a] to-[#1c2541] border border-slate-700/60 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              আমাদের পরিচিতি ও অঙ্গীকার
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-4 leading-snug">
              {config.businessName} — আপনার বিশ্বস্ত স্থানীয় অংশীদার
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              তেরখাদা ও বিপ্র অজগরা এলাকার সম্মানিত গ্রাহকদের জন্য এক ঠিকানায় নির্ভরযোগ্য টেলিকম সুবিধা, প্রিমিয়াম ইলেকট্রনিক্স গ্যাজেট, নিরাপদ ইলেকট্রিক্যাল পণ্য ও প্রয়োজনীয় অনলাইন ডিজিটাল সেবা দিতে আমরা নিয়োজিত।
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>যাচাইকৃত পণ্য ও কোনো ধরনের ভুয়া বা কাল্পনিক তথ্যের ব্যবহার নেই</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>সরাসরি কল ও হোয়াটসঅ্যাপের মাধ্যমে দ্রুত অর্ডার ও তথ্য সেবা</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>স্থানীয় দোকান থেকে সরাসরি পিকআপের সুবিধাজনক ব্যবস্থা</span>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('about')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors"
              >
                বিস্তারিত পরিচিতি দেখুন
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
              >
                সরাসরি কথা বলুন
              </button>
            </div>
          </div>

          <div className="bg-[#0b132b] border border-slate-800 rounded-2xl p-6 shadow-inner">
            <h3 className="text-base font-bold text-white mb-4 border-b border-slate-800 pb-2">
              যোগাযোগ ও সহায়তা ডেস্ক
            </h3>
            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-xs">প্রধান প্রতিনিধি:</span>
                <span className="text-white font-semibold text-base">{config.contactPerson}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">জরুরি মোবাইল ফোন:</span>
                <a 
                  href={`tel:${config.phone}`} 
                  className="text-amber-400 font-bold text-lg hover:underline inline-flex items-center gap-2 mt-0.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>{config.phone}</span>
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">প্রতিষ্ঠানের অবস্থান:</span>
                <span className="text-slate-200 leading-relaxed block mt-0.5">{config.address}</span>
              </div>
              <div className="pt-2">
                <a
                  href={config.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>গুগল ম্যাপে সরাসরি দেখুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
