import type { Journey } from '@/features/journeys/types/Journey';
import api from '@/interceptors/msLogicInterceptor';

const BASE_URL = '/journeys';

const transformJourneyData = (journey: Journey): any => {
	return {
		origin_id: Number(journey.origin_id) || 0,
		destination_id: Number(journey.destination_id) || 0,
	};
};

export const getJourneys = async (): Promise<Journey[]> => {
	try {
		const response = await api.get(`${BASE_URL}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching journeys:', error);
		throw error;
	}
};

export const getJourneyById = async (id: string | number): Promise<Journey> => {
	try {
		const response = await api.get(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching journey by ID:', error);
		throw error;
	}
};

export const createJourney = async (journey: Journey): Promise<Journey> => {
	try {
		const payload = transformJourneyData(journey);
		const response = await api.post(`${BASE_URL}`, payload);
		return response.data;
	} catch (error) {
		console.error('Error creating journey:', error);
		throw error;
	}
};

export const updateJourney = async (journey: Journey): Promise<Journey> => {
	try {
		const journeyId = journey.id;
		const payload = transformJourneyData(journey);
		const response = await api.patch(`${BASE_URL}/${journeyId}`, payload);
		return response.data;
	} catch (error) {
		console.error('Error updating journey:', error);
		throw error;
	}
};

export const deleteJourneyById = async (id: string | number): Promise<void> => {
	try {
		await api.delete(`${BASE_URL}/${id}`);
	} catch (error) {
		console.error('Error deleting journey by ID:', error);
		throw error;
	}
};

export default {
	getJourneys,
	getJourneyById,
	createJourney,
	updateJourney,
	deleteJourneyById,
};
