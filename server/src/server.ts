import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { InMemoryProductRepository } from './repositories/InMemoryProductRepository';
import { ProductService } from './services/ProductService';
import { ChatService } from './services/ChatService';
import { ProductController } from './controllers/ProductController';
import { ChatController } from './controllers/ChatController';
import { createProductRoutes } from './routes/productRoutes';
import { createChatRoutes } from './routes/chatRoutes';

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);
const chatService = new ChatService();
const productController = new ProductController(productService);
const chatController = new ChatController(chatService);

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Premium Moda E-Ticaret API'
  });
});

app.use('/api/products', createProductRoutes(productController));
app.use('/api/chat', createChatRoutes(chatController));

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint bulunamadı'
  });
});

app.listen(PORT, () => {
  console.log('\n🚀 Premium Moda E-Ticaret API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✓ Sunucu çalışıyor: http://localhost:${PORT}`);
  console.log(`✓ Sistem durumu: http://localhost:${PORT}/health`);
  console.log(`✓ Ürünler API: http://localhost:${PORT}/api/products`);
  console.log(`✓ Sohbet API: http://localhost:${PORT}/api/chat/recommend`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

export default app;
