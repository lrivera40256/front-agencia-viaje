import type { Room } from '@/features/rooms/types/Room';
import api from '@/interceptors/msLogicInterceptor';

const BASE_URL = '/rooms';

export const getRooms = async (): Promise<Room[]> => {
	try {
		const response = await api.get(`${BASE_URL}?include=hotel`);
		return response.data;
	} catch (error) {
		console.error('Error fetching rooms:', error);
		throw error;
	}
};

export const getRoomById = async (id: string | number): Promise<Room> => {
	try {
		const response = await api.get(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching room by ID:', error);
		throw error;
	}
};

export const getRoomsByHotel = async (hotelId: number): Promise<Room[]> => {
	try {
		const response = await api.get(`${BASE_URL}/hotel/${hotelId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching rooms by hotel:', error);
		throw error;
	}
};

export const getAvailableRooms = async (): Promise<Room[]> => {
	try {
		const response = await api.get(`${BASE_URL}/available`);
		return response.data;
	} catch (error) {
		console.error('Error fetching available rooms:', error);
		throw error;
	}
};

const transformRoomData = (room: Room): any => {
	return {
		room_number: room.room_number,
		price_per_night: Number(room.price_per_night) || 0,
		is_available: Boolean(room.is_available),
		hotel_id: Number(room.hotel_id),
	};
};

// Para UPDATE: no incluimos is_available porque puede ser read-only en el backend
const transformRoomDataForUpdate = (room: Room): any => {
	return {
		room_number: room.room_number,
		price_per_night: Number(room.price_per_night) || 0,
		hotel_id: Number(room.hotel_id),
	};
};

export const createRoom = async (room: Room): Promise<Room> => {
	try {
		const payload = transformRoomData(room);
		const response = await api.post(`${BASE_URL}`, payload);
		return response.data;
	} catch (error) {
		console.error('Error creating room:', error);
		throw error;
	}
};

export const updateRoom = async (room: Room): Promise<Room> => {
	try {
		const roomId = room.id;
		const payload = transformRoomDataForUpdate(room);
		const response = await api.put(`${BASE_URL}/${roomId}`, payload);
		return response.data;
	} catch (error: any) {
		console.error('Error updating room:', error);
		throw error;
	}
};

export const deleteRoomById = async (id: string | number): Promise<void> => {
	try {
		await api.delete(`${BASE_URL}/${id}`);
	} catch (error) {
		console.error('Error deleting room by ID:', error);
		throw error;
	}
};

export default {
	getRooms,
	getRoomById,
	getRoomsByHotel,
	getAvailableRooms,
	createRoom,
	updateRoom,
	deleteRoomById,
};
