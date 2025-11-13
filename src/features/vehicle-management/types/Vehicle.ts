export interface Gps {
	id?: number;
	latitude: number;
	longitude: number;
	vehicle_id?: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface Vehicle {
	id?: number;
	brand: string;
	type: 'carro' | 'aeronave';
	model: number;
	color: string;
	capacity: number;
	gps_id?: number;
	gps?: Gps;
	createdAt?: string;
	updatedAt?: string;
}

export default Vehicle;
