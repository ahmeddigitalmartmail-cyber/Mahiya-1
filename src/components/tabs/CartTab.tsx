import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  CheckCircle2, 
  AlertCircle, 
  X,
  CreditCard,
  Building,
  Phone,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { CartItem, CustomerUser, Order, TabType } from '../../types';

interface CartTabProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => void;
  setActiveTab: (tab: TabType) => void;
  phone: string;
  currentUser: CustomerUser | null;
  onOpenLoginModal: () => void;
}

export const CartTab: React.FC<CartTabProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  setActiveTab,
  phone,
  currentUser,
  onOpenLoginModal,
}) => {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery / In-Shop' | 'bKash / Nagad Payment (Manual)'>('Cash on Delivery / In-Shop');
  const [orderNotes, setOrderNotes] = useState('');

  // Sync customer details when logged in
  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name || '');
      setCustomerPhone(currentUser.phone || '');
      setCustomerAddress(currentUser.address || '');
    }
  }, [currentUser]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    if (!currentUser) {
      onOpenLoginModal();
      return;
    }
    setCheckoutModalOpen(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('অনুগ্রহ করে নাম, ফোন নম্বর এবং সম্পূর্ণ ঠিকানা পূরণ করুন।');
      return;
    }

    if (customerPhone.length < 11) {
      alert('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।');
      return;
    }

    onPlaceOrder({
      customerName,
      customerPhone,
      customerAddress,
      items: [...cart],
      totalAmount: subtotal,
      paymentMethod,
      notes: orderNotes,
    });

    setCheckoutModalOpen(false);
    onClearCart();
    setActiveTab('orders');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-orange-500/15 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Shopping Cart</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            শপিং কার্ট (Shopping Cart)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            আপনার নির্বাচিত পণ্যসামগ্রীর তালিকা ও অর্ডার নিশ্চিত করার ইন্টারফেস।
          </p>
        </div>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-[#1c2541] border border-slate-700/60 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xl">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
            <ShoppingCart className="w-10 h-10 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">আপনার শপিং কার্ট খালি</h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
            ক্যাটালগ থেকে আপনার পছন্দের মোবাইল চার্জার, কেবল বা ইলেকট্রিক্যাল সামগ্রী কার্টে যোগ করুন।
          </p>
          <button
            onClick={() => setActiveTab('products')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>পণ্য ক্যাটালগ দেখুন</span>
          </button>
        </div>
      ) : (
        /* Populated Cart Content */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
                <h2 className="text-base font-bold text-white">
                  নির্বাচিত পণ্যের তালিকা ({cart.length} টি আইটেম)
                </h2>
                <button
                  onClick={onClearCart}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>কার্ট খালি করুন</span>
                </button>
              </div>

              <div className="space-y-4 divide-y divide-slate-800">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600';
                          }}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                          {item.product.category}
                        </span>
                        <h3 className="text-sm font-bold text-white">
                          {item.product.nameBn}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          একক মূল্য: ৳{item.product.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                      {/* Quantity counter */}
                      <div className="flex items-center border border-slate-700 rounded-xl bg-[#0b132b] overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-1 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="text-right min-w-[70px]">
                        <span className="text-sm font-black text-amber-400 font-mono">
                          ৳{item.product.price * item.quantity}
                        </span>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary & Checkout CTA */}
          <div className="lg:col-span-4 bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3">
              অর্ডার সারসংক্ষেপ (Summary)
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-300">
                <span>পণ্যের উপমোট (Subtotal):</span>
                <span className="font-bold text-white font-mono">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>পিকআপ / ডেলিভারি:</span>
                <span className="font-bold text-emerald-400">দোকান থেকে ফ্রি পিকআপ</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>ভ্যাট / কর:</span>
                <span className="font-bold text-white">৳০.০০</span>
              </div>
              <div className="pt-3 border-t border-slate-700 flex justify-between items-baseline">
                <span className="text-base font-bold text-white">সর্বমোট মূল্য:</span>
                <span className="text-2xl font-black text-amber-400 font-mono">৳{subtotal}</span>
              </div>
            </div>

            {/* Login requirement notice */}
            {!currentUser ? (
              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  অর্ডার নিশ্চিত করতে আপনার <strong>গুগল অ্যাকাউন্ট</strong> দিয়ে লগইন করা প্রয়োজন।
                </span>
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>গুগল আইডি: {currentUser.name}</span>
              </div>
            )}

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <span>{currentUser ? 'Proceed to Order' : 'Login with Google to Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c2541] border border-slate-700 max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              CHECKOUT CONFIRMATION
            </span>
            <h3 className="text-xl font-bold text-white mt-1 mb-2">
              অর্ডার নিশ্চিতকরণ ও গ্রাহক তথ্য
            </h3>

            {currentUser && (
              <div className="mb-4 bg-[#0b132b] p-3 rounded-xl border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>যাচাইকৃত গুগল একাউন্ট: <strong>{currentUser.email}</strong></span>
              </div>
            )}

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  আপনার নাম (Full Name):
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                  required
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  মোবাইল নম্বর (১১ ডিজিট):
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))}
                  placeholder="01XXXXXXXXX"
                  required
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  পিকআপ বা ডেলিভারি ঠিকানা:
                </label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="গ্রাম / বাজার / এলাকা (যেমন: বিপ্র অজগরা, তেরখাদা)"
                  required
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  পেমেন্ট পদ্ধতি:
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Cash on Delivery / In-Shop">দোকানে সরাসরি নগদ প্রদান / পিকআপ (Cash on Delivery)</option>
                  <option value="bKash / Nagad Payment (Manual)">বিকাশ / নগদ ম্যানুয়াল সেন্ড মানি (Manual Transfer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  অর্ডার সংক্রান্ত বিশেষ নোট (ঐচ্ছিক):
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="যেমন: কাল সকালে দোকানে এসে তুলে নেব"
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="bg-[#0b132b] p-3 rounded-xl border border-slate-800 flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">পরিশোধযোগ্য মোট টাকা:</span>
                <span className="font-extrabold text-amber-400 text-lg font-mono">৳{subtotal}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
              >
                অর্ডার নিশ্চিত করুন (Confirm Order)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
