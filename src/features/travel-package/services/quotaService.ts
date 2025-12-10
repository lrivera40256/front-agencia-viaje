import api from '@/interceptors/msLogicInterceptor';
import type { Quota } from '../types/travel-package.type';
import usePayQuota from '../components/payQuota';
const BASE_URL = '/quota';

export const createQuota = async (
  data: Quota,isPayQuota :boolean) => {
  try {
    const payload = isPayQuota ? { ...data, isPayQuota } : data;
    console.log(payload);
    const response = await api.post(`${BASE_URL}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating quota:', error);
    throw error;
  }
}
export const payQuota = async (quotaId: number) => {
  try {
    const response = await api.post(`${BASE_URL}/pay/${quotaId}`);  
    return response.data;
  } catch (error) {
    console.error('Error paying quota:', error);
    throw error;
  }
}


export const createMultipleQuotas = async (data: { data: Quota; numQuotas: number }) => {
  let flag=true;
  let payment ;
  for (let i = 0; i < data.numQuotas; i++) {
    if(i>=1){
      flag=false;
    }
    const response = await createQuota({ ...data.data, number_payments: i + 1, due_date: calculateDueDate(data.data.due_date, i) }, flag);
    if(i==0){
      payment=response;
    }
  }
  
  return payment
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