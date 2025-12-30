import axios from 'axios';

export const axiosRequest = axios.create({
  baseURL: '/api', // Будет проксироваться через Vercel
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);