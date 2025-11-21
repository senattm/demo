import { IProductRepository } from './IProductRepository';
import { Product, CreateProductDTO, UpdateProductDTO } from '../types/Product';
import { mockProducts } from '../data/mockProducts';

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[];

  constructor() {
    this.products = JSON.parse(JSON.stringify(mockProducts));
  }

  async findAll(filters?: { category?: string; featured?: boolean }): Promise<Product[]> {
    let result = [...this.products];

    if (filters?.category) {
      result = result.filter(p => p.category === filters.category);
    }

    if (filters?.featured !== undefined) {
      result = result.filter(p => p.featured === filters.featured);
    }

    return result.sort((a, b) => {
      if (a.featured === b.featured) {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      }
      return a.featured ? -1 : 1;
    });
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === id);
    return product || null;
  }

  async create(productData: CreateProductDTO): Promise<Product> {
    const newProduct: Product = {
      ...productData,
      id: `${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: string, updates: UpdateProductDTO): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date()
    };

    return this.products[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return false;
    }

    this.products.splice(index, 1);
    return true;
  }

  async search(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    
    return this.products.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  }
}
