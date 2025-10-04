import axios from 'axios';

// Lista de rutas que no deben ser interceptadas
const EXCLUDED_ROUTES = [
  '/public/security/login',
  '/public/security/validate-2fa',
  '/public/security/register'
];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Interceptor de solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const isExcluded = EXCLUDED_ROUTES.some(route => config.url?.includes(route));

    // Auth header (solo si no es ruta excluida y hay token)
    if (token && !isExcluded) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Ajuste dinámico de Content-Type
    if (config.data instanceof FormData) {
      // Deja que el navegador ponga boundary
      if (config.headers && 'Content-Type' in config.headers) {
        delete config.headers['Content-Type'];
      }
    } else {
      if (config.headers && !config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const endpoint: string = error?.config?.url ?? '';
    const isExcluded = EXCLUDED_ROUTES.some(route => endpoint.includes(route));
    const status = error?.response?.status;

    if (status === 401 && !isExcluded) {
      // Mantengo limpieza de token que ya tenías
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;