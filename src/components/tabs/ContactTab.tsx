import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ExternalLink, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { BusinessConfig } from '../../types';

interface ContactTabProps {
  config: BusinessConfig;
}

export const ContactTab: React.FC<ContactTabProps> = ({ config }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং বার্তা সঠিকভাবে পূরণ করুন।');
      return;
    }

    if (phone.length < 11) {
      alert('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।');
      return;
    }

    setSubmittedStatus(true);
    setName('');
    setPhone('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Support Desk</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            যোগাযোগ করুন (Contact Us)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            পণ্য অর্ডার, মেরামত ডায়াগনোসিস বা যেকোনো সেবার জন্য সরাসরি যোগাযোগ করুন।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Channels */}
        <div className="lg:col-span-5 bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {config.businessName}
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              সরাসরি যোগাযোগ চ্যানেল
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              জরুরি প্রয়োজনে সরাসরি কল বা দোকানে আসার জন্য নিচের চ্যানেলগুলো ব্যবহার করুন।
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3 bg-[#0b132b] p-3.5 rounded-xl border border-slate-800">
              <UserCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">দায়িত্বপ্রাপ্ত যোগাযোগকারী:</span>
                <span className="text-white font-bold text-base">{config.contactPerson}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#0b132b] p-3.5 rounded-xl border border-slate-800">
              <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-slate-400 block text-[11px]">মোবাইল ফোন (কল করুন):</span>
                <a
                  href={`tel:${config.phone}`}
                  className="text-amber-400 font-extrabold text-base hover:underline block mt-0.5"
                >
                  {config.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#0b132b] p-3.5 rounded-xl border border-slate-800">
              <Mail className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-slate-400 block text-[11px]">অফিসিয়াল ইমেইল:</span>
                <a
                  href={`mailto:${config.email}`}
                  className="text-slate-200 hover:text-white font-medium break-all block mt-0.5"
                >
                  {config.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#0b132b] p-3.5 rounded-xl border border-slate-800">
              <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">প্রতিষ্ঠানের ঠিকানা:</span>
                <span className="text-slate-200 leading-relaxed block mt-0.5">{config.address}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <a
              href={`tel:${config.phone}`}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now ({config.phone})</span>
            </a>

            <a
              href={`mailto:${config.email}`}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Send Email</span>
            </a>

            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-900/40 hover:bg-blue-900/60 text-blue-200 border border-blue-700/50 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Open Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-3">
            <Send className="w-5 h-5 text-blue-400" />
            <span>বার্তা পাঠান (Send Message)</span>
          </h2>

          {submittedStatus && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>বার্তা সফলভাবে তৈরি হয়েছে (Local Demo)!</span>
              </div>
              <p className="text-xs text-slate-300">
                ধন্যবাদ! আপনার বার্তাটি লোকাল মেমোরিতে রেকর্ড হয়েছে। সরাসরি সমাধানের জন্য আমাদের মোবাইল নম্বরে ফোন করার অনুরোধ করা হচ্ছে।
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  আপনার নাম (Name):
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার পূর্ণ নাম"
                  required
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  মোবাইল নম্বর (Phone):
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))}
                  placeholder="01XXXXXXXXX"
                  required
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  ইমেইল এড্রেস (ঐচ্ছিক):
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  বিষয় (Subject):
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="যেমন: পণ্য সংক্রান্ত / রিচার্জ জিজ্ঞাসা"
                  required
                  className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                আপনার বার্তা (Message):
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="আপনার জিজ্ঞাসা বা বার্তার বিবরণ লিখুন..."
                required
                className="w-full bg-[#0b132b] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3 text-[11px] text-amber-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>স্বচ্ছতা নোটিশ:</strong> এসএমটিপি মেইল সার্ভার বা ডাটাবেস ছাড়া সরাসরি ইমেইল সেন্ডিং ক্লায়েন্ট সাইডে সম্পন্ন হয় না। তাত্ক্ষণিক সহায়তায় সরাসরি ফোন বা ইমেইল অ্যাপ ব্যবহার করুন।
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-blue-700/30 transition-all"
            >
              বার্তা পাঠান (Send Message)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
