export interface Travel {
	id: number;
	name: string;
}

export interface Quota {
	id?: number;
	amount: number;
	number_payments: number;
	travel_id: number;
	travel?: Travel;
	createdAt?: string;
	updatedAt?: string;
}

export default Quota;
