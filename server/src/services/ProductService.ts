import { IProductRepository } from '../repositories/IProductRepository';
import { Product, CreateProductDTO, UpdateProductDTO } from '../types/Product';

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async getAllProducts(filters?: { category?: string; featured?: boolean }): Promise<Product[]> {
    return await this.productRepository.findAll(filters);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new Error(`ID ${id} ile ürün bulunamadı`);
    }

    return product;
  }

  async createProduct(productData: CreateProductDTO): Promise<Product> {
    if (productData.price <= 0) {
      throw new Error('Ürün fiyatı 0\'dan büyük olmalıdır');
    }

    return await this.productRepository.create(productData);
  }

  async updateProduct(id: string, updates: UpdateProductDTO): Promise<Product> {
    const product = await this.productRepository.update(id, updates);
    
    if (!product) {
      throw new Error(`ID ${id} ile ürün bulunamadı`);
    }

    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    const success = await this.productRepository.delete(id);
    
    if (!success) {
      throw new Error(`ID ${id} ile ürün bulunamadı`);
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    if (!query || query.trim().length === 0) {
      return await this.getAllProducts();
    }

    return await this.productRepository.search(query);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await this.productRepository.findAll({ featured: true });
  }
}
