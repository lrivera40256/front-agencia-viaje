import api from '@/interceptors/axiosInterceptor';
import { Participant, Message } from '../types';

// NOTE: Estos endpoints son placeholders. Ajusta las rutas según tu backend.
export const getParticipants = async (): Promise<Participant[]> => {
  try {
    const response = await api.get<Participant[]>('/chats/participants');
    return response.data;
  } catch (error) {
    console.error('Error fetching participants:', error);
    return [];
  }
};

export const getConversation = async (participantId: string): Promise<Message[]> => {
  try {
    const response = await api.get<Message[]>(`/chats/conversations/${participantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return [];
  }
};

export const sendMessageToPerson = async (participantId: string, text: string): Promise<Message | null> => {
  try {
    const payload = { to: participantId, text };
    const response = await api.post<Message>('/chats/messages', payload);
    return response.data;
  } catch (error) {
    console.error('Error sending person-to-person message:', error);
    return null;
  }
};

export default {
  getParticipants,
  getConversation,
  sendMessageToPerson,
};
