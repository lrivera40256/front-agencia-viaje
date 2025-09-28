import axios from 'axios';

// Rutas de autenticación (no adjuntar token y no redirigir en 401)
const AUTH_WHITELIST = [
  '/public/security/login',
  '/public/security/validate-2fa',
];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor de solicitud
api.interceptors.request.use(
  (config) => {
    const endpoint = config.url ?? '';
    const skipAuth = AUTH_WHITELIST.some((p) => endpoint.endsWith(p));

    // Usa el token correcto si existe (después de 2FA guardas accessToken)
    const token =
      localStorage.getItem('accessToken') || localStorage.getItem('google_token');

    if (!skipAuth && token) {
      if (!config.headers) {
        config.headers = {} as any;
      }
      const h = config.headers as any;
      if (typeof h.set === 'function') {
        h.set('Authorization', `Bearer ${token}`);
      } else {
        h['Authorization'] = `Bearer ${token}`;
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
    const isAuthEndpoint = AUTH_WHITELIST.some((p) => endpoint.endsWith(p));

    if (error?.response?.status === 401 && !isAuthEndpoint) {
      console.log('No autorizado, redirigiendo a login...');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;