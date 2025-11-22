export interface Product {
  id: string;
  name: string;
  category: 'suits' | 'dresses' | 'shirts' | 'accessories';
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  material: string;
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  isDefault: boolean;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  addresses?: Address[];
  isAuthenticated: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

