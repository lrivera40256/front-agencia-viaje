import { Departament } from "@/models/departaments";
import { DepartamentService } from "@/services/departamentService";
import { useEffect, useState } from "react";

export const useDepartament = () => {
    // Hook logic here
    const [loading, setLoading] = useState<boolean>(false);
    const getDepartamentsWithAvailableHotels = async ():Promise<Departament[]> => {
        setLoading(true);
        try {
            const data = await DepartamentService.getDepartmentsWithAvailableHotels();
            return data;
        } catch (error) {
            console.error("Error fetching departaments:", error);
        } finally {
            setLoading(false);
        }
    };
    const getDepartaments = async (): Promise<Departament[]> => {
        setLoading(true);
        try {
            const data = await DepartamentService.getAllDepartaments();
            return data;
        } catch (error) {
            console.error("Error fetching departaments:", error);
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, getDepartaments, getDepartamentsWithAvailableHotels };
};