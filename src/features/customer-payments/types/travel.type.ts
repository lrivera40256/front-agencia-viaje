/**
 * Estado del viaje del cliente
 */
export type TravelCustomerStatus = 'inPayment' | 'paid';

/**
 * Estado de una cuota
 */
export type QuotaStatus = 'pending' | 'paid';

/**
 * Información del cliente en la respuesta
 */
export interface CustomerResponse {
	id: number;
	user_id: string;
	created_at: string;
	updated_at: string;
}

/**
 * Información del viaje en la respuesta
 */
export interface TravelResponse {
	id: number;
	name: string;
	description: string | null;
	creation_date: string;
	start_date: string;
	end_date: string;
	price: number;
	created_at: string;
	updated_at: string;
}

/**
 * Cuota de pago
 */
export interface PaymentQuota {
	id: number;
	travel_customer_id: number;
	amount: number;
	number_quota: number;
	due_date: string;
	status: QuotaStatus;
	payment_date?: string | null;
	created_at?: string;
	updated_at?: string;
}

/**
 * Objeto TravelCustomer que llega del backend (con cuotas incluidas)
 */
export interface TravelCustomer {
	id: number;
	travel_id: number;
	customer_id: number;
	status: TravelCustomerStatus;
	created_at: string;
	updated_at: string;
	customer: CustomerResponse;
	travel: TravelResponse;
	quotas: PaymentQuota[]; // ← Las cuotas vienen incluidas
}

/**
 * Respuesta completa del endpoint GET /travel-customer/:userId/in-payment-or-paid
 */
export interface TravelCustomerApiResponse {
	status: 'success' | 'error';
	data: TravelCustomer[];
	message?: string;
}

/**
 * Resumen de pagos del cliente
 */
export interface CustomerPaymentSummary {
	totalTravels: number;
	totalAmount: number;
	totalPaid: number;
	totalPending: number;
}
