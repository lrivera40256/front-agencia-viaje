import api from "@/interceptors/axiosInterceptor";
import { Role } from "@/models/Role";

export const getRolesByUserId = async (userId: string) :Promise<Role[]>=> {
    try {
        const response=await api.get(`/user-role/user/${userId}`)
        console.log(response.data);
        
        return response.data;
        
    } catch (error) {
        throw error;
        
    }
}