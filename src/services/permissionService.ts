import api from '../interceptors/axiosInterceptor';
import type { Permission } from '../models/Permission';

export const getPermissions = async (): Promise<Permission[]> => {
	try {
		const response = await api.get('/permissions');
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getPermissionById = async (id: string): Promise<Permission> => {
	try {
		const response = await api.get(`/permissions/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createPermission = async (permission: Permission): Promise<void> => {
	try {
		const response = await api.post(`permissions`, permission);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const modifiedPermission = async (permission: Permission): Promise<void> => {
	try {
		const response = await api.put(`permissions/${permission._id}`, permission);
		console.log(response.data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deletePermissionById = async (id: string): Promise<void> => {	
	try {
		const response = await api.delete(`/permissions/${id}`);
		console.log(response);

		return response.data;
	} catch (error) {
		throw error;
	};
}

export const getPermissionsByRoleId = async (id: String): Promise<Permission[]> => {
	try{
		const response = await api.get(`/role-permission/role/${id}`);
		console.log(response.data);
		return response.data
	} catch (error){
		throw error
	}
}
