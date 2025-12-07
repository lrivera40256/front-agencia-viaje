import type { Plan } from "../types/Plan";
import api from '@/interceptors/msLogicInterceptor';

export const getPlansByCity = async (cityId: number | string): Promise<Plan[]> => {
  try {
    const url = `/plan-tourist-activities/city/${cityId}` ;
    const resp = await api.get(url);
    console.log(resp.data);
    
    return resp.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

export const getPlanById = async (id: number | string): Promise<Plan> => {
  try {
    const resp = await api.get(`/plans/${id}`);
    return resp.data;
  } catch (error) {
    console.error('Error fetching plan by id:', error);
    throw error;
  }
};

export const createPlan = async (payload: Partial<Plan>): Promise<Plan> => {
  try {
    const resp = await api.post('/plan-tourist-activities/create-with-activities', payload);
    return resp.data;
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
};

export default { getPlansByCity, getPlanById, createPlan };
