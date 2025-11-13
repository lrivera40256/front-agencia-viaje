import api from "@/interceptors/msLogicInterceptor";
import type { ServiceTransportation } from "@/features/transportation/types/ServiceTransportation";

const BASE_URL = "/service-transportation"; // ajusta si tu API usa otra ruta

// Helpers
const toPayload = (s: Partial<ServiceTransportation>) => ({
  start_date: s.start_date ?? null,
  end_date: s.end_date ?? null,
  cost: Number(s.cost) ?? 0,
  transportation_id: s.transportation_id,
  journey_id: s.journey_id,
});

export class ServiceTransportationService {
  static async list(): Promise<ServiceTransportation[]> {
    const { data } = await api.get(`${BASE_URL}`);
    return data;
  }

  static async create(item: ServiceTransportation): Promise<ServiceTransportation> {
    const payload = toPayload(item);
    const { data } = await api.post(`${BASE_URL}`, payload);
    return data;
  }

  static async update(item: ServiceTransportation): Promise<ServiceTransportation> {
    const id = (item as any)._id ?? item.id;
    const payload = toPayload(item);
    const { data } = await api.put(`${BASE_URL}/${id}`, payload);
    return data;
  }

  static async remove(id: number | string): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`);
  }
}
