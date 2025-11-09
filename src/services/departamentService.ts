import api from "@/interceptors/msLogicInterceptor";
import { Departament } from "@/models/departaments";

export const DepartamentService = {
    getAllDepartaments: async (): Promise<Departament[]> => {
        try {
            const { data } = await api.get("/departaments");
            return data;
        } catch (error) {
            console.error("Error fetching departaments:", error);
            return [];
        }
    }
};