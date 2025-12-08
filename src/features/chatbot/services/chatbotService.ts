import api from '@/interceptors/msRagInterceptor';
import { ChatResponse } from '@/features/chatbot/types/index';

export const sendMessageToBot = async (message: string): Promise<string> => {
  try {
    const response = await api.post<ChatResponse>('/chatbot', {
      question: message
    });
    
    return response.data.answer || 'No se recibió respuesta del chatbot';
  } catch (error) {
    console.error('Error sending message to chatbot:', error);
    throw error;
  }
};

export default {
  sendMessageToBot,
};