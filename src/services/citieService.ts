import api from "@/interceptors/msLogicInterceptor";

export const CitiesService = {
    getCitiesByDepartament: async (departamentId: number) => {
        const res = await api.get(`/cities/find/${departamentId}`);
        return res.data;
    }
};