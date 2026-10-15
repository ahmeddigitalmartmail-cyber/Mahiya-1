import React, { useState } from 'react';
import { 
  Globe, 
  FileText, 
  Printer, 
  CreditCard, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Search, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { TabType } from '../../types';

interface OnlineServicesTabProps {
  phone: string;
  setActiveTab: (tab: TabType) => void;
}

interface DigitalService {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  descBn: string;
  requirements: string[];
  deliverable: string;
}

export const OnlineServicesTab: React.FC<OnlineServicesTabProps> = ({ phone, setActiveTab }) => {
  const [selectedService, setSelectedService] = useState<string>('job-apply');

  const digitalServices: DigitalService[] = [
    {
      id: 'job-apply',
      title: 'Job Application & Admit Card',
      titleBn: 'চাকরির অনলাইন আবেদন ও এডমিট প্রিন্ট',
      category: 'Employment Services',
      descBn: 'সরকারি ও বেসরকারি চাকরির নির্ভুল ফর্ম পূরণ, ছবি ও স্বাক্ষর সাইজিং এবং এডমিট কার্ড ডাউনলোড ও প্রিন্ট।',
      requirements: [
        'প্রার্থীর ছবি (স্ক্যান কপি বা পাসপোর্ট সাইজ)',
        'ডিজিটাল স্বাক্ষর',
        'সকল শিক্ষাগত যোগ্যতার সনদ ও রোল/রেজিস্ট্রেশন নম্বর',
        'জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন নম্বর',
        'সক্রিয় ব্যক্তিগত মোবাইল নম্বর ও ইমেইল'
      ],
      deliverable: 'আবেদনপত্রের প্রিন্ট কপি (Applicant Copy) ও পেমেন্ট ট্র্যাকিং স্লিপ।'
    },
    {
      id: 'nid-assist',
      title: 'NID Info & Correction Assistance',
      titleBn: 'জাতীয় পরিচয়পত্র (NID) তথ্য ফরম সহায়তা',
      category: 'Citizen Guidance',
      descBn: 'নির্বাচন কমিশনের পোর্টালে অনলাইন একাউন্ট লগইন, ভোটার তথ্য ফরম পূরণ ও সংশোধনের কাগজপত্র প্রস্তুতকরণের কারিগরি সহায়তা।',
      requirements: [
        '১৭ বা ১০ ডিজিটের NID নম্বর',
        'জন্ম তারিখ ও পিতা-মাতার নাম',
        'সংশোধনের স্বপক্ষে প্রমাণাদি (এসএসসি সনদ/পাসপোর্ট/নিকাহনামা)',
        'বায়োমেট্রিক ও ভেরিফিকেশন মোবাইল সিম'
      ],
      deliverable: 'অনলাইন পূরণকৃত আবেদন ফরমের প্রিন্ট কপি।'
    },
    {
      id: 'birth-cert',
      title: 'Birth & Death Registration Guidance',
      titleBn: 'জন্ম ও মৃত্যু নিবন্ধন অনলাইন আবেদন',
      category: 'Civic Services',
      descBn: 'সরকারি পোর্টালে নতুন জন্ম নিবন্ধনের আবেদনপত্র নির্ভুলভাবে সাবমিশন ও ট্র্যাকিং স্লিপ প্রিন্ট।',
      requirements: [
        'পিতা-মাতার জাতীয় পরিচয়পত্র ও অনলাইন জন্ম নিবন্ধন নম্বর',
        'হাসপাতাল বা ইপিআই কার্ডের প্রমাণপত্র',
        'পৌরসভা বা ইউনিয়ন পরিষদের সঠিক হোল্ডিং ও ঠিকানা'
      ],
      deliverable: 'অনলাইন অ্যাপ্লিকেশন সামারি ও ট্র্যাকিং স্লিপ।'
    },
    {
      id: 'print-scan',
      title: 'Color Printing, Scanning & Lamination',
      titleBn: 'হাই-কোয়ালিটি প্রিন্টিং, স্ক্যান ও লেমিনেটিং',
      category: 'Document Studio',
      descBn: 'ডকুমেন্ট রঙিন ও সাদা-কালো ফটোকপি, পাসপোর্ট সাইজ ল্যাব প্রিন্ট, যেকোনো কাগজের পিডিএফ স্ক্যান ও দীর্ঘস্থায়ী লেমিনেশন।',
      requirements: [
        'মূল ডকুমেন্ট অথবা পেনড্রাইভ/হোয়াটসঅ্যাপে ফাইল ট্রান্সফার'
      ],
      deliverable: 'লেজার প্রিন্ট, রঙিন গ্লসি প্রিন্ট অথবা সিলড লেমিনেটেড পেপার।'
    },
    {
      id: 'e-challan',
      title: 'Online Challan & Fee Form Assistance',
      titleBn: 'ই-চালান ও অনলাইন ফি ফরম প্রস্তুতকরণ',
      category: 'Fee Preparation',
      descBn: 'পাসপোর্ট ফি, ড্রাইভিং লাইসেন্স ফি ও বিআরটিএ চালান পূরণের তথ্য ও রশিদ ডাউনলোডের সহায়তা।',
      requirements: [
        'আবেদনকারীর নাম ও সঠিক সেবা কোড',
        'ফি এর সঠিক পরিমাণ'
      ],
      deliverable: 'ব্যাংক জমা দেওয়ার চালান কপি বা অনলাইন পেমেন্ট রসিদ।'
    }
  ];

  const currentService = digitalServices.find(s => s.id === selectedService) || digitalServices[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Digital Assistance Center</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            অনলাইন ডিজিটাল সেবাসমূহ (Online Services)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            চাকরির আবেদন, এনআইডি ও নাগরিক ফর্ম, কম্পিউটার টাইপিং, রঙিন প্রিন্ট ও স্ক্যানিং সেবা।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Services Navigation List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
            সেবা নির্বাচন করুন (Select Service)
          </h3>
          {digitalServices.map((service) => {
            const isSelected = selectedService === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-700/30'
                    : 'bg-[#1c2541] text-slate-200 border-slate-700/60 hover:border-slate-500'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-blue-200' : 'text-amber-400'}`}>
                    {service.category}
                  </span>
                  <h4 className="font-bold text-sm mt-0.5">{service.titleBn}</h4>
                  <p className={`text-xs mt-0.5 line-clamp-1 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {service.title}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${isSelected ? 'translate-x-1' : 'text-slate-500 group-hover:text-slate-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Selected Service Detail Panel */}
        <div className="lg:col-span-7 bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {currentService.category}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                {currentService.titleBn}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            {currentService.descBn}
          </p>

          {/* Requirements Checklist */}
          <div className="mb-6 bg-[#0b132b] p-5 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold uppercase text-amber-400 mb-3 tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>প্রয়োজনীয় কাগজপত্র ও তথ্যের তালিকা:</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              {currentService.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="mb-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
            <span className="text-slate-400 block mb-1 font-semibold">গ্রাহক যা পাবেন:</span>
            <span className="text-white font-medium">{currentService.deliverable}</span>
          </div>

          {/* Official Disclaimer */}
          <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3.5 text-xs text-amber-300 flex items-start gap-2.5 mb-6">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>আইনি ও সেবা সতর্কতা:</strong> আমরা কোনো সরকারি দপ্তর বা অনুমোদনকারী কর্তৃপক্ষ নই। আমরা শুধুমাত্র কম্পিউটার টাইপিং, ফর্ম পূরণ ও টেকনিক্যাল সহযোগিতা প্রদান করি। সকল সরকারি ফি সরকার নির্ধারিত অ্যাকাউন্টে জমা হয়।
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`tel:${phone}`}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>সেবা পেতে কল করুন ({phone})</span>
            </a>

            <button
              onClick={() => setActiveTab('contact')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2.5 rounded-xl text-xs font-semibold"
            >
              যোগাযোগ ফর্ম খুলুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
