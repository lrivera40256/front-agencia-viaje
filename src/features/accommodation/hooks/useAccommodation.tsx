import { useEffect, useState } from "react";
import { Hotel } from "../types/hotel.type";
import { Room } from "../types/room.type";
import { useSegment } from "@/features/trip-form/contexts/segmentContext";
import api from "@/interceptors/msLogicInterceptor";
import { AccommodationService } from "../services";

export const useAccommodation = () => {
    const [rooms, setRooms] = useState<Room[]>();
    const [hotels, setHotels] = useState<Hotel[]>();
    const { segment } = useSegment();
    const fetchHotels = async () => {
        try {
            const response = await AccommodationService.getAvailableHotelsByCity(segment.cityTo.id);
            setHotels(response);
        } catch (error) {
            console.log("error fetching hotels");
            throw error;

        }
    };
    const fetchRooms = async (hotelId: number) => {
        try {
            const response = await AccommodationService.getAvailableRoomsByHotel(hotelId);
            setRooms(response);
        } catch (error) {
            console.log("error fetching rooms");
            throw error;
        }
    }

    useEffect(() => {
        if (segment.cityTo) {
            fetchHotels();
        }
    }, [segment.cityTo]);

    useEffect(() => {
        if (segment.hotel) {
            fetchRooms(segment.hotel.id);
        }
    }, [segment.hotel]);
   
    return {
        hotels,
        rooms,
    };

}