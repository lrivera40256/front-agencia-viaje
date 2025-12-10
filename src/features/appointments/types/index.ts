export interface Appointment {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // en minutos
  agent?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  google_event_id?: string;
  created_at?: Date;
}

export interface AppointmentMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  appointment?: Appointment;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
