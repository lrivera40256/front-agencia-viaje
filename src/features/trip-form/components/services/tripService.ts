import api from "@/interceptors/msLogicInterceptor";

export class TripService {
  static async createTrip(payload:any): Promise<void> {
  try {
    const resp = await api.post('/travel/package', payload);
    return resp.data;
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
};
}