import { useEffect, useState } from "react";
import { VehicleType } from "../types/vehicle.type";
import { VehicleService } from "../services";
import { useSegment } from "@/features/trip-form/contexts/segmentContext";

export const useVehicle = () => {
    const [vehicles, setVehicles] = useState<VehicleType[] | null>(null);
    const [type, setType] = useState<'car' | 'plane'>('car');
    const { segment } = useSegment();
    const getVehicles = async () => {
        if (type == "car") {
            try {
                if (segment.hotel.id == 0) {
                    return new Error("Hotel no seleccionado");
                }
                const response = await VehicleService.getCars(segment.hotel.id);
                setVehicles(response);
            } catch (error) {
                console.log(error);
                throw error;
                
            }
            return 
        }
        try{
            const response = await VehicleService.getPlanes();
            setVehicles(response);
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
    useEffect(() => {
        getVehicles();
    }, [type]);
    return { vehicles, type, setType };
}