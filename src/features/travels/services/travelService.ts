import type { Travel } from '@/features/travels/types/Travel';
import api from '@/interceptors/msLogicInterceptor';

const BASE_URL = '/travel';

// Transformar datos antes de enviar al backend
const transformTravelData = (travel: Travel): any => {
	return {
		name: travel.name,
		description: travel.description,
		start_date: travel.start_date || null,
		end_date: travel.end_date || null,
		price: Number(travel.price) || 0,
	};
};

export const getTravels = async (): Promise<Travel[]> => {
	try {
		const response = await api.get(`${BASE_URL}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching travels:', error);
		throw error;
	}
};

export const getTravelById = async (id: string | number): Promise<Travel> => {
	try {
		const response = await api.get(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching travel by ID:', error);
		throw error;
	}
};

export const createTravel = async (travel: Travel): Promise<Travel> => {
	try {
		const payload = transformTravelData(travel);
		const response = await api.post(`${BASE_URL}`, payload);
		return response.data;
	} catch (error) {
		console.error('Error creating travel:', error);
		throw error;
	}
};

export const updateTravel = async (travel: Travel): Promise<Travel> => {
	try {
		const travelId = travel._id || travel.id;
		const payload = transformTravelData(travel);
		const response = await api.put(`${BASE_URL}/${travelId}`, payload);
		return response.data;
	} catch (error) {
		console.error('Error updating travel:', error);
		throw error;
	}
};

export const deleteTravelById = async (id: string | number): Promise<void> => {
	try {
		const response = await api.delete(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting travel by ID:', error);
		throw error;
	}
};
