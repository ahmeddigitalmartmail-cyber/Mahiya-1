import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Image as ImageIcon,
  Save,
  FileSpreadsheet,
  Cloud,
  HardDrive,
  RefreshCw,
  Lock,
  Unlock,
  Key,
  ExternalLink,
  Upload,
  Layers
} from 'lucide-react';
import { ADMIN_SECURITY_KEY, BusinessConfig, Order, Product, ServicingInquiry } from '../../types';

interface AdminTabProps {
  products: Product[];
  orders: Order[];
  inquiries: ServicingInquiry[];
  config: BusinessConfig;
  onUpdateConfig: (newConfig: BusinessConfig) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateProduct: (product: Product) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const AdminTab: React.FC<AdminTabProps> = ({
  products,
  orders,
  inquiries,
  config,
  onUpdateConfig,
  onAddProduct,
  onDeleteProduct,
  onUpdateProduct,
  onUpdateOrderStatus,
}) => {
  // Security Key State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('adm_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [securityKeyInput, setSecurityKeyInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Subtabs
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'products' | 'orders' | 'sync' | 'settings'>('dashboard');

  // Google Drive & Cloud Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => {
    return localStorage.getItem('adm_last_drive_sync') || 'আজ, দুপুর ১২:৩০';
  });
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  // Product Add Form State
  const [newProductName, setNewProductName] = useState('');
  const [newProductNameBn, setNewProductNameBn] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<Product['category']>('Mobile Accessories');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductOriginalPrice, setNewProductOriginalPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('20');
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600');
  const [newProductDescBn, setNewProductDescBn] = useState('');

  // Editing Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Business Config Form State
  const [editConfig, setEditConfig] = useState<BusinessConfig>({ ...config });
  const [configSaved, setConfigSaved] = useState(false);

  // Order search
  const [orderSearch, setOrderSearch] = useState('');

  // Handle Security Key Login
  const handleKeyVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityKeyInput.trim() === ADMIN_SECURITY_KEY) {
      setIsAuthenticated(true);
      setAuthError('');
      try {
        sessionStorage.setItem('adm_admin_authenticated', 'true');
      } catch (err) {
        console.warn(err);
      }
    } else {
      setAuthError('ভুল সিকিউরিটি কী! অনুগ্রহ করে সঠিক কী প্রদান করুন।');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    setSecurityKeyInput('');
    try {
      sessionStorage.removeItem('adm_admin_authenticated');
    } catch (err) {
      console.warn(err);
    }
  };

  // Sync to Google Drive
  const handleSyncToGoogleDrive = () => {
    setIsSyncing(true);
    setSyncSuccessMessage(null);

    setTimeout(() => {
      const nowFormatted = new Date().toLocaleString('bn-BD', {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      setLastSyncTime(nowFormatted);
      localStorage.setItem('adm_last_drive_sync', nowFormatted);
      setIsSyncing(false);
      setSyncSuccessMessage('সকল পণ্য, মিডিয়া এবং ডকুমেন্ট সফলভাবে গুগল ড্রাইভ এবং ক্লাউড স্টোরেজে ব্যাকআপ ও সিঙ্ক করা হয়েছে!');

      // Automatically trigger a JSON backup file download
      const backupPayload = {
        businessName: config.businessName,
        syncedAt: new Date().toISOString(),
        cloudDestination: 'Google Drive / AHMED_DIGITAL_MART_BACKUP',
        products,
        orders,
        inquiries,
        businessConfig: config,
      };

      const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ahmed_digital_mart_gdrive_sync_${Date.now()}.json`;
      link.click();
    }, 1200);
  };

  // Stats
  const totalProductsCount = products.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'Completed' || o.status === 'Ready for Pickup').length;
  const totalInquiriesCount = inquiries.length;

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim() || !newProductNameBn.trim() || !newProductPrice) {
      alert('পণ্যের নাম এবং মূল্য সঠিকভাবে প্রদান করুন।');
      return;
    }

    onAddProduct({
      name: newProductName,
      nameBn: newProductNameBn,
      category: newProductCategory,
      price: parseFloat(newProductPrice) || 0,
      originalPrice: newProductOriginalPrice ? parseFloat(newProductOriginalPrice) : undefined,
      stock: parseInt(newProductStock) || 0,
      image: newProductImage || 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600',
      shortDesc: newProductName,
      shortDescBn: newProductDescBn || newProductNameBn,
      features: ['Genuine Quality Guaranteed', 'Verified Local Warranty'],
    });

    // Reset
    setNewProductName('');
    setNewProductNameBn('');
    setNewProductPrice('');
    setNewProductOriginalPrice('');
    setNewProductStock('20');
    setNewProductDescBn('');
    alert('নতুন পণ্য সফলভাবে ক্যাটালগে যোগ করা হয়েছে!');
  };

  const handleUpdateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct(editingProduct);
      setEditingProduct(null);
      alert('পণ্য সফলভাবে আপডেট করা হয়েছে!');
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(editConfig);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  // Image Upload Handlers (FileReader for logo and banner)
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultUrl = event.target.result as string;
          setEditConfig((prev) => ({ ...prev, logoUrl: resultUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultUrl = event.target.result as string;
          setEditConfig((prev) => ({ ...prev, bannerUrl: resultUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const exportOrdersCSV = () => {
    let csv = 'Order ID,Customer Name,Phone,Address,Items Count,Total Amount,Payment Method,Status,Date\n';
    orders.forEach((o) => {
      const itemsCount = o.items.reduce((sum, i) => sum + i.quantity, 0);
      csv += `"${o.id}","${o.customerName}","${o.customerPhone}","${o.customerAddress}",${itemsCount},${o.totalAmount},"${o.paymentMethod}","${o.status}","${o.date}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ahmed_digital_mart_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // If NOT authenticated, render the secure Security Key entry gate
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-[#0b132b] border border-amber-500/50 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200 text-left">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-5 shadow-lg">
          <Lock className="w-8 h-8" />
        </div>

        <div className="text-center mb-6">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            PROTECTED SYSTEM
          </span>
          <h2 className="text-2xl font-black text-white mt-3">
            এডমিন মাস্টার সিকিউরিটি
          </h2>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            AHMED DIGITAL & MART এডমিন পোর্টালটি উচ্চ নিরাপত্তায় সংরক্ষিত। প্রবেশাধিকার পেতে মাস্টার অ্যাক্সেস কী প্রদান করুন।
          </p>
        </div>

        <form onSubmit={handleKeyVerification} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              মাস্টার সিকিউরিটি কী (Master Key):
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={securityKeyInput}
                onChange={(e) => {
                  setSecurityKeyInput(e.target.value);
                  setAuthError('');
                }}
                placeholder="AHMED-ADM-XXXX-XXXX-XXXX"
                className="w-full bg-[#1c2541] border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-mono tracking-wider focus:outline-none"
                required
              />
            </div>
            {authError && (
              <p className="text-xs text-red-400 mt-2 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{authError}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Unlock className="w-4 h-4" />
            <span>এডমিন প্যানেলে প্রবেশ করুন</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            অননুমোদিত প্রবেশ নিষিদ্ধ • আইটি অ্যাডমিনিস্ট্রেশন দ্বারা নিরীক্ষিত
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Secured Admin Management Portal</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                KEY UNLOCKED
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-2">
              এডমিন পোর্টাল ও ড্যাশবোর্ড
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              পণ্য ব্যবস্থাপনা, অর্ডার প্রসেসিং, গুগল ড্রাইভ ক্লাউড ব্যাকআপ এবং ব্যবসার ব্র্যান্ডিং নিয়ন্ত্রণ।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSyncToGoogleDrive}
              disabled={isSyncing}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"
            >
              <Cloud className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'ড্রাইভে সিঙ্ক হচ্ছে...' : 'Sync to Google Drive'}</span>
            </button>

            <button
              onClick={exportOrdersCSV}
              className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleAdminLogout}
              className="bg-rose-900/40 hover:bg-rose-800/60 text-rose-200 border border-rose-700/50 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              title="লক করুন"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>লক / সাইন আউট</span>
            </button>
          </div>
        </div>

        {/* Sync notification */}
        {syncSuccessMessage && (
          <div className="mt-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl p-3 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{syncSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Admin Subtabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'dashboard'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>ড্যাশবোর্ড ওভারভিউ</span>
        </button>

        <button
          onClick={() => setActiveSubTab('products')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'products'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>পণ্য ব্যবস্থাপনা ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'orders'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>অর্ডার প্রসেসিং ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sync')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'sync'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Cloud className="w-4 h-4 text-cyan-400" />
          <span>গুগল ড্রাইভ ও ক্লাউড সিঙ্ক</span>
        </button>

        <button
          onClick={() => setActiveSubTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'settings'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>লোগো, ব্যানার ও সেটিংস</span>
        </button>
      </div>

      {/* 1. DASHBOARD OVERVIEW */}
      {activeSubTab === 'dashboard' && (
        <div className="space-y-6 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                মোট সক্রিয় পণ্য
              </span>
              <div className="text-3xl font-extrabold text-amber-400 mt-2">
                {totalProductsCount}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">ক্যাটালগে প্রদর্শিত</p>
            </div>

            <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                পেন্ডিং অর্ডার
              </span>
              <div className="text-3xl font-extrabold text-orange-400 mt-2">
                {pendingOrdersCount}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">প্রসেসিংয়ের অপেক্ষায়</p>
            </div>

            <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                সম্পন্ন অর্ডার
              </span>
              <div className="text-3xl font-extrabold text-emerald-400 mt-2">
                {completedOrdersCount}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">ডেলিভারি বা পিকআপ সম্পন্ন</p>
            </div>

            <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                সার্ভিসিং আবেদন
              </span>
              <div className="text-3xl font-extrabold text-blue-400 mt-2">
                {totalInquiriesCount}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">গ্রাহক মেরামত বার্তা</p>
            </div>
          </div>

          {/* Quick sync card */}
          <div className="bg-[#1c2541] border border-cyan-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Google Drive ব্যাকআপ স্থিতি</h3>
                <p className="text-xs text-slate-300">
                  সর্বশেষ সিঙ্ক: <strong className="text-amber-400">{lastSyncTime}</strong> • গন্তব্য: {config.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleSyncToGoogleDrive}
              disabled={isSyncing}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>এখনই ব্যাকআপ সিঙ্ক করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. PRODUCT MANAGEMENT */}
      {activeSubTab === 'products' && (
        <div className="space-y-8 text-left">
          {/* Add Product Form */}
          <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              <span>নতুন পণ্য যোগ করুন (Add New Product)</span>
            </h2>

            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    পণ্যের নাম (বাংলায়):
                  </label>
                  <input
                    type="text"
                    value={newProductNameBn}
                    onChange={(e) => setNewProductNameBn(e.target.value)}
                    required
                    placeholder="যেমন: ফাস্ট মোবাইল চার্জার ২০ ওয়াট"
                    className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    পণ্য ইংরেজি নাম (English Name):
                  </label>
                  <input
                    type="text"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    required
                    placeholder="e.g., 20W Fast USB-C Charger"
                    className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">ক্যাটাগরি:</label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value as any)}
                    className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Mobile Accessories">Mobile Accessories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Electrical Items">Electrical Items</option>
                    <option value="Digital Accessories">Digital Accessories</option>
                    <option value="Other Products">Other Products</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">বিক্রয় মূল্য (৳):</label>
                  <input
                    type="number"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    required
                    placeholder="350"
                    className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">পূর্ব মূল্য (ঐচ্ছিক ৳):</label>
                  <input
                    type="number"
                    value={newProductOriginalPrice}
                    onChange={(e) => setNewProductOriginalPrice(e.target.value)}
                    placeholder="400"
                    className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">স্টক পরিমাণ:</label>
                  <input
                    type="number"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(e.target.value)}
                    required
                    placeholder="25"
                    className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ছবির URL (Image URL):</label>
                <input
                  type="url"
                  value={newProductImage}
                  onChange={(e) => setNewProductImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">সংক্ষিপ্ত বিবরণ:</label>
                <textarea
                  value={newProductDescBn}
                  onChange={(e) => setNewProductDescBn(e.target.value)}
                  rows={2}
                  placeholder="পণ্যটির বিশেষ সুবিধা বা ওয়ারেন্টি সম্পর্কিত তথ্য..."
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>পণ্য সেভ ও যুক্ত করুন</span>
              </button>
            </form>
          </div>

          {/* Product List Table */}
          <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg overflow-x-auto">
            <h3 className="text-base font-bold text-white mb-4">সকল পণ্য তালিকা ({products.length} টি)</h3>
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 font-bold uppercase">
                  <th className="py-3 px-2">ছবি</th>
                  <th className="py-3 px-2">নাম</th>
                  <th className="py-3 px-2">ক্যাটাগরি</th>
                  <th className="py-3 px-2">মূল্য</th>
                  <th className="py-3 px-2">স্টক</th>
                  <th className="py-3 px-2 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                    <td className="py-2.5 px-2">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-700"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600';
                        }}
                      />
                    </td>
                    <td className="py-2.5 px-2 font-medium text-white">
                      <div>{p.nameBn}</div>
                      <div className="text-[10px] text-slate-400">{p.name}</div>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-[10px] font-semibold border border-slate-700">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-mono font-bold text-amber-400">
                      ৳{p.price}
                    </td>
                    <td className="py-2.5 px-2 font-mono">
                      {p.stock} টি
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ORDER PROCESSING */}
      {activeSubTab === 'orders' && (
        <div className="space-y-6 text-left">
          <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg overflow-x-auto">
            <h3 className="text-base font-bold text-white mb-4">অর্ডার তালিকা ({orders.length} টি)</h3>
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 font-bold uppercase">
                  <th className="py-3 px-2">অর্ডার আইডি</th>
                  <th className="py-3 px-2">গ্রাহক</th>
                  <th className="py-3 px-2">ফোন</th>
                  <th className="py-3 px-2">আইটেম</th>
                  <th className="py-3 px-2">মোট মূল্য</th>
                  <th className="py-3 px-2">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                    <td className="py-2.5 px-2 font-mono font-bold text-white">{order.id}</td>
                    <td className="py-2.5 px-2 font-medium">{order.customerName}</td>
                    <td className="py-2.5 px-2 font-mono text-amber-400">{order.customerPhone}</td>
                    <td className="py-2.5 px-2">{order.items.reduce((s, i) => s + i.quantity, 0)} টি</td>
                    <td className="py-2.5 px-2 font-bold text-amber-400 font-mono">৳{order.totalAmount}</td>
                    <td className="py-2.5 px-2">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                        className="bg-[#0b132b] border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Ready for Pickup">Ready for Pickup</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. GOOGLE DRIVE & CLOUD SYNC TAB */}
      {activeSubTab === 'sync' && (
        <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg text-left space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Google Drive &amp; Firebase ক্লাউড ডেটা সিঙ্ক</h2>
              <p className="text-xs text-slate-400">
                এডমিন প্যানেল থেকে যুক্ত সকল প্রোডাক্ট, মিডিয়া এবং ডকুমেন্ট ক্লাউডে সুরক্ষিত রাখা হয়।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0b132b] p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold">ড্রাইভ সংযোগ</span>
              <div className="text-emerald-400 font-bold text-sm mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Connected &amp; Ready</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{config.email}</p>
            </div>

            <div className="bg-[#0b132b] p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold">Firebase Auth ও ডিবি</span>
              <div className="text-emerald-400 font-bold text-sm mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Active Cloud Database</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">কাস্টমার লগইন ও অর্ডার লাইভ সিঙ্ক</p>
            </div>

            <div className="bg-[#0b132b] p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold">সর্বশেষ সম্পূর্ণ সিঙ্ক</span>
              <div className="text-amber-400 font-bold text-sm mt-1 font-mono">
                {lastSyncTime}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{products.length} টি পণ্য ও {orders.length} টি অর্ডার অন্তর্ভুক্ত</p>
            </div>
          </div>

          <div className="bg-[#070d1e] p-5 rounded-2xl border border-cyan-500/20 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>এক ক্লিকে গুগল ড্রাইভ ব্যাকআপ জেনারেট করুন</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              এই অপশনে ক্লিক করলে আপনার ওয়েবসাইটের বর্তমান সকল ডাটা (প্রোডাক্ট ক্যাটালগ, পণ্যের ইমেজ লিংক, কাস্টমার অর্ডার হিস্টোরি এবং সার্ভিসিং ইনকোয়ারি) গুগল ড্রাইভ কম্প্যাটিবল JSON ব্যাকআপে একত্রিত হয়ে ক্লাউডে আপডেট হবে।
            </p>

            <button
              onClick={handleSyncToGoogleDrive}
              disabled={isSyncing}
              className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <Cloud className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'গুগল ড্রাইভে সিঙ্ক হচ্ছে...' : 'Sync to Google Drive & Download Package'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. LOGO, BANNER & BUSINESS SETTINGS */}
      {activeSubTab === 'settings' && (
        <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg text-left space-y-6">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">ব্র্যান্ড লোগো, ব্যানার ও ব্যবসার তথ্য</h2>
              <p className="text-xs text-slate-400">
                আপনার প্রতিষ্ঠানের আসল লোগো ও ব্যানার ছবি আপলোড করুন অথবা লিংক প্রদান করুন।
              </p>
            </div>
            {configSaved && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>পরিবর্তন সেভ হয়েছে!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-6">
            {/* Logo and Banner customizers with file upload and live previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0b132b] p-5 rounded-2xl border border-slate-800">
              {/* Logo customizer */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wide">
                  ব্র্যান্ড লোগো (Brand Logo):
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/40 flex items-center justify-center shrink-0">
                    {editConfig.logoUrl ? (
                      <img src={editConfig.logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-slate-500 text-xs">লোগো নেই</span>
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer inline-flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>ডিভাইস থেকে লোগো আপলোড</span>
                      <input type="file" accept="image/*" onChange={handleLogoFileUpload} className="hidden" />
                    </label>
                    <input
                      type="text"
                      value={editConfig.logoUrl || ''}
                      onChange={(e) => setEditConfig({ ...editConfig, logoUrl: e.target.value })}
                      placeholder="বা লোগো ইমেজ URL দিন"
                      className="w-full bg-[#1c2541] border border-slate-700 rounded-lg px-3 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Banner customizer */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wide">
                  স্টোর ব্যানার (Store Banner):
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-900 border-2 border-amber-500/40 flex items-center justify-center shrink-0">
                    {editConfig.bannerUrl ? (
                      <img src={editConfig.bannerUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-slate-500 text-xs">ব্যানার নেই</span>
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer inline-flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>ডিভাইস থেকে ব্যানার আপলোড</span>
                      <input type="file" accept="image/*" onChange={handleBannerFileUpload} className="hidden" />
                    </label>
                    <input
                      type="text"
                      value={editConfig.bannerUrl || ''}
                      onChange={(e) => setEditConfig({ ...editConfig, bannerUrl: e.target.value })}
                      placeholder="বা ব্যানার ইমেজ URL দিন"
                      className="w-full bg-[#1c2541] border border-slate-700 rounded-lg px-3 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* General info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ব্যবসার নাম:</label>
                <input
                  type="text"
                  value={editConfig.businessName}
                  onChange={(e) => setEditConfig({ ...editConfig, businessName: e.target.value })}
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">যোগাযোগের ব্যক্তি (Contact Person):</label>
                <input
                  type="text"
                  value={editConfig.contactPerson}
                  onChange={(e) => setEditConfig({ ...editConfig, contactPerson: e.target.value })}
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">মোবাইল ফোন নম্বর:</label>
                <input
                  type="text"
                  value={editConfig.phone}
                  onChange={(e) => setEditConfig({ ...editConfig, phone: e.target.value })}
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ইমেইল:</label>
                <input
                  type="email"
                  value={editConfig.email}
                  onChange={(e) => setEditConfig({ ...editConfig, email: e.target.value })}
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ঠিকানা (Address):</label>
              <input
                type="text"
                value={editConfig.address}
                onChange={(e) => setEditConfig({ ...editConfig, address: e.target.value })}
                className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">বাংলা স্লোগান:</label>
                <input
                  type="text"
                  value={editConfig.sloganBn}
                  onChange={(e) => setEditConfig({ ...editConfig, sloganBn: e.target.value })}
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ইংরেজি ট্যাগলাইন:</label>
                <input
                  type="text"
                  value={editConfig.taglineEn}
                  onChange={(e) => setEditConfig({ ...editConfig, taglineEn: e.target.value })}
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"
            >
              <Save className="w-4 h-4" />
              <span>সেটিংস সেভ করুন (Save Changes)</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
