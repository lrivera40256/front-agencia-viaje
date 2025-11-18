import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_MS_LOGIC
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    
    if (status === 401 ) {
      window.location.href = '/';
    }
  }
);

export default api;