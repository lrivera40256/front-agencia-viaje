import type { User } from '@/features/user-logic/types/User';
import api from '@/interceptors/msLogicInterceptor';

const BASE_URL = '/user';

export const getUsers = async (): Promise<User[]> => {
	try {
		const response = await api.get(BASE_URL);
		return response.data;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw error;
	}
};

export const getUserById = async (id: number | string): Promise<User> => {
	try {
		const response = await api.get(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching user by ID:', error);
		throw error;
	}
};

export const createUser = async (payload: User): Promise<User> => {
	try {
		const transformedData = transformUserData(payload);
		const response = await api.post(BASE_URL, transformedData);
		return response.data;
	} catch (error) {
		console.error('Error creating user:', error);
		throw error;
	}
};

export const updateUser = async (payload: User): Promise<User> => {
	try {
		const transformedData = transformUserDataForUpdate(payload);
		const response = await api.patch(`${BASE_URL}/${payload.id}`, transformedData);
		return response.data;
	} catch (error) {
		console.error('Error updating user:', error);
		throw error;
	}
};

export const deleteUserById = async (id: number | string): Promise<void> => {
	try {
		const response = await api.delete(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting user by ID:', error);
		throw error;
	}
};

// Helper functions
const transformUserData = (user: User): any => ({
	name: String(user.name || '').trim(),
	email: String(user.email || '')
		.toLowerCase()
		.trim(),
	phone: String(user.phone || '').trim(),
	identification_number: String(user.identification_number || '').trim(),
	document_type: String(user.document_type || ''),
	birth_date: String(user.birth_date || ''),
});

const transformUserDataForUpdate = (user: User): any => ({
	name: String(user.name || '').trim(),
	email: String(user.email || '')
		.toLowerCase()
		.trim(),
	phone: String(user.phone || '').trim(),
	identification_number: String(user.identification_number || '').trim(),
	document_type: String(user.document_type || ''),
	birth_date: String(user.birth_date || ''),
});

export default {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUserById,
};
