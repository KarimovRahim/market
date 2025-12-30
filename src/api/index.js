import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '../utils/axiosConfig.js'
import { saveToken, saveRegistToken, getUserId, getToken } from '../utils/token.js';

// ✅ Получаем токен из localStorage
const user = getToken();
const userID = getUserId();

console.log('Current user ID:', userID);

// ✅ Регистрация пользователя
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Registering user:', userData);

      const response = await axiosRequest.post('AuthByPhone/registerPhone', {
        phone: userData.phone,
        password: userData.password,
        ...(userData.name && { name: userData.name }),
      });

      console.log('Registration response:', response.data);

      // Сохраняем токен
      saveRegistToken(response.data);

      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Registration failed'
      );
    }
  }
);

// ✅ Авторизация
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Logging in:', credentials);

      const response = await axiosRequest.post('AuthByPhone/loginByPhone', {
        PhoneNumber: credentials.phone.trim(),
        password: credentials.password,
      });

      console.log('Login response:', response.data);

      // Сохраняем токен
      saveToken(response.data);

      return response.data;
    } catch (error) {
      console.log('===== AXIOS ERROR START =====');
      console.log('Full error:', error);
      console.log('Status:', error.response?.status);
      console.log('Response data:', error.response?.data);
      console.log('===== AXIOS ERROR END =====');

      const serverData = error.response?.data;

      let errorMessage = 'Login failed';

      if (serverData?.errors) {
        const firstKey = Object.keys(serverData.errors)[0];
        errorMessage = serverData.errors[firstKey][0];
      } else if (serverData?.message) {
        errorMessage = serverData.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ Получение текущего пользователя
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      try {
        const response = await axiosRequest.get('/User/current');
        return response.data;
      } catch (apiError) {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
      }
    } catch (error) {
      return rejectWithValue('Failed to get user');
    }
  }
);

// ✅ Получение всех пользователей (пример)
export const GetUser = createAsyncThunk(
  'user/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get('/User/AllItems');
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || 'Ошибка при получении пользователей');
    }
  }
);