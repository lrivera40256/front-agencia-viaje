import api from "@/interceptors/msLogicInterceptor";
import { Customer, CustomerFormData } from "../types/customer.type";

export class CustomerService {
    static async getCustomers():Promise<Customer[]> {
        try {
            const { data } = await api.get("/customer");
            console.log(data);
            
            return data;
        } catch (error) {
            throw error;
        }
    }
    static async createCustomer(customerData: CustomerFormData) {
        try {
            await api.post("/customer", customerData);
        } catch (error) {
            throw error;
        }
    }
    static async updateCustomer(customerId: number, customerData: CustomerFormData) {
        try {
             await api.patch(`/customer/${customerId}`, customerData);
        } catch (error) {
            throw error;
        }
    }
    static async deleteCustomer(customerId: number) {
        try {
            await api.delete(`/customer/${customerId}`);
        } catch (error) {
            throw error;
        }
    }
}