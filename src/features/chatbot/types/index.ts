export interface Message {
  id: string;
  text: string;
  // 'user' = local user, 'bot' = virtual assistant, 'remote' = another person
  sender: 'user' | 'bot' | 'remote';
  // Optional id of the participant for person-to-person chats
  participantId?: string;
  timestamp: Date;
  senderId?: string;
  receiverId?: string;
  conversationId?: string | number;
}

export interface ChatResponse {
  answer: string;
}

export interface Participant {
  id: string; // participant user id
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
  lastMessage?: string;
  conversationId?: string | number;
  userId?: string; // alias for id if needed downstream
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface ConversationParticipant {
  role: string;
  user_info: UserInfo;
}

export interface Conversation {
  id: number;
  type: string;
  participants: ConversationParticipant[];
  messages: Message[];
}

export interface ConversationApiResponse {
  status: string;
  count: number;
  data: Conversation[];
}