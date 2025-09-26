import api from "../interceptors/axiosInterceptor"
import type { Role } from "../models/Role";

export const getRoles = async () :Promise<Role[]>=> {
    try {
        const response=await api.get('/roles')
        console.log(response.data);
        
        return response.data;
        
    } catch (error) {
        throw error;
        
    }
}
export const deleteRole = async (id: string) :Promise<void>=> {
    try {
        await api.delete(`/roles/${id}`);
    } catch (error) {
        throw error;
    }
}

        
   
