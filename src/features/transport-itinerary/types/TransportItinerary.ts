export interface Travel {
	id?: number;
	name?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Journey {
	id?: number;
	name?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface ServiceTransportation {
	id?: number;
	name?: string;
	type?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface TransportItinerary {
	id?: number;
	sequence: number;
	travel_id: number;
	journey_id: number;
	service_transportation_id: number;
	travel?: Travel;
	journey?: Journey;
	serviceTransportation?: ServiceTransportation;
	createdAt?: string;
	updatedAt?: string;
}

export default TransportItinerary;
