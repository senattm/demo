import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

export const createProductRoutes = (productController: ProductController): Router => {
  const router = Router();

  router.get('/featured', productController.getFeaturedProducts);
  router.get('/search', productController.searchProducts);
  router.get('/', productController.getAllProducts);
  router.get('/:id', productController.getProductById);

  return router;
};
