import { useEffect, useState } from 'react';
import { Participant, Message } from '../types';
import * as chatService from '../services/chatService';
import { useProfile } from '@/features/profile/contexts/ProfileContext';

export const useConversations = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activeParticipant, setActiveParticipant] = useState<Participant | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

const {profile,refreshProfile}= useProfile();
  useEffect(() => {
    refreshProfile();
  }, []);
  useEffect(() => {
    console.log(profile?.user._id);
    
    const loadParticipants = async () => {
      console.log("hola");
      
      const conversations = await chatService.getConversationsByUser(profile?.user._id || '');

      // Derivar lista de participantes (tomamos el "otro" participante por conversación)
      const mappedParticipants: Participant[] = conversations.map((conv) => {
        const other = conv.participants.find((p) => p.user_info.id !== profile?.user._id) || conv.participants[0];
        const last = conv.messages?.[conv.messages.length - 1];
        return {
          id: other?.user_info.id || conv.id.toString(),
          userId: other?.user_info.id || conv.id.toString(),
          name: other?.user_info.name || 'Participante',
          email: other?.user_info.email,
          role: other?.role,
          conversationId: conv.id,
          lastMessage: last?.content,
        };
      });

      setParticipants(mappedParticipants);
    };
    loadParticipants();
  }, [profile]);

  const selectParticipant = async (p: Participant) => {
    setActiveParticipant(p);
    setIsLoading(true);

    const conversations = await chatService.getConversationsByUser(profile?.user._id || '');
    const conv = conversations.find((c) => String(c.id) === String(p.conversationId));
    const msgs = conv ? chatService.mapConversationToMessages(conv, profile?.user._id || '') : [];

    setMessages(msgs);
    setIsLoading(false);
  };

  const sendMessage = async (text: string) => {
    
    if (!activeParticipant || !profile?.user._id) return null;

    // Local echo
    const localMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      participantId: activeParticipant.id,
      timestamp: new Date(),
      senderId: profile?.user._id,
      receiverId: activeParticipant.id,
      conversationId: activeParticipant.conversationId,
    };

    setMessages((prev) => [...prev, localMessage]);

    const saved = await chatService.sendMessageToPerson({
      conversationId: Number(activeParticipant.conversationId),
      senderId: profile?.user._id || '',
      receiverId: activeParticipant.id,
      content: text,
    });

    if (saved) {
      setMessages((prev) => [...prev.filter((m) => m.id !== localMessage.id), saved]);
    }

    return saved;
  };

  return {
    participants,
    activeParticipant,
    messages,
    isLoading,
    selectParticipant,
    sendMessage,
  };
};

export default useConversations;
