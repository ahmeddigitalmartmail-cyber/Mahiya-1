import React, { useState } from 'react';
import { 
  Smartphone, 
  Zap, 
  Send, 
  Wallet, 
  Cpu, 
  Power, 
  Wrench, 
  Globe, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  X,
  ShieldCheck
} from 'lucide-react';
import { ServiceItem, TabType } from '../../types';

interface ServicesTabProps {
  services: ServiceItem[];
  setActiveTab: (tab: TabType) => void;
  phone: string;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({ services, setActiveTab, phone }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-blue-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Send':
        return <Send className="w-6 h-6 text-pink-400" />;
      case 'Wallet':
        return <Wallet className="w-6 h-6 text-orange-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Power':
        return <Power className="w-6 h-6 text-emerald-400" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-yellow-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-indigo-400" />;
      default:
        return <Zap className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Services Header */}
      <div className="bg-gradient-to-r from-[#111d4a] to-[#1c2541] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-blue-500/15 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Comprehensive Solutions</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            আমাদের সেবাসমূহ (Our Services)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            টেলিকম রিচার্জ, মোবাইল এক্সেসরিজ, ইলেকট্রিক্যাল মালামাল, ডিভাইস ডায়াগনোসিস ও ডিজিটাল অনলাইন সহায়তার পূর্ণাঙ্গ সেবা।
          </p>
        </div>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#1c2541] border border-slate-700/60 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getServiceIcon(service.iconName)}
                </div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-800/80 px-2 py-0.5 rounded">
                  {service.category}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                {service.titleBn}
              </h2>
              <h3 className="text-xs text-amber-500/90 font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {service.descBn}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors border border-slate-700"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className="w-full bg-blue-600/90 hover:bg-blue-600 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact</span>
                </button>
              </div>

              {service.id === 'mobile-recharge' && (
                <button
                  onClick={() => setActiveTab('recharge')}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>সরাসরি রিচার্জ ফরম ওপেন করুন</span>
                </button>
              )}

              {service.id === 'device-servicing' && (
                <button
                  onClick={() => setActiveTab('servicing')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>সার্ভিসিং অনুসন্ধান ফরম দিন</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c2541] border border-slate-700 max-w-lg w-full rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                {getServiceIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  {selectedService.category}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {selectedService.titleBn}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
              {selectedService.descBn}
            </p>

            {/* Service details points */}
            <div className="mb-4">
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">
                সেবার মূল অন্তর্ভুক্তিসমূহ:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {selectedService.detailsBn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="mb-4 bg-[#0b132b] p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase text-amber-400 mb-1.5 tracking-wider">
                প্রয়োজনীয় তথ্য বা শর্তাবলী:
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedService.requirementsBn.map((req, idx) => (
                  <li key={idx}>• {req}</li>
                ))}
              </ul>
            </div>

            {/* Disclaimer notice if any */}
            {selectedService.noticeBn && (
              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-[11px] text-amber-300 flex items-start gap-2 mb-6">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{selectedService.noticeBn}</span>
              </div>
            )}

            <div className="flex gap-3">
              <a
                href={`tel:${phone}`}
                className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>কল করে সেবা গ্রহণ করুন</span>
              </a>

              <button
                onClick={() => {
                  setSelectedService(null);
                  setActiveTab('contact');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold"
              >
                Contact Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
