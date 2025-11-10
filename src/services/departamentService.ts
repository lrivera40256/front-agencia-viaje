import api from "@/interceptors/msLogicInterceptor";
import { Departament } from "@/models/departaments";

export const DepartamentService = {
    getAllDepartaments: async (): Promise<Departament[]> => {
        try {
            const { data } = await api.get("/departments");
            return data;
        } catch (error) {
            console.error("Error fetching departaments:", error);
            return [];
        }
    },
    getDepartmentsWithAvailableHotels: async (): Promise<Departament[]> => {
        try {
            const { data } = await api.get("/departments/available-hotels");
            return data;
        } catch (error) {
            console.error("Error fetching departments with available hotels:", error);
            return [];
        }
    }
};