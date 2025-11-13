import type { BankCard } from '@/features/bank-cards/types/BankCard';
import api from '@/interceptors/msLogicInterceptor';

export const getBankCards = async (): Promise<BankCard[]> => {
  try {
    const response = await api.get('/bank-card');
    return response.data;
  } catch (error) {
    console.error('Error fetching bank cards:', error);
    throw error;
  }
};

export const getBankCardById = async (id: number | string): Promise<BankCard> => {
  try {
    const response = await api.get(`/bank-card/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bank card by ID:', error);
    throw error;
  }
};

export const getBankCardByNumber = async (number: string): Promise<BankCard> => {
  try {
    const response = await api.get(`/bank-card/number/${number}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bank card by number:', error);
    throw error;
  }
};

export const createBankCard = async (payload: BankCard): Promise<void> => {
  try {
    const response = await api.post('/bank-card', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating bank card:', error);
    throw error;
  }
};

export const updateBankCard = async (payload: BankCard): Promise<void> => {
  try {
    const body = { ...(payload as any) };
    if (body.id) delete body.id;
    const response = await api.put(`/bank-card/${payload.id}`, body);
    return response.data;
  } catch (error) {
    console.error('Error updating bank card:', error);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.error('Server response:', (error as any)?.response?.data);
    } catch (_) {}
    throw error;
  }
};

export const deleteBankCardById = async (id: number | string): Promise<void> => {
  try {
    const response = await api.delete(`/bank-card/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting bank card by ID:', error);
    throw error;
  }
};

export default {
  getBankCards,
  getBankCardById,
  getBankCardByNumber,
  createBankCard,
  updateBankCard,
  deleteBankCardById,
};
