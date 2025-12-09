export interface Message {
  id: string;
  text: string;
  // 'user' = local user, 'bot' = virtual assistant, 'remote' = another person
  sender: 'user' | 'bot' | 'remote';
  // Optional id of the participant for person-to-person chats
  participantId?: string;
  timestamp: Date;
}

export interface ChatResponse {
  answer: string;
}

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
}

export interface Conversation {
  participant: Participant;
  messages: Message[];
}