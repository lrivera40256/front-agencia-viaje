import api from '@/interceptors/msLogicInterceptor';
import type { Quota } from '../types/travel-package.type';
const BASE_URL = '/quota';

export const createQuota = async (
  data: Quota) => {
  try {
    const response = await api.post(`${BASE_URL}`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating quota:', error);
    throw error;
  }
}

export const createMultipleQuotas = async (data: { data: Quota; numQuotas: number }) => {
  for (let i = 0; i < data.numQuotas; i++) {
    await createQuota({ ...data.data, number_payments: i + 1, due_date: calculateDueDate(data.data.due_date, i) });
  }
}

const calculateDueDate = (startDate: string, monthsToAdd: number): string => {
  const date = new Date(startDate);
  const targetMonth = date.getMonth() + monthsToAdd;
  const targetYear = date.getFullYear();

  // Avanza al mes siguiente, luego retrocede 1 día → último día del mes deseado
  const result = new Date(targetYear, targetMonth + 1, 0);

  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, '0');
  const day = String(result.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getQuotasByAmount = async (travel_customer_id: number, amount: number): Promise<Quota[]> => {
  try {
    const response = await api.get(`${BASE_URL}/${travel_customer_id}/${amount}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quotas by amount:', error);
    throw error;
  }
}