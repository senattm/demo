import { Product, CreateProductDTO, UpdateProductDTO } from '../types/Product';

export interface IProductRepository {
  findAll(filters?: { category?: string; featured?: boolean }): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: CreateProductDTO): Promise<Product>;
  update(id: string, updates: UpdateProductDTO): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  search(query: string): Promise<Product[]>;
}
