import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Lock } from 'lucide-react';
import { BusinessConfig, TabType } from '../types';

interface FooterProps {
  config: BusinessConfig;
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ config, setActiveTab }) => {
  return (
    <footer className="bg-[#070d1e] border-t border-slate-800 text-slate-400 mt-20 pt-14 pb-8 text-sm text-left">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Slogan */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#0a1128] border border-amber-500/40 flex items-center justify-center shadow-md shrink-0">
                {config.logoUrl ? (
                  <img src={config.logoUrl} alt={config.businessName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-blue-700 to-orange-500 flex items-center justify-center font-black text-white text-lg">
                    A
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {config.businessName}
                </h3>
                <p className="text-xs text-amber-400">{config.category}</p>
              </div>
            </div>
            <p className="text-amber-400/90 font-medium text-sm mb-3">
              “{config.sloganBn}”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              আপনার প্রয়োজনীয় টেলিকম সেবা, আসল মোবাইল এক্সেসরিজ, ইলেকট্রিক্যাল সামগ্রী ও ডিজিটাল সহায়তার নির্ভরযোগ্য কেন্দ্র।
            </p>
            <div className="inline-block bg-slate-800/80 border border-slate-700/60 rounded-full px-3 py-1 text-xs text-slate-300 font-semibold">
              {config.taglineEn}
            </div>
          </div>

          {/* Column 2: Quick Tab Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-amber-500 pl-2">
              গুরুত্বপূর্ণ ট্যাব ও পেজ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => setActiveTab('services')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  ⚡ সেবাসমূহ (All Services)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('products')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  🛍️ পণ্য ক্যাটালগ (Product Catalog)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('recharge')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  📲 মোবাইল রিচার্জ (Mobile Recharge)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('servicing')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  🛠️ গ্যাজেট সার্ভিসিং (Servicing)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('online-services')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  🌐 অনলাইন ডিজিটাল সেবা (Online Services)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('offers')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  🎁 বর্তমান অফার (Offers)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('admin')} 
                  className="hover:text-amber-400 transition-colors text-left text-amber-400/90 font-medium inline-flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>এডমিন পোর্টাল (Admin Portal)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-orange-500 pl-2">
              যোগাযোগের তথ্য
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">যোগাযোগকারী:</span>
                <span className="text-slate-200 font-medium">{config.contactPerson}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">মোবাইল ফোন:</span>
                <a 
                  href={`tel:${config.phone}`} 
                  className="text-amber-400 hover:underline font-bold text-sm inline-flex items-center gap-1.5 font-mono"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{config.phone}</span>
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">অফিসিয়াল ইমেইল:</span>
                <a 
                  href={`mailto:${config.email}`} 
                  className="text-slate-200 hover:text-white inline-flex items-center gap-1.5 break-all font-mono"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{config.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Address & Google Maps */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-blue-500 pl-2">
              প্রতিষ্ঠানের ঠিকানা
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>{config.address}</span>
            </p>

            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-900/40 hover:bg-blue-900/60 text-blue-200 border border-blue-700/50 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all mb-3 w-full justify-center shadow"
            >
              <span>গুগল ম্যাপে লোকেশন দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="bg-[#0b132b] p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>তেরখাদা, খুলনার নির্ভরযোগ্য টেলিকম ও ডিজিটাল সেবা হাব</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            &copy; 2026 <strong className="text-slate-200">{config.businessName}</strong>. সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => setActiveTab('about')} 
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveTab('about')} 
              className="hover:text-slate-200 transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <span className="text-amber-500/80 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>প্রামাণ্য তথ্য ও সেবা</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
