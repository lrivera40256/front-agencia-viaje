import api from "../interceptors/axiosInterceptor";
import type { UserRole } from "../models/UserRole";

export const getUserRole = async (): Promise<UserRole[]> => {
    try {
        const response = await api.get('/user-role');
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user roles: ${error}`);
    }
};

export const getUserRoleById = async (id:string): Promise<UserRole> => {
    try {
        const response = await api.get(`/user-role/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user role by ID: ${error}`);
    }
};

export const createUserRole = async (id_user:string, id_role:string): Promise<void> => {
    try {
        const response = await api.post(`/user-role/user/${id_user}/role/${id_role}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating user role: ${error}`);
    }
};

export const deleteUserRoleById = async (id:string): Promise<void> => {
    try {
        const response = await api.delete(`/user-role/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting user role by ID: ${error}`);
    }
};

