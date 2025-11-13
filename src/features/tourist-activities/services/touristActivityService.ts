import type { TouristActivity } from '@/features/tourist-activities/types/TouristActivity';
import api from '@/interceptors/msLogicInterceptor';

export const getTouristActivities = async (): Promise<TouristActivity[]> => {
  try {
    const response = await api.get('/tourist-activities');
    return response.data;
  } catch (error) {
    console.error('Error fetching tourist activities:', error);
    throw error;
  }
};

export const getTouristActivityById = async (id: number | string): Promise<TouristActivity> => {
  try {
    const response = await api.get(`/tourist-activities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourist activity by ID:', error);
    throw error;
  }
};

export const getTouristActivityByName = async (name: string): Promise<TouristActivity> => {
  try {
    const response = await api.get(`/tourist-activities/name/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourist activity by name:', error);
    throw error;
  }
};

export const createTouristActivity = async (payload: TouristActivity): Promise<void> => {
  try {
    const response = await api.post('/tourist-activities', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating tourist activity:', error);
    throw error;
  }
};

export const updateTouristActivity = async (payload: TouristActivity): Promise<void> => {
  try {
    // assume backend uses id as path param
    const response = await api.put(`/tourist-activities/${payload.id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating tourist activity:', error);
    throw error;
  }
};

export const deleteTouristActivityById = async (id: number | string): Promise<void> => {
  try {
    const response = await api.delete(`/tourist-activities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting tourist activity by ID:', error);
    throw error;
  }
};

export default {
  getTouristActivities,
  getTouristActivityById,
  getTouristActivityByName,
  createTouristActivity,
  updateTouristActivity,
  deleteTouristActivityById,
};
