import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  ShieldCheck, 
  LogIn, 
  LogOut,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import { CustomerUser, Order, TabType } from '../../types';

interface ProfileTabProps {
  orders: Order[];
  setActiveTab: (tab: TabType) => void;
  currentUser: CustomerUser | null;
  onLoginSuccess: (user: CustomerUser) => void;
  onLogout: () => void;
  onOpenLoginModal: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ 
  orders, 
  setActiveTab,
  currentUser,
  onLoginSuccess,
  onLogout,
  onOpenLoginModal,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-blue-500/15 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Customer Account Portal</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            কাস্টমার প্রোফাইল (Customer Profile)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            আপনার গ্রাহক একাউন্ট তথ্য, গুগল লগইন স্ট্যাটাস এবং পূর্বের অর্ডার হিস্টোরি।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Card */}
        <div className="lg:col-span-7 bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-700">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-700 to-amber-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <span>{currentUser ? currentUser.name.charAt(0) : 'G'}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  {currentUser ? currentUser.name : 'অতিথি গ্রাহক (Guest)'}
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  currentUser 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-slate-800 text-amber-400 border-slate-700'
                }`}>
                  {currentUser ? 'GOOGLE VERIFIED' : 'NOT LOGGED IN'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentUser ? 'Firebase Auth সুরক্ষিত সেশন' : 'অর্ডার ও কার্ট ব্যবহারের জন্য গুগল দিয়ে লগইন করুন'}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>ইমেইল এড্রেস:</span>
              </span>
              <span className="text-slate-200 font-medium font-mono">
                {currentUser?.email || 'লগইন করা নেই'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>মোবাইল নম্বর:</span>
              </span>
              <span className="text-amber-400 font-mono font-bold">
                {currentUser?.phone || '+8809643616832'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>ডেলিভারি ঠিকানা:</span>
              </span>
              <span className="text-slate-300">
                {currentUser?.address || '9100 Bipro Ajagarah, Terokhada, Khulna'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-500" />
                <span>মোট অর্ডার রেকর্ড:</span>
              </span>
              <span className="text-white font-bold">{orders.length} টি সম্পন্ন/চলমান</span>
            </div>
          </div>

          {/* Google Auth Button & Status */}
          <div className="pt-2 space-y-3">
            {!currentUser ? (
              <button
                onClick={onOpenLoginModal}
                className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-3 shadow transition-all border border-slate-300 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google দিয়ে লগইন করুন</span>
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>আপনি সফলভাবে গুগল একাউন্ট ({currentUser.email}) দিয়ে সাইন ইন আছেন।</span>
                </div>

                <button
                  onClick={onLogout}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-rose-500/20 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>একাউন্ট থেকে সাইন আউট (Sign Out)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg">
            <h3 className="text-base font-bold text-white mb-4 border-b border-slate-700 pb-2">
              গ্রাহক শর্টকাট
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('orders')}
                className="w-full bg-[#0b132b] hover:bg-slate-800 p-3 rounded-xl border border-slate-700 text-left flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-blue-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">আমার সকল অর্ডার দেখুন</h4>
                    <p className="text-[11px] text-slate-400">{orders.length} টি সক্রিয় রেকর্ড</p>
                  </div>
                </div>
                <span className="text-xs text-blue-400 font-semibold">দেখুন →</span>
              </button>

              <button
                onClick={() => setActiveTab('cart')}
                className="w-full bg-[#0b132b] hover:bg-slate-800 p-3 rounded-xl border border-slate-700 text-left flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-orange-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">শপিং কার্ট চেক করুন</h4>
                    <p className="text-[11px] text-slate-400">অর্ডার প্রস্তুত করুন</p>
                  </div>
                </div>
                <span className="text-xs text-orange-400 font-semibold">কার্ট →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
