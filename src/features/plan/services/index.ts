import api from "@/interceptors/msLogicInterceptor";
import { Plan } from "../types/Plan.type";

export class PlanService {
    static async getPlans() {
        try {
            const { data } = await api.get('/plans');
            return data;
        } catch (error) {
            throw error;
        }
    }
    static async createPlan(plan: Plan) {
        try {
            const { data } = await api.post('/plans', plan);
            return data;
        } catch (error) {
            throw error;
        }
    }
    static async updatePlan(id: number, plan: Plan) {
        try {
            const { data } = await api.put(`/plans/${id}`, plan);
            return data;
        } catch (error) {
            throw error;
        }
    }
    static async deletePlan(id: number) {
        try {
            const { data } = await api.delete(`/plans/${id}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}