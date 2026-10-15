import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShoppingBag, 
  Phone,
  FileText
} from 'lucide-react';
import { Order, TabType } from '../../types';

interface OrdersTabProps {
  orders: Order[];
  phone: string;
  setActiveTab: (tab: TabType) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ orders, phone, setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>সম্পন্ন (Completed)</span>
          </span>
        );
      case 'Ready for Pickup':
        return (
          <span className="bg-blue-500/15 text-blue-400 border border-blue-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>পিকআপের জন্য প্রস্তুত</span>
          </span>
        );
      case 'Processing':
        return (
          <span className="bg-purple-500/15 text-purple-400 border border-purple-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>প্রসেসিং হচ্ছে</span>
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>অপেক্ষমান (Pending)</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-blue-500/15 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Package className="w-3.5 h-3.5" />
            <span>Order History & Tracking</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            আমার অর্ডারসমূহ (My Orders)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            আপনার সাম্প্রতিক অর্ডারের স্থিতি ও ট্র্যাকিং বিবরণী।
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="অর্ডার আইডি বা মোবাইল নম্বর দিয়ে খুঁজুন..."
            className="w-full bg-[#0b132b] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-auto bg-[#0b132b] border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500"
        >
          <option value="All">সকল স্ট্যাটাস (All Status)</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Ready for Pickup">Ready for Pickup</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-12 text-center text-slate-400">
          <Package className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <h3 className="text-lg font-bold text-white mb-1">কোনো অর্ডার রেকর্ড নেই</h3>
          <p className="text-xs max-w-sm mx-auto mb-4">
            শপিং কার্ট থেকে কোনো অর্ডার সম্পন্ন করলে তার রেকর্ড এখানে প্রদর্শিত হবে।
          </p>
          <button
            onClick={() => setActiveTab('products')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs"
          >
            পণ্য তালিকায় যান
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg space-y-4 hover:border-amber-500/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-white text-base">
                      {order.id}
                    </span>
                    <span className="bg-slate-800 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                      DEMO ORDER
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    তারিখ: {order.date}
                  </span>
                </div>

                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Customer details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0b132b] p-3 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">গ্রাহকের নাম:</span>
                  <span className="text-white font-medium">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">মোবাইল নম্বর:</span>
                  <span className="text-amber-400 font-mono font-bold">{order.customerPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">পেমেন্ট মাধ্যম:</span>
                  <span className="text-slate-200">{order.paymentMethod}</span>
                </div>
              </div>

              {/* Items ordered */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">
                  অর্ডারের আইটেমসমূহ:
                </h4>
                <div className="space-y-1.5">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-xs py-1 px-2.5 rounded bg-slate-800/50"
                    >
                      <span className="text-slate-200">
                        {item.product.nameBn} <strong className="text-amber-400">× {item.quantity}</strong>
                      </span>
                      <span className="font-bold text-white">
                        ৳{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & Footer Note */}
              <div className="pt-3 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  {order.notes && (
                    <span>নোট: “{order.notes}”</span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">মোট মূল্য:</span>
                    <span className="text-xl font-black text-amber-400">৳{order.totalAmount}</span>
                  </div>

                  <a
                    href={`tel:${phone}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>হেল্পলাইন</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
