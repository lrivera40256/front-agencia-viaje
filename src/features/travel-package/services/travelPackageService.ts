import api from '@/interceptors/msLogicInterceptor';
import type { TravelPackage } from '../types/travel-package.type';
import { toast } from 'sonner';
import { log } from 'node:console';

const BASE_URL = '/travel/travel-package';

export const getTravelPackages = async (customerId: string,owsnTravel:boolean,profile): Promise<TravelPackage[]> => {
	try {
		
		const response = await api.post(BASE_URL, { userId: customerId ,owsnTravel});
		return response?response.data:[];
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
