import api from "@/interceptors/msSecurityInterceptor";
import { Departament } from "@/models/departaments";

export const DepartamentService = {
    getAllDepartaments: async (): Promise<Departament[]> => {
        try {
            const { data } = await api.get("/api/departaments");
            return data;
        } catch (error) {
            console.error("Error fetching departaments:", error);
            return [];
        }
    }
};