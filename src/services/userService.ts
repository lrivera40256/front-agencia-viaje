import api from '../interceptors/axiosInterceptor';
import type { User } from '../models/User';

export const getUsers = async (): Promise<User[]> => {
	try {
		const response = await api.get('/users');
		return response.data;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw error;
	}
};

export const getUserById = async (id: string): Promise<User> => {
	try {
		const response = await api.get(`/users/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching user by ID:', error);
		throw error;
	}
};

export const createUser = async (user: User): Promise<void> => {
	try {
		const response = await api.post('/users', user);
		return response.data;
	} catch (error) {
		console.error('Error creating user:', error);
		throw error;
	}
};

export const updateUser = async (user: User): Promise<void> => {
	try {
		const response = await api.patch(`/users/${user._id}`, user);
		return response.data;
	} catch (error) {
		console.error('Error updating user:', error);
		throw error;
	}
};

export const deleteUserById = async (id: string): Promise<void> => {
	try {
		const response = await api.delete(`/users/${id}`);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error('Error deleting user by ID:', error);
		throw error;
	}
};
