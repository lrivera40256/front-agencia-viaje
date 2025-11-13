import type { Vehicle } from '@/features/vehicle-management/types/Vehicle';
import api from '@/interceptors/msLogicInterceptor';

const BASE_URL = '/vehicles';

export const getVehicles = async (): Promise<Vehicle[]> => {
	try {
		const response = await api.get(`${BASE_URL}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching vehicles:', error);
		throw error;
	}
};

export const getVehicleById = async (id: string | number): Promise<Vehicle> => {
	try {
		const response = await api.get(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching vehicle by ID:', error);
		throw error;
	}
};

export const getVehiclesByType = async (type: 'carro' | 'aeronave'): Promise<Vehicle[]> => {
	try {
		const response = await api.get(`${BASE_URL}?type=${type}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching vehicles by type:', error);
		throw error;
	}
};

const transformVehicleData = (vehicle: Vehicle): any => {
	return {
		brand: vehicle.brand,
		type: vehicle.type,
		model: Number(vehicle.model) || 0,
		color: vehicle.color,
		capacity: Number(vehicle.capacity) || 0,
	};
};

const transformVehicleDataForUpdate = (vehicle: Vehicle): any => {
	return {
		brand: vehicle.brand,
		type: vehicle.type,
		model: Number(vehicle.model) || 0,
		color: vehicle.color,
		capacity: Number(vehicle.capacity) || 0,
	};
};

export const createVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
	try {
		const payload = transformVehicleData(vehicle);
		const response = await api.post(`${BASE_URL}`, payload);
		return response.data;
	} catch (error) {
		console.error('Error creating vehicle:', error);
		throw error;
	}
};

export const updateVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
	try {
		const vehicleId = vehicle.id;
		const payload = transformVehicleDataForUpdate(vehicle);
		const response = await api.put(`${BASE_URL}/${vehicleId}`, payload);
		return response.data;
	} catch (error) {
		console.error('Error updating vehicle:', error);
		throw error;
	}
};

export const deleteVehicleById = async (id: string | number): Promise<void> => {
	try {
		await api.delete(`${BASE_URL}/${id}`);
	} catch (error) {
		console.error('Error deleting vehicle by ID:', error);
		throw error;
	}
};

export default {
	getVehicles,
	getVehicleById,
	getVehiclesByType,
	createVehicle,
	updateVehicle,
	deleteVehicleById,
};
