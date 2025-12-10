import api from '@/interceptors/msRagInterceptor';

interface AppointmentResponse {
  output: string;
}

export const sendAppointmentRequest = async (message: string): Promise<string> => {
  try {
    const response = await api.post<AppointmentResponse>('/agent/agent', {
      question: message
    });
    
    return response.data.output || 'No se recibió respuesta del agente';
  } catch (error) {
    console.error('Error sending appointment request:', error);
    throw error;
  }
};

export default {
  sendAppointmentRequest,
};
