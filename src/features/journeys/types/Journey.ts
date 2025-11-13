export interface City {
	id: number;
	name: string;
	department_id?: number;
	description?: string;
}

export interface Journey {
	id?: number;
	origin_id: number;
	destination_id: number;
	origin?: City;
	destination?: City;
	createdAt?: string;
	updatedAt?: string;
}

export default Journey;
