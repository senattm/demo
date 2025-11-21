import { Request, Response } from 'express';
import { ChatService } from '../services/ChatService';
import { ChatRequest } from '../types/Chat';

export class ChatController {
  constructor(private chatService: ChatService) {}

  getRecommendations = async (req: Request, res: Response): Promise<void> => {
    try {
      const chatRequest: ChatRequest = req.body;

      if (!chatRequest.message) {
        res.status(400).json({
          success: false,
          error: 'Mesaj gereklidir'
        });
        return;
      }

      const response = await this.chatService.processMessage(chatRequest);
      
      res.json({
        success: true,
        data: response
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
      });
    }
  };
}
