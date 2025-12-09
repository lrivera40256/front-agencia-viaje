import io, { Socket } from 'socket.io-client';

interface NotificationPayload {
  type: string;
  conversationId: number;
  senderId: string;
  senderName?: string;
  receiverId: string;
  content: string;
  sentAt: string;
}

class WebSocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect(userId: string) {
    if (this.socket?.connected) {
      console.log('✅ WebSocket ya conectado');
      return;
    }

    // Conectar al servidor WebSocket
    this.socket = io(import.meta.env.VITE_WS_URL || 'http://127.0.0.1:3334', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    // Evento: conexión establecida
    this.socket.on('connect', () => {
      console.log('✅ Conectado al WebSocket:', this.socket?.id);
      // Unirse a la sala personalizada del usuario
      this.socket?.emit('join', userId);
    });

    // Evento: nueva notificación de mensaje
    this.socket.on('new_notification', (data: NotificationPayload) => {
      console.log('📬 Nueva notificación:', data);
      this.emit('notification', data);
    });

    // Evento: error de conexión
    this.socket.on('connect_error', (error) => {
      console.error('❌ Error de conexión WebSocket:', error);
      this.emit('error', error);
    });

    // Evento: desconexión
    this.socket.on('disconnect', () => {
      console.log('❌ Desconectado del WebSocket');
    });
  }

  disconnect() {
    if (this.socket?.connected) {
      this.socket.disconnect();
      console.log('✅ WebSocket desconectado');
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: Function) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.delete(callback);
    }
  }

  private emit(event: string, data: any) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.forEach((callback) => {
        callback(data);
      });
    }
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export default new WebSocketService();
