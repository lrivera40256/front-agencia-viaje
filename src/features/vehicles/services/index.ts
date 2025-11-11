import api from "@/interceptors/msLogicInterceptor";
import { Car, Plane } from "../types/vehicle.type";

export class VehicleService {
    public static async getCars(hotelId: number): Promise<Car[]> {
        try {
            const { data } = await api.get(`/cars/hotel/${hotelId}`);
            return data;
        } catch (error) {
            console.log(error);

        }
    }
    public static async getPlanes(): Promise<Plane[]    > {
        try {
            const { data } = await api.get(`/planes`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}