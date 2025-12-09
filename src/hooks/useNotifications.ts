import { useEffect, useState } from 'react';
import websocketService from '@/services/websocketService';
import { useProfile } from '@/features/profile/contexts/ProfileContext';

export interface Notification {
  id: string;
  type: string;
  conversationId: number;
  senderId: string;
  senderName?: string;
  receiverId: string;
  content: string;
  sentAt: string;
  read: boolean;
  timestamp: Date;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { profile } = useProfile();

  useEffect(() => {
    if (!profile?.user._id) return;

    // Conectar al WebSocket
    websocketService.connect(profile.user._id);

    // Escuchar notificaciones
    const handleNotification = (data: any) => {
        console.log(data);
        
      const notification: Notification = {
        id: `${data.conversationId}-${Date.now()}`,
        type: data.type,
        conversationId: data.conversationId,
        senderId: data.senderId,
        senderName: data.senderName || 'Usuario',
        receiverId: data.receiverId,
        content: data.content,
        sentAt: data.sentAt,
        read: false,
        timestamp: new Date(data.sentAt),
      };

      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Reproducir sonido de notificación
      playNotificationSound();
    };

    websocketService.on('notification', handleNotification);

    return () => {
      websocketService.off('notification', handleNotification);
    };
  }, [profile?.user._id]);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const removeNotification = (notificationId: string) => {
    setNotifications((prev) => {
      const notification = prev.find((n) => n.id === notificationId);
      if (notification && !notification.read) {
        setUnreadCount((count) => Math.max(0, count - 1));
      }
      return prev.filter((n) => n.id !== notificationId);
    });
  };

  const playNotificationSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj==');
    audio.play().catch((e) => console.log('Sonido deshabilitado:', e));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    removeNotification,
  };
};

export default useNotifications;
