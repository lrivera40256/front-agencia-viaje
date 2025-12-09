import { useEffect, useState } from 'react';
import { Participant, Message } from '../types';
import * as chatService from '../services/chatService';

export const useConversations = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activeParticipant, setActiveParticipant] = useState<Participant | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadParticipants = async () => {
      const data = await chatService.getParticipants();
      setParticipants(data);
    };
    loadParticipants();
  }, []);

  const selectParticipant = async (p: Participant) => {
    setActiveParticipant(p);
    setIsLoading(true);
    const conv = await chatService.getConversation(p.id);
    setMessages(conv);
    setIsLoading(false);
  };

  const sendMessage = async (text: string) => {
    if (!activeParticipant) return null;

    // Crear mensaje localmente para UI responsiva
    const localMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      participantId: activeParticipant.id,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, localMessage]);

    // Enviar al backend
    const saved = await chatService.sendMessageToPerson(activeParticipant.id, text);
    if (saved) {
      // Usualmente el backend devolverá el mensaje con id / timestamp. Reemplazamos el local si llega.
      setMessages((prev) => [...prev.filter(m => m.id !== localMessage.id), saved]);
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
