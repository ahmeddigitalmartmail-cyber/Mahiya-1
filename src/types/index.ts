export const ADMIN_SECURITY_KEY = 'AHMED-ADM-7XQ9-K4VP-2N8R-M6TZ';

export interface CustomerUser {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  phone?: string;
  address?: string;
}

export type TabType = 
  | 'home'
  | 'about'
  | 'services'
  | 'products'
  | 'recharge'
  | 'electronics'
  | 'electrical'
  | 'servicing'
  | 'online-services'
  | 'offers'
  | 'cart'
  | 'orders'
  | 'profile'
  | 'contact'
  | 'map'
  | 'admin';

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  category: 'Mobile Accessories' | 'Electronics' | 'Electrical Items' | 'Digital Accessories' | 'Other Products';
  price: number;
  originalPrice?: number;
  stock: number;
  image: string;
  shortDesc: string;
  shortDescBn: string;
  features: string[];
  featured?: boolean;
  isDemo?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Ready for Pickup' | 'Completed' | 'Cancelled';
  date: string;
  paymentMethod: 'Cash on Delivery / In-Shop' | 'bKash / Nagad Payment (Manual)';
  notes?: string;
  isDemo?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  iconName: string;
  descBn: string;
  detailsBn: string[];
  requirementsBn: string[];
  noticeBn?: string;
}

export interface ServicingInquiry {
  id: string;
  customerName: string;
  phone: string;
  deviceType: string;
  problemDesc: string;
  contactMethod: 'Phone Call' | 'WhatsApp' | 'SMS';
  createdAt: string;
  status: 'Submitted' | 'Reviewed' | 'Contacted';
}

export interface OfferItem {
  id: string;
  title: string;
  titleBn: string;
  descBn: string;
  validFrom: string;
  validTill: string;
  badge: string;
  status: 'Active' | 'Upcoming' | 'Expired';
}

export interface BusinessConfig {
  businessName: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  sloganBn: string;
  taglineEn: string;
  logoUrl?: string;
  bannerUrl?: string;
}
