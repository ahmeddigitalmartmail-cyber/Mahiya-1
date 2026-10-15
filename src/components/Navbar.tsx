import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShoppingCart, 
  Menu, 
  X, 
  Home, 
  Info, 
  Zap, 
  ShoppingBag, 
  Smartphone, 
  Cpu, 
  Lightbulb, 
  Wrench, 
  Globe, 
  Gift, 
  Package, 
  User, 
  ShieldCheck,
  Lock,
  LogIn
} from 'lucide-react';
import { BusinessConfig, CustomerUser, TabType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
  config: BusinessConfig;
  currentUser: CustomerUser | null;
  onOpenLoginModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  config,
  currentUser,
  onOpenLoginModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Customer retail tabs (Admin is isolated and accessed via secure admin gate)
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Zap className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'recharge', label: 'Mobile Recharge', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'electronics', label: 'Electronics', icon: <Cpu className="w-4 h-4" /> },
    { id: 'electrical', label: 'Electrical Items', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'servicing', label: 'Servicing', icon: <Wrench className="w-4 h-4" /> },
    { id: 'online-services', label: 'Online Services', icon: <Globe className="w-4 h-4" /> },
    { id: 'offers', label: 'Offers', icon: <Gift className="w-4 h-4" /> },
    { 
      id: 'cart', 
      label: 'Shopping Cart', 
      icon: (
        <span className="relative flex items-center">
          <ShoppingCart className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
              {cartCount}
            </span>
          )}
        </span>
      ) 
    },
    { id: 'orders', label: 'My Orders', icon: <Package className="w-4 h-4" /> },
    { id: 'profile', label: 'Customer Profile', icon: <User className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Us', icon: <Phone className="w-4 h-4" /> },
    { id: 'map', label: 'Find Us on Map', icon: <MapPin className="w-4 h-4" /> },
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.location.hash = tabId;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0b132b]/95 border-b border-slate-800 shadow-xl transition-all">
      {/* Top verified bar */}
      <div className="bg-[#070d1e] border-b border-slate-800/80 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide">
              VERIFIED BUSINESS
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="font-medium text-slate-200">{config.contactPerson}</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400 truncate max-w-xs">{config.address}</span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`tel:${config.phone}`} 
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{config.phone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a 
              href={`mailto:${config.email}`} 
              className="text-slate-300 hover:text-white hidden sm:flex items-center gap-1 transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>{config.email}</span>
            </a>

            {/* Discreet Secured Admin Portal Entry */}
            <button
              onClick={() => handleTabClick('admin')}
              className="ml-2 bg-slate-900 hover:bg-slate-800 text-amber-300/90 hover:text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all"
              title="মাস্টার কী দিয়ে এডমিন পোর্টাল ওপেন করুন"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>এডমিন এক্সেস</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Identity with User's Logo */}
          <button 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 text-left group transition-transform focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#070d1e] border border-amber-500/40 flex items-center justify-center shadow-lg shadow-orange-500/10 group-hover:scale-105 transition-all shrink-0">
              {config.logoUrl ? (
                <img 
                  src={config.logoUrl} 
                  alt={config.businessName} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-700 via-indigo-600 to-orange-500 flex items-center justify-center font-extrabold text-white text-xl">
                  A
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight group-hover:text-amber-400 transition-colors">
                  {config.businessName}
                </span>
              </div>
              <p className="text-[11px] text-amber-400/90 font-medium tracking-wide">
                {config.category}
              </p>
            </div>
          </button>

          {/* Quick Action CTA buttons & Customer Login on desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Customer Google Login Status */}
            {currentUser ? (
              <button
                onClick={() => handleTabClick('profile')}
                className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 border border-emerald-500/40 rounded-xl px-3 py-1.5 transition-all"
                title="প্রোফাইল দেখুন"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-xs font-bold border border-emerald-400">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    currentUser.name.charAt(0)
                  )}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white max-w-[120px] truncate">{currentUser.name}</div>
                  <div className="text-[10px] text-emerald-400 font-medium">গুগল লগইন সক্রিয়</div>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2 shadow transition-all border border-slate-300"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
                <span>গুগল লগইন</span>
              </button>
            )}

            <button
              onClick={() => handleTabClick('cart')}
              className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'cart'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span>কার্ট</span>
              {cartCount > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href={`tel:${config.phone}`}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg shadow-orange-600/25 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>কল করুন</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            {currentUser ? (
              <button
                onClick={() => handleTabClick('profile')}
                className="w-8 h-8 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-xs font-bold border border-emerald-400"
              >
                {currentUser.name.charAt(0)}
              </button>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="px-2.5 py-1 rounded-lg bg-white text-slate-900 text-xs font-bold flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>লগইন</span>
              </button>
            )}

            <button
              onClick={() => handleTabClick('cart')}
              className="relative p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Connected Tab Strip */}
        <nav 
          aria-label="Connected Tab Navigation"
          className="hidden lg:flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none border-t border-slate-800/60 mt-2"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 focus:outline-none ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-md shadow-blue-800/40 border border-amber-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070d1e]/98 border-b border-slate-800 px-4 py-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="text-xs font-semibold uppercase text-slate-500 px-2 mb-2 tracking-wider">
            সব পেজ ও ট্যাব
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold border border-amber-500/40'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleTabClick('admin')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 border border-amber-500/30"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>এডমিন এক্সেস (সিকিউরড পোর্টাল)</span>
            </button>

            <a
              href={`tel:${config.phone}`}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>সরাসরি কল করুন ({config.phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
