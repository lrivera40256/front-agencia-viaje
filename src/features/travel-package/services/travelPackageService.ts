import api from '@/interceptors/msLogicInterceptor';
import type { TravelPackage } from '../types/travel-package.type';

const BASE_URL = '/travel/package';

export const getTravelPackages = async (customerId?: number): Promise<TravelPackage[]> => {
	const url = customerId ? `${BASE_URL}/${customerId}` : BASE_URL;
	try {
		const response = await api.get(url);
		return response.data;
	} catch (error) {
		console.error('Error fetching travel packages:', error);
		throw error;
	}
};
