export type Language = 'bn' | 'en';

export interface AppItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  category: string;
  version: string;
  fileSize: string;
  screenshots: string[];
  apkUrl: string;
  whatsNew: string;
  rating: number;
  reviewCount: number;
  releaseDate: string;
  isPaid: boolean;
  priceBDT: number;
  isFeatured?: boolean;
  isPopular?: boolean;
  isLatest?: boolean;
  isTopRated?: boolean;
  isPublished: boolean;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameBn: string;
  icon: string;
  sortOrder: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  isDisabled?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod = 'bkash' | 'nagad';
export type PaymentStatus = 'pending' | 'approved' | 'rejected';

export interface PaymentRequest {
  id: string;
  userId: string;
  userEmail: string;
  appId: string;
  appName: string;
  appPriceBDT: number;
  method: PaymentMethod;
  senderNumber: string;
  trxId: string;
  status: PaymentStatus;
  notes?: string;
  adminComment?: string;
  createdAt: string;
  updatedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface PurchaseEntitlement {
  id: string;
  userId: string;
  userEmail: string;
  appId: string;
  appName: string;
  paymentRequestId: string;
  grantedAt: string;
}

export interface DownloadHistoryItem {
  id: string;
  userId: string;
  appId: string;
  appName: string;
  appVersion: string;
  isPaid: boolean;
  downloadedAt: string;
}

export interface FavoriteItem {
  id: string;
  userId: string;
  appId: string;
  appName: string;
  appIcon: string;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  appId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  tagline: string;
  bkashNumber: string;
  nagadNumber: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  updatedAt: string;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  targetUrl: string;
  active: boolean;
  sortOrder: number;
  createdAt: string;
}

export type AdType = 'banner' | 'native_banner' | 'social_bar' | 'popunder' | 'direct_link';
export type AdPlacement = 'home' | 'app_details' | 'category' | 'download';

export interface AdItem {
  id: string;
  type: AdType;
  placement: AdPlacement;
  title: string;
  code: string;
  enabled: boolean;
  updatedAt: string;
}

export interface AdminNotification {
  id: string;
  type: 'payment_pending' | 'new_review' | 'user_registered';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}
