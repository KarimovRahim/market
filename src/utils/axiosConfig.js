import axios from 'axios';

console.log('VITE_LOGIN_API:', import.meta.env.VITE_LOGIN_API);

export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_LOGIN_API,
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