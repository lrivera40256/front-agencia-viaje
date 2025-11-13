export interface Travel {
	_id?: string;
	id?: number;
	name: string;
	description: string;
	creation_date?: string;
	start_date?: string | null;
	end_date?: string | null;
	price: number;
	created_at?: string;
	updated_at?: string;
	quotas?: any[];
	travelCustomers?: any[];
	transportItineraries?: any[];
	planTravels?: any[];
}
