import api from '@/interceptors/msLogicInterceptor';
import { TravelCustomer } from '../types/travel.type';

const BASE_URL = '/travel-customer';

/**
 * Extrae un mensaje de error amigable
 */
const getErrorMessage = (error: unknown): string => {
	if (!error) return 'Error desconocido';

	if (typeof error === 'object' && error !== null) {
		const axiosError = error as any;

		if (axiosError.response?.data?.message) {
			return axiosError.response.data.message;
		}
		if (axiosError.response?.data?.errors?.[0]?.message) {
			return axiosError.response.data.errors[0].message;
		}
		if (axiosError.code === 'ERR_NETWORK') {
			return 'Error de conexión. Verifica tu conexión a internet.';
		}
		if (axiosError.response?.status === 500) {
			return 'Error interno del servidor.';
		}
		if (axiosError.response?.status === 404) {
			return 'Recurso no encontrado.';
		}
		if (axiosError.message) {
			return axiosError.message;
		}
	}

	if (error instanceof Error) {
		return error.message;
	}

	return 'Error desconocido';
};

export const CustomerPaymentsService = {
	async getCustomerPayments(userId: string): Promise<TravelCustomer[]> {
		try {
			const response = await api.get(`${BASE_URL}/${userId}/in-payment-or-paid`);

			if (response.data?.status === 'success' && Array.isArray(response.data.data)) {
				return response.data.data;
			}

			if (Array.isArray(response.data)) {
				return response.data;
			}

			return [];
		} catch (error: unknown) {
			const errorMessage = getErrorMessage(error);
			throw new Error(errorMessage);
		}
	},

	async payQuota(quotaId: number): Promise<any> {
		try {
			const response = await api.post(`/quota/${quotaId}/pay`);
			return response.data?.data || response.data;
		} catch (error: unknown) {
			const errorMessage = getErrorMessage(error);
			throw new Error(errorMessage);
		}
	},
};
