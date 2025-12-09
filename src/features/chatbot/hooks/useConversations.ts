import { useEffect, useState } from 'react';
import { Participant, Message } from '../types';
import * as chatService from '../services/chatService';
import { useProfile } from '@/features/profile/contexts/ProfileContext';
import websocketService from '@/services/websocketService';

export const useConversations = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activeParticipant, setActiveParticipant] = useState<Participant | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { profile, refreshProfile } = useProfile();

  useEffect(() => {
    refreshProfile();
  }, []);

  // Cargar participantes y escuchar mensajes en tiempo real
  useEffect(() => {
    if (!profile?.user._id) return;

    const loadParticipants = async () => {
      const conversations = await chatService.getConversationsByUser(profile?.user._id || '');
      if (conversations.length === 0) {
        setParticipants([]);
        return;
      }
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

    // Escuchar nuevos mensajes en tiempo real
    const handleNewMessage = (data: any) => {
      // Solo procesar si el mensaje es para la conversación activa
      if (activeParticipant && Number(data.conversationId) === Number(activeParticipant.conversationId)) {
        const newMessage: Message = {
          id: String(data.id || Date.now()),
          text: data.content,
          sender: data.senderId === profile?.user._id ? 'user' : 'remote',
          participantId: data.senderId === profile?.user._id ? data.receiverId : data.senderId,
          timestamp: new Date(data.sentAt),
          senderId: data.senderId,
          receiverId: data.receiverId,
          conversationId: data.conversationId,
        };

        setMessages((prev) => [...prev, newMessage]);
      }

      // Actualizar último mensaje en la lista de participantes
      setParticipants((prev) =>
        prev.map((p) =>
          String(p.conversationId) === String(data.conversationId)
            ? { ...p, lastMessage: data.content }
            : p
        )
      );
    };

    websocketService.on('notification', handleNewMessage);

    return () => {
      websocketService.off('notification', handleNewMessage);
    };
  }, [profile?.user._id, activeParticipant]);

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
