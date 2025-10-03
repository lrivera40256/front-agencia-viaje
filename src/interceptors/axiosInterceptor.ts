import axios from 'axios';

// Lista de rutas que no deben ser interceptadas
const EXCLUDED_ROUTES = ["/public"];
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor de solicitud
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		 if (EXCLUDED_ROUTES.some((route) => config.url?.includes(route)) || !token) {
            return config;
        }
		// Agrega el token si la ruta no está excluida
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const endpoint: string = error?.config?.url ?? '';
    const isAuthEndpoint = EXCLUDED_ROUTES.some((route) => endpoint.includes(route)) 
    
    if (error.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;