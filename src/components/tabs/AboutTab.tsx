import React from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { BusinessConfig, TabType } from '../../types';

interface AboutTabProps {
  config: BusinessConfig;
  setActiveTab: (tab: TabType) => void;
}

export const AboutTab: React.FC<AboutTabProps> = ({ config, setActiveTab }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Business Profile</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            আমাদের সম্পর্কে (About Us)
          </h1>
          <p className="text-lg text-amber-400 font-semibold mb-3">
            “{config.sloganBn}”
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            <strong className="text-white font-bold">{config.businessName}</strong> একটি সমন্বিত টেলিকম, ইলেকট্রনিক্স ও ডিজিটাল সেবা কেন্দ্র। আমাদের মূল লক্ষ্য হলো সততা, স্বচ্ছতা ও আন্তরিকতার সাথে গ্রাহকদের প্রকৃত প্রয়োজনীয় পণ্য ও প্রযুক্তিগত সহায়তা পৌঁছে দেওয়া।
          </p>
        </div>
      </div>

      {/* Verified Business Credentials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Business Information Card */}
        <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
            <Building2 className="w-5 h-5 text-amber-400" />
            <span>প্রামাণ্য প্রাতিষ্ঠানিক তথ্য</span>
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 text-xs sm:text-sm">প্রতিষ্ঠানের নাম:</span>
              <span className="text-white font-bold">{config.businessName}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 text-xs sm:text-sm">ব্যবসার ধরণ ও ক্যাটাগরি:</span>
              <span className="text-amber-400 font-medium">{config.category}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 text-xs sm:text-sm">দায়িত্বপ্রাপ্ত স্বত্বাধিকারী/প্রতিনিধি:</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-400" />
                <span>{config.contactPerson}</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 text-xs sm:text-sm">অফিসিয়াল ফোন নম্বর:</span>
              <a 
                href={`tel:${config.phone}`} 
                className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{config.phone}</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 text-xs sm:text-sm">যোগাযোগের ইমেইল:</span>
              <a 
                href={`mailto:${config.email}`} 
                className="text-slate-200 hover:text-white inline-flex items-center gap-1 break-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{config.email}</span>
              </a>
            </div>

            <div className="py-2">
              <span className="text-slate-400 text-xs sm:text-sm block mb-1">অবস্থান ও স্থায়ী ঠিকানা:</span>
              <p className="text-slate-200 text-sm leading-relaxed flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/80 flex flex-wrap gap-3">
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>গুগল ম্যাপে দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setActiveTab('contact')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold"
            >
              সরাসরি যোগাযোগ করুন
            </button>
          </div>
        </div>

        {/* Brand Commitments & Integrity Policy */}
        <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>আমাদের প্রতিশ্রুতি ও মূলনীতি</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3 bg-[#0b132b]/80 p-3.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm mb-0.5">কোনো কৃত্রিম বা কাল্পনিক তথ্য নয়</h4>
                  <p className="text-slate-400 leading-relaxed">
                    আমরা কখনোই ভুয়া রিভিউ, কৃত্রিম রেটিং বা মিথ্যা ব্যবসায়িক দাবি প্রদর্শন করি না। আমাদের ওয়েবসাইটে যা উল্লেখ আছে তা বাস্তবসম্মত ও প্রমাণিত।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#0b132b]/80 p-3.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm mb-0.5">আসল গুণমানের পণ্য সরবরাহ</h4>
                  <p className="text-slate-400 leading-relaxed">
                    মোবাইল ফাস্ট চার্জার, টাইপ-সি কেবল, মাল্টিপ্লাগ ও ইলেকট্রিক্যাল ফিটিংস সবক্ষেত্রেই নিরাপদ ও নির্ভরযোগ্য মান নিশ্চিত করা হয়।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#0b132b]/80 p-3.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm mb-0.5">আন্তরিক স্থানীয় গ্রাহক সেবা</h4>
                  <p className="text-slate-400 leading-relaxed">
                    দোকানে সরাসরি পরিদর্শন হোক কিংবা ফোনে যোগাযোগ — আলী আহমেদ ও আহমেদ ডিজিটাল অ্যান্ড মার্টের টিম সর্বদা আপনার প্রয়োজনে পাশে থাকবে।
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-4 rounded-xl text-xs text-amber-300">
            <strong>ইংরেজি স্লোগান:</strong> {config.taglineEn} — আমাদের প্রতিটি সেবায় আপনার নিরবচ্ছিন্ন সংযোগ নিশ্চিত করাই আমাদের লক্ষ্য।
          </div>
        </div>
      </div>
    </div>
  );
};
