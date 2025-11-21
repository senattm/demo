import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  constructor(private productService: ProductService) {}

  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category, featured } = req.query;
      
      const filters: { category?: string; featured?: boolean } = {};
      
      if (category) {
        filters.category = category as string;
      }
      
      if (featured !== undefined) {
        filters.featured = featured === 'true';
      }

      const products = await this.productService.getAllProducts(filters);
      
      res.json({
        success: true,
        data: products,
        count: products.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
      });
    }
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('bulunamadı') ? 404 : 500;
      
      res.status(statusCode).json({
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
      });
    }
  };

  searchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { q } = req.query;
      
      if (!q) {
        res.status(400).json({
          success: false,
          error: 'Arama sorgusu parametresi "q" gereklidir'
        });
        return;
      }

      const products = await this.productService.searchProducts(q as string);
      
      res.json({
        success: true,
        data: products,
        count: products.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
      });
    }
  };

  getFeaturedProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productService.getFeaturedProducts();
      
      res.json({
        success: true,
        data: products,
        count: products.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
      });
    }
  };
}
