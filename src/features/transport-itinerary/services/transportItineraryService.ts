import type { TransportItinerary } from '@/features/transport-itinerary/types/TransportItinerary';
import api from '@/interceptors/msLogicInterceptor';

const BASE_URL = '/transport-itinerary';

export const getTransportItineraries = async (): Promise<TransportItinerary[]> => {
	try {
		const response = await api.get(`${BASE_URL}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching transport itineraries:', error);
		throw error;
	}
};

export const getTransportItineraryById = async (
	id: string | number
): Promise<TransportItinerary> => {
	try {
		const response = await api.get(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching transport itinerary by ID:', error);
		throw error;
	}
};

export const getTransportItinerariesByTravel = async (
	travelId: number
): Promise<TransportItinerary[]> => {
	try {
		const response = await api.get(`${BASE_URL}?travel_id=${travelId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching transport itineraries by travel:', error);
		throw error;
	}
};

export const getTransportItinerariesByJourney = async (
	journeyId: number
): Promise<TransportItinerary[]> => {
	try {
		const response = await api.get(`${BASE_URL}?journey_id=${journeyId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching transport itineraries by journey:', error);
		throw error;
	}
};

const transformTransportItineraryData = (itinerary: TransportItinerary): any => {
	return {
		sequence: Number(itinerary.sequence) || 0,
		travel_id: Number(itinerary.travel_id) || 0,
		journey_id: Number(itinerary.journey_id) || 0,
		service_transportation_id: Number(itinerary.service_transportation_id) || 0,
	};
};

const transformTransportItineraryDataForUpdate = (itinerary: TransportItinerary): any => {
	return {
		sequence: Number(itinerary.sequence) || 0,
		travel_id: Number(itinerary.travel_id) || 0,
		journey_id: Number(itinerary.journey_id) || 0,
		service_transportation_id: Number(itinerary.service_transportation_id) || 0,
	};
};

export const createTransportItinerary = async (
	itinerary: TransportItinerary
): Promise<TransportItinerary> => {
	try {
		const payload = transformTransportItineraryData(itinerary);
		const response = await api.post(`${BASE_URL}`, payload);
		return response.data;
	} catch (error) {
		console.error('Error creating transport itinerary:', error);
		throw error;
	}
};

export const updateTransportItinerary = async (
	itinerary: TransportItinerary
): Promise<TransportItinerary> => {
	try {
		const itineraryId = itinerary.id;
		const payload = transformTransportItineraryDataForUpdate(itinerary);
		const response = await api.patch(`${BASE_URL}/${itineraryId}`, payload);
		return response.data;
	} catch (error) {
		console.error('Error updating transport itinerary:', error);
		throw error;
	}
};

export const deleteTransportItineraryById = async (id: string | number): Promise<void> => {
	try {
		await api.delete(`${BASE_URL}/${id}`);
	} catch (error) {
		console.error('Error deleting transport itinerary by ID:', error);
		throw error;
	}
};

export default {
	getTransportItineraries,
	getTransportItineraryById,
	getTransportItinerariesByTravel,
	getTransportItinerariesByJourney,
	createTransportItinerary,
	updateTransportItinerary,
	deleteTransportItineraryById,
};
