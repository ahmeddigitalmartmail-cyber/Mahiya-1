import React, { useState } from 'react';
import { 
  Wrench, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Cpu, 
  Smartphone, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { ServicingInquiry } from '../../types';

interface ServicingTabProps {
  phone: string;
  inquiries: ServicingInquiry[];
  onAddInquiry: (inquiry: Omit<ServicingInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const ServicingTab: React.FC<ServicingTabProps> = ({
  phone,
  inquiries,
  onAddInquiry,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deviceType, setDeviceType] = useState('Smartphone');
  const [problemDesc, setProblemDesc] = useState('');
  const [contactMethod, setContactMethod] = useState<'Phone Call' | 'WhatsApp' | 'SMS'>('Phone Call');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !problemDesc.trim()) {
      alert('অনুগ্রহ করে নাম, ফোন নম্বর এবং সমস্যার বিবরণ সঠিকভাবে পূরণ করুন।');
      return;
    }

    if (customerPhone.length < 11) {
      alert('সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন।');
      return;
    }

    onAddInquiry({
      customerName,
      phone: customerPhone,
      deviceType,
      problemDesc,
      contactMethod,
    });

    const ticketId = 'SRV-' + Date.now().toString().slice(-5);
    setSubmittedTicket(ticketId);

    // Reset form
    setCustomerName('');
    setCustomerPhone('');
    setProblemDesc('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Device Diagnostics & Servicing</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            সার্ভিসিং ও মেরামত অনুসন্ধান (Servicing Desk)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            মোবাইল ফোন ও ইলেকট্রনিক গ্যাজেটের চার্জিং সমস্যা, বাটন, ডিসপ্লে ও সাধারণ ডায়াগনোসিস সহায়তা।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container */}
        <div className="lg:col-span-7 bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
            <Wrench className="w-5 h-5 text-emerald-400" />
            <span>সার্ভিসিং অনুসন্ধান ফর্ম (Inquiry Form)</span>
          </h2>

          {submittedTicket && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>অনুসন্ধান সফলভাবে রেকর্ড করা হয়েছে (Local Demo)!</span>
              </div>
              <p className="text-xs text-slate-300">
                আপনার ডেমো অনুসন্ধান ট্র্যাকিং আইডি: <strong className="text-white font-mono">{submittedTicket}</strong>। আমাদের টেকনিশিয়ান শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                আপনার নাম (Customer Name):
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="যেমন: মোঃ আলী আহমেদ"
                required
                className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                মোবাইল নম্বর (Phone Number):
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
                ডিভাইসের ধরণ (Device Type):
              </label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Smartphone">স্মার্টফোন (Smartphone)</option>
                <option value="Feature Phone">বাটন ফোন (Feature Phone)</option>
                <option value="Charger / Adapter">চার্জার / পাওয়ার এডাপ্টার</option>
                <option value="Bluetooth Earbuds / Neckband">ব্লুটুথ ইয়ারবাডস / নেকব্যান্ড</option>
                <option value="Portable Soundbox">পোর্টেবল ব্লুটুথ সাউন্ডবক্স</option>
                <option value="Multiplug / Electrical Gear">মাল্টিপ্লাগ / ইলেকট্রিক্যাল পণ্য</option>
                <option value="Other Electronics">অন্যান্য ইলেকট্রনিক গ্যাজেট</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                সমস্যার বিবরণ (Problem Description):
              </label>
              <textarea
                value={problemDesc}
                onChange={(e) => setProblemDesc(e.target.value)}
                rows={3}
                placeholder="ডিভাইসের সমস্যা বিস্তারিত লিখুন (যেমন: চার্জিং পোর্ট ঢিলা, সাউন্ড কম, অন হয় না)..."
                required
                className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                পছন্দের যোগাযোগের মাধ্যম:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Phone Call', 'WhatsApp', 'SMS'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setContactMethod(method)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      contactMethod === method
                        ? 'bg-blue-600 text-white border-blue-400'
                        : 'bg-[#0b132b] text-slate-300 border-slate-700'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Demonstration Mode Disclaimer */}
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3 text-[11px] text-amber-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>ডেমো মোড বিজ্ঞপ্তি:</strong> ক্লাউড ব্যাকএন্ড ব্যতীত এই ফর্মের তথ্য ব্রাউজারের লোকাল মেমোরিতে সংরক্ষিত হয়। জরুরি ডায়াগনোসিসের জন্য সরাসরি আমাদের দোকানে ডিভাইস নিয়ে আসুন।
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-emerald-700/30 transition-all"
            >
              অনুসন্ধান জমা দিন (Submit Inquiry)
            </button>
          </form>
        </div>

        {/* Servicing Policy & History */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-700 pb-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>সার্ভিসিং কাজের শর্তাবলী</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>ডিভাইস সরাসরি যাচাইয়ের পরেই মেরামত খরচ ও সময় সঠিকভাবে জানানো হয়।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>যেকোনো সার্ভিসিংয়ে গ্রাহকের সিম ও মেমোরি কার্ড আলাদা রাখার পরামর্শ দেওয়া হয়।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>সার্ভিসিং সম্পন্ন হলে এসএমএস বা ফোন কলের মাধ্যমে অবহিত করা হয়।</span>
              </li>
            </ul>
          </div>

          {/* Local Inquiry History */}
          <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 shadow-lg">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-700 pb-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>সাম্প্রতিক অনুসন্ধান রেকর্ড ({inquiries.length})</span>
            </h3>

            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">
                কোনো সক্রিয় অনুসন্ধান রেকর্ড পাওয়া যায়নি।
              </p>
            ) : (
              <div className="space-y-2.5">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-[#0b132b] p-3 rounded-xl border border-slate-800 text-xs"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">{inq.deviceType}</span>
                      <span className="bg-blue-500/15 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-slate-300 line-clamp-1 mb-1">{inq.problemDesc}</p>
                    <div className="text-[11px] text-slate-400">
                      গ্রাহক: {inq.customerName} ({inq.phone})
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-800">
              <a
                href={`tel:${phone}`}
                className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>জরুরি প্রয়োজনে কল করুন: {phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
