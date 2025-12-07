import api from "@/interceptors/msLogicInterceptor";

export class DashboardService {
    static async getHistory() {
        try {
            const response =await api.get('/travel/stats/monthly');
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard history:', error);
            throw error;
        }
    }
    static async getTypesVehicles() {
        try {
            const response =await api.get('/travel/stats/type-distribution');
            return response.data;
        } catch (error) {
            console.error('Error fetching types of vehicles:', error);
            throw error;
        }
    }
    static async getTopDestinations() {
        try {
            const response =await api.get('/travel/stats/destination-distribution');
            return response.data;
        } catch (error) {
            console.error('Error fetching top destinations:', error);
            throw error;
        }
    }
}