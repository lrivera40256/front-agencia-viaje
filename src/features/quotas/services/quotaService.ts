import type { Quota } from '@/features/quotas/types/Quota';
import api from '@/interceptors/msLogicInterceptor';

const BASE_URL = '/quota';

export const getQuotas = async (): Promise<Quota[]> => {
	try {
		const response = await api.get(BASE_URL);
		return response.data;
	} catch (error) {
		console.error('Error fetching quotas:', error);
		throw error;
	}
};

export const getQuotaById = async (id: number | string): Promise<Quota> => {
	try {
		const response = await api.get(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching quota by ID:', error);
		throw error;
	}
};

export const createQuota = async (payload: Quota): Promise<Quota> => {
	try {
		const response = await api.post(BASE_URL, payload);
		return response.data;
	} catch (error) {
		console.error('Error creating quota:', error);
		throw error;
	}
};

export const updateQuota = async (payload: Quota): Promise<Quota> => {
	try {
		const response = await api.patch(`${BASE_URL}/${payload.id}`, payload);
		return response.data;
	} catch (error) {
		console.error('Error updating quota:', error);
		throw error;
	}
};

export const deleteQuotaById = async (id: number | string): Promise<void> => {
	try {
		const response = await api.delete(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting quota by ID:', error);
		throw error;
	}
};

export default {
	getQuotas,
	getQuotaById,
	createQuota,
	updateQuota,
	deleteQuotaById,
};
