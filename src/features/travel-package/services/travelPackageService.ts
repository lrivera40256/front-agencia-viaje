import api from '@/interceptors/msLogicInterceptor';
import type { TravelPackage } from '../types/travel-package.type';
import { toast } from 'sonner';
import { log } from 'node:console';

const BASE_URL = '/travel/package';

export const getTravelPackages = async (customerId?: string): Promise<TravelPackage[]> => {
	const url = customerId ? `${BASE_URL}/${customerId}` : BASE_URL;
	try {
		const response = await api.get(url);
		return response.data;
	} catch (error) {
		console.error('Error fetching travel packages:', error);
		throw error;
	}

};
export const createCustomerTravel = async (customer_id,travel_id): Promise<any> => {
	try {
		const response = await api.post("/travel-customer", { customer_id, travel_id });
		return response;
	}catch (error) {
		console.log(error);
		
	}
}
