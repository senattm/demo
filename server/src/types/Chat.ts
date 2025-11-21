export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  context?: {
    budget?: number;
    occasion?: string;
    style?: string;
  };
}

export interface ChatResponse {
  message: string;
  recommendations?: string[]; // Product IDs
}

