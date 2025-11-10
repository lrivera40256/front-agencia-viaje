import api from "@/interceptors/msLogicInterceptor";
import { Room } from "../types/room.type";
import { Hotel } from "../types/hotel.type";

export class AccommodationService {
    static getAvailableHotelsByCity = async (idCity: number):Promise<Hotel[]> => {
        try {
            const { data } = await api.get(`/hotels/city/${idCity}`);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static getAvailableRoomsByHotel = async (hotelId: number):Promise<Room[]> => {
        try {
            
            const { data } = await api.get(`/rooms/hotel/${hotelId}`);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}