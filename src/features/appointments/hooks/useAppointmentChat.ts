import { useState, useRef, useEffect } from 'react';
import { AppointmentMessage } from '../types';
import { sendAppointmentRequest } from '../services/appointmentService';

export const useAppointmentChat = () => {
  const [messages, setMessages] = useState<AppointmentMessage[]>([
    {
      id: '1',
      text: '¡Hola! Estoy aquí para ayudarte a agendar una cita. ¿Qué necesitas?',
      sender: 'agent',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: AppointmentMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseText = await sendAppointmentRequest(text);
      const agentMessage: AppointmentMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      const errorMessage: AppointmentMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error al procesar tu solicitud. Por favor intenta de nuevo más tarde.',
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    isOpen,
    toggleChat,
    sendMessage,
    messagesEndRef,
  };
};
