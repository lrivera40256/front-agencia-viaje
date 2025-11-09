import { CitiesService } from "@/services/citieService";
import { useState } from "react";

export const useCities = () => {
    const [citiesFrom,setCitiesFrom] = useState([]);
    const [citiesTo,setCitiesTo] = useState([]);
    const refreshCitiesFrom = async (departamentId: number) => {
        setCitiesFrom([]);
        try {
            const cities = await CitiesService.getCitiesByDepartament(departamentId);
            setCitiesFrom(cities);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    }
     const refreshCitiesTo = async (departamentId: number) => {
        setCitiesTo([]);
        try {
            const cities = await CitiesService.getCitiesByDepartament(departamentId);
            setCitiesTo(cities);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    }
    
    return { citiesFrom, refreshCitiesFrom,refreshCitiesTo,citiesTo };
}