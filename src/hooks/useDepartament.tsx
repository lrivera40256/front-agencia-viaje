import { Departament } from "@/models/departaments";
import { DepartamentService } from "@/services/departamentService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useDepartament = () => {
    // Hook logic here
    const [loading, setLoading] = useState<boolean>(false);
    const getDepartamentsWithAvailableHotels = async ():Promise<Departament[]> => {
        setLoading(true);
        try {
            const data = await DepartamentService.getDepartmentsWithAvailableHotels();
            if(data.length==0){
                toast.error("No hay departamentos con hoteles disponibles");
            }
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