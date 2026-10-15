/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  INITIAL_BUSINESS_CONFIG, 
  INITIAL_INQUIRIES, 
  INITIAL_OFFERS, 
  INITIAL_ORDERS, 
  INITIAL_PRODUCTS, 
  INITIAL_SERVICES 
} from './data/initialData';
import { 
  BusinessConfig, 
  CartItem, 
  CustomerUser,
  OfferItem, 
  Order, 
  Product, 
  ServicingInquiry, 
  TabType 
} from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomerAuthModal } from './components/CustomerAuthModal';

// Tab Components
import { HomeTab } from './components/tabs/HomeTab';
import { AboutTab } from './components/tabs/AboutTab';
import { ServicesTab } from './components/tabs/ServicesTab';
import { ProductsTab } from './components/tabs/ProductsTab';
import { RechargeTab } from './components/tabs/RechargeTab';
import { ElectronicsTab } from './components/tabs/ElectronicsTab';
import { ElectricalTab } from './components/tabs/ElectricalTab';
import { ServicingTab } from './components/tabs/ServicingTab';
import { OnlineServicesTab } from './components/tabs/OnlineServicesTab';
import { OffersTab } from './components/tabs/OffersTab';
import { CartTab } from './components/tabs/CartTab';
import { OrdersTab } from './components/tabs/OrdersTab';
import { ProfileTab } from './components/tabs/ProfileTab';
import { ContactTab } from './components/tabs/ContactTab';
import { MapTab } from './components/tabs/MapTab';
import { AdminTab } from './components/tabs/AdminTab';

// Global toast / quick alert notification
import { ShoppingBag, Check, X, Phone, LogIn } from 'lucide-react';

