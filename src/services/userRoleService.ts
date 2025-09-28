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
export const getRolesToAddUser = async (userId: string): Promise<Role[]> => {
    try {
        const response = await api.get(`/user-role/rolesToAdd/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createUserRole = async (userId: string, roleId: string): Promise<void> => {
    try {
        const response = await api.post(`/user-role/user/${userId}/role/${roleId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteUserRole = async (userId: string, roleId: string): Promise<void> => {
    try {
        const response = await api.delete(`/user-role/user/${userId}/role/${roleId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};