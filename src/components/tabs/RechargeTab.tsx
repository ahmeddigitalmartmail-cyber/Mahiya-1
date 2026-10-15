import React, { useState } from 'react';
import { 
  Smartphone, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';
import { TabType } from '../../types';

interface RechargeTabProps {
  phone: string;
  setActiveTab: (tab: TabType) => void;
}

export const RechargeTab: React.FC<RechargeTabProps> = ({ phone, setActiveTab }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [operator, setOperator] = useState('Grameenphone');
  const [amount, setAmount] = useState('50');
  const [rechargeType, setRechargeType] = useState<'Prepaid' | 'Postpaid'>('Prepaid');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const operators = [
    { id: 'Grameenphone', name: 'Grameenphone (জিপি)', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 'Banglalink', name: 'Banglalink (বাংলালিংক)', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { id: 'Robi', name: 'Robi (রবি)', color: 'text-red-400', bg: 'bg-red-500/10' },
    { id: 'Airtel', name: 'Airtel (এয়ারটেল)', color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { id: 'Teletalk', name: 'Teletalk (টেলিটক)', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 'Skitto', name: 'Skitto (স্কিটো)', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  const quickAmounts = ['20', '30', '50', '100', '150', '200', '300', '500'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 11) {
      alert('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)।');
      return;
    }
    setReviewModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-blue-500/15 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Telecom Assistance Desk</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            মোবাইল রিচার্জ (Mobile Recharge)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            সব অপারেটরের প্রিপেইড ও পোস্টপেইড রিচার্জ, ইন্টারনেট বান্ডেল ও মিনিট অফারের সহায়তা ডেস্ক।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recharge Calculator / Inquiry Form */}
        <div className="lg:col-span-7 bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <span>রিচার্জ তথ্য ও পর্যালোচনা ফর্ম</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                মোবাইল নম্বর (১১ ডিজিট):
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))}
                placeholder="01XXXXXXXXX"
                required
                className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-3 text-base text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                উদাহরণ: 01712345678 (গ্রাহকের সক্রিয় মোবাইল নম্বর)
              </span>
            </div>

            {/* Operator Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                মোবাইল অপারেটর নির্বাচন:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {operators.map((op) => {
                  const isSelected = operator === op.id;
                  return (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setOperator(op.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-700/40'
                          : 'bg-[#0b132b] text-slate-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <span>{op.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recharge Amount */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  রিচার্জের পরিমাণ (৳):
                </label>
                <span className="text-xs text-amber-400 font-bold">ন্যূনতম ৳১০ - সর্বোচ্চ ৳৫০০০</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="10"
                max="5000"
                required
                className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-amber-400 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      amount === q
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    ৳{q}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharge Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                সংযোগের ধরণ (Connection Type):
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRechargeType('Prepaid')}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    rechargeType === 'Prepaid'
                      ? 'bg-blue-600 text-white border-blue-400'
                      : 'bg-[#0b132b] text-slate-300 border-slate-700'
                  }`}
                >
                  প্রিপেইড (Prepaid)
                </button>
                <button
                  type="button"
                  onClick={() => setRechargeType('Postpaid')}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    rechargeType === 'Postpaid'
                      ? 'bg-blue-600 text-white border-blue-400'
                      : 'bg-[#0b132b] text-slate-300 border-slate-700'
                  }`}
                >
                  পোস্টপেইড (Postpaid)
                </button>
              </div>
            </div>

            {/* Critical Non-transactional Disclaimer */}
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3.5 text-xs text-amber-300 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-white block mb-0.5">স্বচ্ছতা ও সুরক্ষা বার্তা:</strong>
                এই ইন্টারফেস কোনো স্বয়ংক্রিয় আর্থিক লেনদেন বা ব্যাংক থেকে টাকা কাটার গেটওয়ে নয়। রিচার্জ নিশ্চিত করতে দোকানে সরাসরি অথবা নিচে দেওয়া হটলাইনে যোগাযোগ করুন।
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all"
              >
                <span>Review Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${phone}`}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Contact for Assistance</span>
              </a>
            </div>
          </form>
        </div>

        {/* Informational Guidance Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>রিচার্জ সহায়তার তথ্য</span>
            </h3>

            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>আইটপ চ্যানেল:</strong> খুচরা বিক্রেতা চ্যানেল দিয়ে দ্রুততম সময়ে সঠিক প্যাকেজ অ্যাক্টিভেশন।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>জরুরি রিচার্জ:</strong> যেকোনো বিশেষ প্রয়োজনে সরাসরি দোকানে আসুন বা ফোন করুন।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>ব্যালেন্স যাচাই:</strong> রিচার্জের পূর্বে গ্রাহকের সঠিক অপারেটর ও নম্বর যাচাই করে নেওয়া হয়।</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-900/40 to-[#0b132b] border border-blue-700/50 rounded-2xl p-6 shadow-lg text-center">
            <h4 className="text-sm font-bold text-white mb-1">সরাসরি কথা বলতে চান?</h4>
            <p className="text-xs text-slate-300 mb-4">
              মোবাইল রিচার্জ বা প্যাকেজ অনুসন্ধান সংক্রান্ত যেকোনো সহায়তায়:
            </p>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{phone} এ কল করুন</span>
            </a>
          </div>
        </div>
      </div>

      {/* Review Details Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c2541] border border-slate-700 max-w-md w-full rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="bg-blue-500/15 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              REVIEW RECHARGE SUMMARY
            </span>
            <h3 className="text-xl font-bold text-white mt-2 mb-4">
              রিচার্জ বিবরণী পর্যালোচনা
            </h3>

            <div className="bg-[#0b132b] rounded-xl p-4 border border-slate-800 space-y-2.5 text-xs sm:text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">মোবাইল নম্বর:</span>
                <span className="font-mono font-bold text-white text-base">{mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">অপারেটর:</span>
                <span className="font-semibold text-amber-400">{operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">রিচার্জের পরিমাণ:</span>
                <span className="font-extrabold text-white text-base">৳{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">সংযোগ টাইপ:</span>
                <span className="font-medium text-slate-300">{rechargeType}</span>
              </div>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl text-[11px] text-slate-300 leading-relaxed mb-6">
              ℹ️ এই অনুরোধটি সম্পন্ন করতে দয়া করে আমাদের দোকানে যোগাযোগ করুন অথবা সরাসরি ফোনে কথা বলুন।
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${phone}`}
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>সরাসরি কল করুন</span>
              </a>

              <button
                onClick={() => setReviewModalOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2.5 rounded-xl text-xs font-semibold"
              >
                সম্পাদনা করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
