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

export interface User {
  id?: string;
  name?: string;
  email?: string;
  isAuthenticated: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

