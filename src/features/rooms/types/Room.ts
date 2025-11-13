export interface Hotel {
	id: number;
	name: string;
	description?: string;
	location?: string;
}

export interface Room {
	id?: number;
	room_number: string;
	price_per_night: number;
	is_available: boolean;
	hotel_id: number;
	hotel?: Hotel;
	createdAt?: string;
	updatedAt?: string;
}

export default Room;
