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

export type CreateProductDTO = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProductDTO = Partial<CreateProductDTO>;

