import { Router } from 'express';
import { ChatController } from '../controllers/ChatController';

export const createChatRoutes = (chatController: ChatController): Router => {
  const router = Router();

  router.post('/recommend', chatController.getRecommendations);

  return router;
};
