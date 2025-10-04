import { Permission } from '@/models/Permission';
import api from '../interceptors/axiosInterceptor';
import type { RolePermission } from '../models/RolePermission';
import { PermissionsByModel } from '@/types/permisions';

export const getRolePermission = async (): Promise<RolePermission[]> => {
	try {
		const response = await api.get('/role-permission');
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getRolePermissionById = async (id: string): Promise<RolePermission> => {
	try {
		const response = await api.get(`/role-permission/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createRolePermission = async (
	id_role: string,
	id_permission: string
): Promise<void> => {
	try {
		const response = await api.post(
			`/role-permission/role/${id_role}/permission/${id_permission}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteRolePermissionById = async (id: string): Promise<void> => {
	try {
		const response = await api.delete(`/role-permission/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteRolePermissionByRoleAndPermission = async (id_role: String, id_permission: String): Promise<void> => {
	try {
		const response = await api.delete(`/role-permission/role/${id_role}/permission/${id_permission}`)
		console.log(response.data);
		
		return response.data
	} catch (error) {
		throw error
	}
};
export const getPermissionsToAddRole = async (roleId: string): Promise<Permission[]> => {
	try {
		const response = await api.get(`/role-permission/permissionsToAdd/${roleId}`);
		console.log(response.data);
		
		return response.data;
	} catch (error) {
		throw error;
	}
};
	
export const getPermissionsForCheck = async (roleId: string) : Promise<PermissionsByModel> => {
	try {
		const response = await api.get(`/role-permission/role/${roleId}/permissions`)	
		return response.data
	} catch (error) {
		throw error
	}
};
export const checkPermission = async (roleId: string,model:string,method:string,checked:boolean): Promise<void> => {
	try {
		const response = await api.patch(`/role-permission/check`,{ roleId, model, method, checked } )
		console.log(response.data);	
	} catch (error) {																
		throw error;
	}
}

