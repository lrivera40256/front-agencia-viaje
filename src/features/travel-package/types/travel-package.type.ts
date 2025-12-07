export interface TravelPackage {
	id: number;
	name: string;
	description: string;
	start_date: string;
	end_date: string;
	price: number;
	image_url?: string;
	journeys: Journey[];
}

export interface Journey {
	id: number;
	name: string;
	description: string;
	start_date: string;
	end_date: string;
	origin: Location;
	destination: Location;
	itineraries: Itinerary[];
}

export interface Itinerary {
	id: number;
	day: number;
	activity: Activity;
	accommodation?: Accommodation;
	transport?: Transport;
}

export interface Activity {
	id: number;
	name: string;
	description: string;
	start_time: string;
	end_time: string;
	location: Location;
}

export interface Accommodation {
	id: number;
	name: string;
	address: string;
	check_in: string;
	check_out: string;
}

export interface Transport {
	id: number;
	type: 'flight' | 'bus' | 'train' | 'car';
	details: string;
	departure_time: string;
	arrival_time: string;
}

export interface Location {
	city: string;
	country: string;
}
