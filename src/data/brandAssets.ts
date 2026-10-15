/**
 * Brand assets for AHMED DIGITAL & MART
 * Custom designed high-resolution SVG Logo and Banner
 */

// Official Brand Logo (SVG Data URI)
export const DEFAULT_BRAND_LOGO = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1128" />
      <stop offset="50%" stop-color="#101f42" />
      <stop offset="100%" stop-color="#050a17" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE066" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Shield/Badge -->
  <rect width="500" height="500" rx="90" fill="url(#bgGrad)" stroke="#F59E0B" stroke-width="6" stroke-opacity="0.6"/>
  
  <!-- Outer Tech Circuit Ring -->
  <circle cx="250" cy="220" r="175" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-dasharray="8 6" opacity="0.4"/>
  <circle cx="250" cy="220" r="155" fill="none" stroke="#F59E0B" stroke-width="3" opacity="0.6"/>
  
  <!-- Hexagon Tech Core -->
  <polygon points="250,90 355,150 355,275 250,335 145,275 145,150" fill="#0B132B" stroke="url(#goldGrad)" stroke-width="5" opacity="0.95" filter="url(#glow)"/>

  <!-- Telecom Tower & Lightning Energy -->
  <path d="M250 115 L262 170 L238 170 Z" fill="url(#goldGrad)" />
  <line x1="250" y1="165" x2="250" y2="245" stroke="url(#cyanGrad)" stroke-width="4" stroke-linecap="round"/>
  <!-- Signal Waves -->
  <path d="M225 140 A 30 30 0 0 1 275 140" fill="none" stroke="#38BDF8" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M210 125 A 50 50 0 0 1 290 125" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>

  <!-- ADM Bold Monogram -->
  <g id="letters" filter="url(#glow)">
    <text x="250" y="275" font-family="'Inter', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="78" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">ADM</text>
  </g>

  <!-- Electronics Chip Dots -->
  <circle cx="175" cy="210" r="5" fill="#38BDF8" />
  <circle cx="325" cy="210" r="5" fill="#38BDF8" />
  <line x1="175" y1="210" x2="195" y2="210" stroke="#38BDF8" stroke-width="2"/>
  <line x1="305" y1="210" x2="325" y2="210" stroke="#38BDF8" stroke-width="2"/>

  <!-- Brand Typography -->
  <text x="250" y="380" font-family="'Inter', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">AHMED DIGITAL &amp; MART</text>
  
  <!-- Subtitle Tag -->
  <text x="250" y="415" font-family="'Hind Siliguri', 'Segoe UI', Arial, sans-serif" font-weight="700" font-size="16" fill="#F59E0B" text-anchor="middle" letter-spacing="2">টেলিকম • ইলেকট্রনিক্স • ডিজিটাল সার্ভিস</text>
  
  <rect x="175" y="435" width="150" height="24" rx="12" fill="#1E293B" stroke="#334155" stroke-width="1"/>
  <text x="250" y="451" font-family="'Inter', sans-serif" font-weight="700" font-size="11" fill="#94A3B8" text-anchor="middle" letter-spacing="1">TEROKHADA, KHULNA</text>
</svg>
`)}`;

// Official Brand Banner (SVG Data URI)
export const DEFAULT_BRAND_BANNER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bannerBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070D1E" />
      <stop offset="40%" stop-color="#101F42" />
      <stop offset="75%" stop-color="#172554" />
      <stop offset="100%" stop-color="#0B132B" />
    </linearGradient>
    <linearGradient id="accentGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#FCD34D" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>
    <radialGradient id="lightSpot" cx="80%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="goldSpot" cx="15%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="400" rx="24" fill="url(#bannerBg)" stroke="#1E293B" stroke-width="3"/>
  <rect width="1200" height="400" rx="24" fill="url(#lightSpot)"/>
  <rect width="1200" height="400" rx="24" fill="url(#goldSpot)"/>

  <!-- High-tech Grid Lines -->
  <g stroke="#38BDF8" stroke-width="0.75" stroke-opacity="0.15">
    <line x1="0" y1="80" x2="1200" y2="80" />
    <line x1="0" y1="160" x2="1200" y2="160" />
    <line x1="0" y1="240" x2="1200" y2="240" />
    <line x1="0" y1="320" x2="1200" y2="320" />
    <line x1="200" y1="0" x2="200" y2="400" />
    <line x1="400" y1="0" x2="400" y2="400" />
    <line x1="600" y1="0" x2="600" y2="400" />
    <line x1="800" y1="0" x2="800" y2="400" />
    <line x1="1000" y1="0" x2="1000" y2="400" />
  </g>

  <!-- Left Side: Brand Identity -->
  <g transform="translate(80, 80)">
    <!-- Pill Badge -->
    <rect x="0" y="0" width="280" height="32" rx="16" fill="#F59E0B" fill-opacity="0.15" stroke="#F59E0B" stroke-opacity="0.4" stroke-width="1.5"/>
    <text x="140" y="21" font-family="'Inter', sans-serif" font-weight="800" font-size="13" fill="#FCD34D" text-anchor="middle" letter-spacing="2">STAY CONNECTED, STAY AHMED</text>

    <!-- Main Title -->
    <text x="0" y="85" font-family="'Inter', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" letter-spacing="1">AHMED DIGITAL &amp; MART</text>

    <!-- Bengali Slogan -->
    <text x="0" y="135" font-family="'Hind Siliguri', 'SolaimanLipi', sans-serif" font-weight="700" font-size="28" fill="url(#accentGold)">“আপনার প্রয়োজন, আমাদের প্রতিশ্রুতি...”</text>

    <!-- Sub description -->
    <text x="0" y="175" font-family="'Hind Siliguri', sans-serif" font-weight="500" font-size="16" fill="#94A3B8">টেলিকম রিচার্জ • মোবাইল এক্সেসরিজ • ইলেকট্রিক্যাল ফিটিংস • গ্যাজেট সার্ভিসিং • অনলাইন আবেদন</text>
    <text x="0" y="202" font-family="'Inter', sans-serif" font-weight="600" font-size="14" fill="#38BDF8">📍 9100 Bipro Ajagarah, Terokhada, Khulna | 📞 +8809643616832</text>
  </g>

  <!-- Right Side: Decorative Tech Core Emblem -->
  <g transform="translate(980, 200)">
    <!-- Tech Rings -->
    <circle cx="0" cy="0" r="140" fill="none" stroke="#2563EB" stroke-width="2" stroke-dasharray="10 8" opacity="0.5"/>
    <circle cx="0" cy="0" r="115" fill="none" stroke="#F59E0B" stroke-width="3" opacity="0.7"/>
    <circle cx="0" cy="0" r="90" fill="#0B132B" stroke="#38BDF8" stroke-width="3"/>

    <!-- Central ADM Icon -->
    <polygon points="0,-60 52,-25 52,40 0,72 -52,40 -52,-25" fill="#101F42" stroke="url(#accentGold)" stroke-width="4"/>
    <text x="0" y="14" font-family="'Inter', sans-serif" font-weight="900" font-size="34" fill="url(#accentGold)" text-anchor="middle" letter-spacing="2">ADM</text>
    <text x="0" y="32" font-family="'Inter', sans-serif" font-weight="700" font-size="9" fill="#93C5FD" text-anchor="middle" letter-spacing="1">PREMIUM MART</text>
  </g>
</svg>
`)}`;
