import React from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Phone, 
  Compass, 
  Map, 
  CheckCircle2 
} from 'lucide-react';
import { BusinessConfig } from '../../types';

interface MapTabProps {
  config: BusinessConfig;
}

export const MapTab: React.FC<MapTabProps> = ({ config }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111d4a] via-[#1c2541] to-[#0b132b] border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="bg-red-500/15 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Interactive Location Guide</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            গুগল ম্যাপ ও লোকেশন (Find Us on Map)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            {config.businessName}-এর সঠিক ভৌগোলিক অবস্থান ও পৌঁছানোর দিকনির্দেশনা।
          </p>
        </div>
      </div>

      <div className="bg-[#1c2541] border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-400" />
              <span>{config.businessName}</span>
            </h2>
            <p className="text-sm text-amber-400 font-medium mt-1">
              {config.address}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=9100+Bipro+Ajagarah+Terokhada+Khulna"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Embedded Map Frame */}
        <div className="rounded-2xl overflow-hidden border border-slate-700 h-[450px] bg-slate-900 shadow-inner relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117564.84654992795!2d89.5447!3d22.9469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff96a1eb1d3615%3A0xb6db760593457a7e!2sTerokhada!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location of Ahmed Digital and Mart"
          />

          <div className="absolute bottom-4 left-4 bg-[#0b132b]/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-xl shadow-lg max-w-xs text-xs">
            <strong className="text-white block mb-0.5">{config.businessName}</strong>
            <span className="text-slate-300 block">{config.address}</span>
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1 mt-1.5"
            >
              <span>সরাসরি ম্যাপ অ্যাপে চালু করুন</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Directions & Landmark Assistance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#0b132b] p-4 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-1 font-bold uppercase tracking-wider text-[10px]">
              ল্যান্ডমার্ক ও এলাকা:
            </span>
            <p className="text-slate-200">
              বিপ্র অজগরা ও তেরখাদা বাজার সংলগ্ন প্রধান সড়ক।
            </p>
          </div>

          <div className="bg-[#0b132b] p-4 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-1 font-bold uppercase tracking-wider text-[10px]">
              যাতায়াত পরামর্শ:
            </span>
            <p className="text-slate-200">
              খুলনা জেলা শহর বা তেরখাদা বাস স্ট্যান্ড থেকে ইজিবাইক/ভ্যানযোগে সরাসরি আসা যায়।
            </p>
          </div>

          <div className="bg-[#0b132b] p-4 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-1 font-bold uppercase tracking-wider text-[10px]">
              লোকেশন খুঁজে পেতে সমস্যা হলে:
            </span>
            <a
              href={`tel:${config.phone}`}
              className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1 mt-0.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{config.phone} নম্বরে সরাসরি কল দিন</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
