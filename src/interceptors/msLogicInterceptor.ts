import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_MS_LOGIC
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 403) {
      // window.location.href = '/';
    }
  }
);
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);

export default api;