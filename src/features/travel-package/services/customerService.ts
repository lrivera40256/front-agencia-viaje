import api from "@/interceptors/msLogicInterceptor";

export class CustomerService {
    static async createCustomer(payload: { name: string; email: string; password: string }) {
        try {
            const response = await api.post('/customer/user-customer', payload);
            return response.data;
        } catch (error) {
            console.error("Error creating customer:", error);
            throw error;
        }
    }
}