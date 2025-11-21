import { ChatRequest, ChatResponse } from '../types/Chat';

export class ChatService {
  async processMessage(request: ChatRequest): Promise<ChatResponse> {
    const mockResponses = [
      'Sofistike bir akşam görünümü için İpek Gece Elbisemizi İtalyan deri aksesuarlarla tamamlamanızı öneririm.',
      'Yönetici toplantılarınız için Gece Mavisi Takım Elbise mükemmel olacaktır. Klasik Oxford Gömlek ile eşleştirin.',
      'Şık rahat bir etkinlik için Kaşmir Karışımlı Paltomuzun altına Merino Yün Balıkçı Yaka giyebilirsiniz.',
      'Kadife Kokteyl Elbisemiz akşam etkinlikleri için idealdir. Zarif aksesuarlarla tamamlayın.'
    ];

    await new Promise(resolve => setTimeout(resolve, 500));

    let response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    if (request.context?.occasion) {
      response = `${request.context.occasion} için, ` + response.toLowerCase();
    }

    return {
      message: response,
      recommendations: ['1', '2', '4']
    };
  }
}
