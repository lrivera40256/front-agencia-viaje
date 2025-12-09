import api from '@/interceptors/msLogicInterceptor';
import { ConversationApiResponse, Message } from '../types';

interface RawMessage {
  id: number;
  conversation_id: number;
  sender_id: string;
  receiver_id: string;
  content: string;
  sent_at: string;
  read: boolean;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface RawParticipant {
  role: string;
  user_info: UserInfo;
}

interface RawConversation {
  id: number;
  type: string;
  participants: RawParticipant[];
  messages: RawMessage[];
}


const mapMessage = (raw: RawMessage, currentUserId: string): Message => ({
  id: String(raw.id),
  text: raw.content,
  sender: raw.sender_id === currentUserId ? 'user' : 'remote',
  participantId: raw.sender_id === currentUserId ? raw.receiver_id : raw.sender_id,
  timestamp: new Date(raw.sent_at),
  senderId: raw.sender_id,
  receiverId: raw.receiver_id,
  conversationId: raw.conversation_id,
});

export const getConversationsByUser = async (userId: string): Promise<RawConversation[]> => {
  if (!userId) return [];
  try {
    const response = await api.get<ConversationApiResponse>(`/messages/conversations/${userId}`);
    return (response.data?.data as unknown as RawConversation[]) ?? [];
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
};

export const mapConversationToMessages = (conversation: RawConversation, currentUserId: string): Message[] => {
  return (conversation.messages || []).map((m) => mapMessage(m, currentUserId));
};

export const sendMessageToPerson = async (params: {
  conversationId: number | string;
  senderId: string;
  receiverId: string;
  content: string;
}): Promise<Message | null> => {
  const { conversationId, senderId, receiverId, content } = params;
  try {
    const payload = {
      conversation_id: Number(conversationId),
      sender_id: senderId,
      receiver_id: receiverId,
      content,
    };

    const response = await api.post<RawMessage>(`/messages/send`, payload);
    return mapMessage(response.data, senderId);
  } catch (error) {
    console.error('Error sending person-to-person message:', error);
    return null;
  }
};

export default {
  getConversationsByUser,
  mapConversationToMessages,
  sendMessageToPerson,
};
