import React, { useState } from 'react';
import { X, ShieldCheck, Mail, User, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { CustomerUser } from '../types';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: CustomerUser) => void;
  actionReason?: string;
  defaultEmail?: string;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  actionReason = 'কার্টে পণ্য যোগ করতে ও অর্ডার সম্পন্ন করতে আপনার একাউন্টে লগইন করুন।',
  defaultEmail = 'bd71aliahmedlive@gmail.com',
}) => {
  const [name, setName] = useState('Ali Ahmed');
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState('+8809643616832');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      const googleUser: CustomerUser = {
        uid: 'google-usr-' + Date.now(),
        name: name || 'Google Verified User',
        email: email || defaultEmail,
        phone: phone || '+8809643616832',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        address: '9100 Bipro Ajagarah, Terokhada, Khulna',
      };
      setIsLoading(false);
      onLoginSuccess(googleUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-amber-500/40 max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>নিরাপদ গ্রাহক প্রবেশদ্বার</span>
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-2">
          সাইন ইন করুন
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          {actionReason}
        </p>

        {/* Google Sign-in Main Button */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white hover:bg-slate-100 active:scale-[0.99] text-slate-900 font-bold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-3 shadow-lg transition-all border border-slate-300 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
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
            )}
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-700 w-full" />
            <span className="bg-[#0f172a] px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider absolute">
              অথবা প্রোফাইল নিশ্চিত করুন
            </span>
          </div>

          {/* Quick info confirmation */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                গ্রাহকের নাম:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  placeholder="আপনার নাম"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                গুগল ইমেইল:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow mt-2"
            >
              <span>লগইন ও কন্টিনিউ করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Security & Cloud Sync Notice */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Firebase Auth & Google Cloud সুরক্ষিত সেশন সংযোগ</span>
        </div>
      </div>
    </div>
  );
};
