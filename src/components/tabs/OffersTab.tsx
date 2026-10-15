import React from 'react';
import { 
  Gift, 
  Calendar, 
  Tag, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  ShoppingBag,
  Clock
} from 'lucide-react';
import { OfferItem, TabType } from '../../types';

interface OffersTabProps {
  offers: OfferItem[];
  setActiveTab: (tab: TabType) => void;
  phone: string;
}

export const OffersTab: React.FC<OffersTabProps> = ({ offers, setActiveTab, phone }) => {
  const activeOffers = offers.filter(o => o.status === 'Active');
  const upcomingOffers = offers.filter(o => o.status === 'Upcoming');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>Special Campaigns & Promotions</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            চলমান ও আসন্ন অফারসমূহ (Offers)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            কোনো কৃত্রিম বা ভুয়া ছাড় নয় — দোকানে সরাসরি প্রযোজ্য বাস্তবসম্মত প্রমোশন ও সেবা সুবিধা।
          </p>
        </div>
      </div>

      {/* Active Offers Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">
            সক্রিয় অফার (Active Offers)
          </h2>
        </div>

        {activeOffers.length === 0 ? (
          <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-8 text-center text-slate-400">
            <Clock className="w-10 h-10 mx-auto mb-2 text-slate-500" />
            <h3 className="text-base font-bold text-white mb-1">বর্তমানে কোনো সক্রিয় অফার নেই</h3>
            <p className="text-xs">
              নতুন অফার চালু হলে এখানে আপডেট দেখতে পাবেন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-[#1c2541] border border-slate-700/60 hover:border-amber-500/40 rounded-2xl p-6 shadow-lg relative flex flex-col justify-between transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {offer.badge}
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 border border-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{offer.validFrom} হতে {offer.validTill}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {offer.titleBn}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-semibold mb-3">
                    {offer.title}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {offer.descBn}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>পণ্য দেখুন</span>
                  </button>

                  <a
                    href={`tel:${phone}`}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>অফার সম্পর্কে জানুন</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Offers Section */}
      {upcomingOffers.length > 0 && (
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              আসন্ন অফার ও ক্যাম্পেইন (Upcoming Campaigns)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-[#1c2541]/70 border border-slate-700/40 rounded-2xl p-6 shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {offer.badge}
                  </span>
                  <span className="text-xs text-slate-400">
                    শুরু হবে: {offer.validFrom}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-200 mb-2">
                  {offer.titleBn}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {offer.descBn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
