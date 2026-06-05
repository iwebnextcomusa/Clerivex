export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  sku: string;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  inStock: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  company?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing';
  total: number;
  itemsCount: number;
  trackingNumber?: string;
}

export interface QuoteRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  description: string;
  category: string;
  status: 'Pending' | 'Approved' | 'Sent';
}