export default function App() {
  // Active Tab state synced with URL hash
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Customer Authentication state (Google Account)
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem('adm_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingCartAction, setPendingCartAction] = useState<Product | null>(null);

  // Business config
  const [config, setConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem('adm_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.logoUrl) parsed.logoUrl = INITIAL_BUSINESS_CONFIG.logoUrl;
        if (!parsed.bannerUrl) parsed.bannerUrl = INITIAL_BUSINESS_CONFIG.bannerUrl;
        return parsed;
      }
      return INITIAL_BUSINESS_CONFIG;
    } catch {
      return INITIAL_BUSINESS_CONFIG;
    }
  });

  // Product catalog state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('adm_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Shopping cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('adm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Customer orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('adm_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Servicing inquiries
  const [inquiries, setInquiries] = useState<ServicingInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('adm_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // Offers & services
  const [offers] = useState<OfferItem[]>(INITIAL_OFFERS);
  const [services] = useState(INITIAL_SERVICES);

  // Global Product Modal (for home/quick view)
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem('adm_config', JSON.stringify(config));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('adm_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('adm_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('adm_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('adm_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('adm_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('adm_current_user');
      }
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [currentUser]);

  // Hash Navigation Handler
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabType;
      const validTabs: TabType[] = [
        'home', 'about', 'services', 'products', 'recharge', 
        'electronics', 'electrical', 'servicing', 'online-services', 
        'offers', 'cart', 'orders', 'profile', 'contact', 'map', 'admin'
      ];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const switchTab = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Direct add item helper
  const executeAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`"${product.nameBn}" কার্টে যোগ করা হয়েছে!`);
  };

  // Cart operations with Login requirement
  const handleAddToCart = (product: Product) => {
    if (!currentUser) {
      setPendingCartAction(product);
      setAuthModalOpen(true);
      return;
    }
    executeAddToCart(product);
  };

  // Login handler
  const handleLoginSuccess = (user: CustomerUser) => {
    setCurrentUser(user);
    showToast(`স্বাগতম, ${user.name}! গুগল লগইন সফল হয়েছে।`);

    // Execute pending cart action if any
    if (pendingCartAction) {
      executeAddToCart(pendingCartAction);
      setPendingCartAction(null);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('সফলভাবে সাইন আউট হয়েছেন।');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePlaceOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: 'ADM-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleString('bn-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Pending',
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`অর্ডার #${newOrder.id} সফলভাবে তৈরি হয়েছে!`);
  };

  // Servicing Inquiries
  const handleAddInquiry = (inquiryData: Omit<ServicingInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: ServicingInquiry = {
      ...inquiryData,
      id: 'INQ-' + Date.now().toString().slice(-5),
      createdAt: new Date().toLocaleString('bn-BD', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Submitted',
    };
    setInquiries((prev) => [newInq, ...prev]);
    showToast(`সার্ভিসিং অনুরোধ #${newInq.id} জমা হয়েছে!`);
  };

  // Product Management (Admin)
  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...newProductData,
      id: 'prod-' + Date.now(),
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`পণ্য "${newProd.nameBn}" ক্যাটালগে যুক্ত হয়েছে!`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('পণ্য তালিকা থেকে অপসারণ করা হয়েছে!');
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === updatedProduct.id
          ? { ...item, product: updatedProduct }
          : item
      )
    );
    showToast(`পণ্য "${updatedProduct.nameBn}" আপডেট করা হয়েছে!`);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`অর্ডার #${orderId} স্ট্যাটাস আপডেট: ${status}`);
  };

  // Total cart items count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Connected Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={switchTab}
        cartCount={cartCount}
        config={config}
        currentUser={currentUser}
        onOpenLoginModal={() => setAuthModalOpen(true)}
      />

      {/* Main Tab Router Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all">
        {activeTab === 'home' && (
          <HomeTab
            config={config}
            setActiveTab={switchTab}
            featuredProducts={products.slice(0, 4)}
            services={services}
            onAddToCart={handleAddToCart}
            onOpenProductDetails={(prod) => setModalProduct(prod)}
          />
        )}

        {activeTab === 'about' && (
          <AboutTab
            config={config}
            setActiveTab={switchTab}
          />
        )}

        {activeTab === 'services' && (
          <ServicesTab
            services={services}
            setActiveTab={switchTab}
            phone={config.phone}
          />
        )}

        {activeTab === 'products' && (
          <ProductsTab
            products={products}
            onAddToCart={handleAddToCart}
            phone={config.phone}
          />
        )}

        {activeTab === 'recharge' && (
          <RechargeTab
            phone={config.phone}
            setActiveTab={switchTab}
          />
        )}

        {activeTab === 'electronics' && (
          <ElectronicsTab
            products={products.filter((p) => p.category === 'Electronics' || p.category === 'Mobile Accessories')}
            onAddToCart={handleAddToCart}
            phone={config.phone}
            setActiveTab={switchTab}
          />
        )}

        {activeTab === 'electrical' && (
          <ElectricalTab
            products={products.filter((p) => p.category === 'Electrical Items')}
            onAddToCart={handleAddToCart}
            phone={config.phone}
            setActiveTab={switchTab}
          />
        )}

        {activeTab === 'servicing' && (
          <ServicingTab
            phone={config.phone}
            inquiries={inquiries}
            onAddInquiry={handleAddInquiry}
          />
        )}

        {activeTab === 'online-services' && (
          <OnlineServicesTab
            phone={config.phone}
            setActiveTab={switchTab}
          />
        )}

        {activeTab === 'offers' && (
          <OffersTab
            offers={offers}
            setActiveTab={switchTab}
            phone={config.phone}
          />
        )}

        {activeTab === 'cart' && (
          <CartTab
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
            setActiveTab={switchTab}
            phone={config.phone}
            currentUser={currentUser}
            onOpenLoginModal={() => setAuthModalOpen(true)}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersTab
            orders={orders}
            phone={config.phone}
            setActiveTab={switchTab}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            orders={orders}
            setActiveTab={switchTab}
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            onOpenLoginModal={() => setAuthModalOpen(true)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactTab
            config={config}
          />
        )}

        {activeTab === 'map' && (
          <MapTab
            config={config}
          />
        )}

        {activeTab === 'admin' && (
          <AdminTab
            products={products}
            orders={orders}
            inquiries={inquiries}
            config={config}
            onUpdateConfig={(newCfg) => setConfig(newCfg)}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={handleUpdateProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </main>

      {/* Global Product Details Modal */}
      {modalProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c2541] border border-slate-700 max-w-lg w-full rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-left">
            <button
              onClick={() => setModalProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {modalProduct.category}
            </span>
            <h3 className="text-xl font-bold text-white mt-1 mb-3">
              {modalProduct.nameBn}
            </h3>

            <div className="h-56 bg-slate-900 rounded-xl overflow-hidden mb-4">
              <img
                src={modalProduct.image}
                alt={modalProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600';
                }}
              />
            </div>

            <div className="flex items-center justify-between bg-[#0b132b] p-3.5 rounded-xl border border-slate-800 mb-4">
              <div>
                <span className="text-xs text-slate-400 block">বর্তমান খুচরা মূল্য:</span>
                <span className="text-2xl font-extrabold text-amber-400 font-mono">৳{modalProduct.price}</span>
                {modalProduct.originalPrice && (
                  <span className="text-xs text-slate-400 line-through ml-2 font-mono">
                    ৳{modalProduct.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                ইন স্টক ({modalProduct.stock} টি)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 mb-6 leading-relaxed">
              {modalProduct.shortDescBn}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  handleAddToCart(modalProduct);
                  setModalProduct(null);
                }}
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <a
                href={`tel:${config.phone}`}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Phone className="w-4 h-4" />
                <span>সরাসরি কল করে অর্ডার</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Customer Login Modal (Required for Add-to-cart & Checkout) */}
      <CustomerAuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setPendingCartAction(null);
        }}
        onLoginSuccess={handleLoginSuccess}
        actionReason={
          pendingCartAction
            ? `"${pendingCartAction.nameBn}" পণ্যটি কার্টে যোগ করতে এবং অর্ডার করতে দয়া করে আপনার গুগল অ্যাকাউন্ট দিয়ে লগইন করুন।`
            : 'অর্ডার সম্পন্ন করতে এবং পণ্য ক্রয় করতে দয়া করে আপনার গুগল অ্যাকাউন্ট দিয়ে লগইন করুন।'
        }
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-amber-500/60 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-bottom duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer
        config={config}
        setActiveTab={switchTab}
      />
    </div>
  );
}
