import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '../utils/axiosConfig.js'
import { saveToken, saveRegistToken, getUserId, getToken } from '../utils/token.js';

const user = getToken();
const userID = getUserId();

console.log('Current user ID:', userID);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Registering user:', userData);

      const requestData = {
        phoneNumber: userData.phone,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        login: userData.name,
        isPersonalDataAccepted: true
      };

      console.log('Sending to server:', requestData);

      const response = await axiosRequest.post('AuthByPhone/registerPhone', requestData);

      console.log('Registration response:', response.data);

      localStorage.setItem('pendingVerificationPhone', userData.phone);

      return { ...response.data, phoneNumber: userData.phone };

    } catch (error) {
      console.error('Registration error:', error);

      console.log('===== REGISTRATION ERROR START =====');
      console.log('Error:', error);
      console.log('Status:', error.response?.status);
      console.log('Response data:', error.response?.data);
      console.log('Request data sent:', error.config?.data);
      console.log('===== REGISTRATION ERROR END =====');

      const serverData = error.response?.data;

      let errorMessage = 'Registration failed';

      if (serverData?.errors) {
        const firstKey = Object.keys(serverData.errors)[0];
        errorMessage = serverData.errors[firstKey][0];
      } else if (serverData?.message) {
        errorMessage = serverData.message;
      } else if (serverData?.error) {
        errorMessage = serverData.error;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const confirmPhone = createAsyncThunk(
  'auth/confirmPhone',
  async (confirmData, { rejectWithValue }) => {
    try {
      console.log('Confirming phone:', confirmData);

      console.log('➡️ CONFIRM PHONE — sending to backend:', {
        phoneNumber: confirmData.phoneNumber,
        code: confirmData.code,
      });

      const response = await axiosRequest.post('AuthByPhone/confirmPhone', {
        "phoneNumber": confirmData.phoneNumber,
        "code": confirmData.code
      });

      console.log('Confirmation response:', response.data);
      
      // Сохраняем токен после подтверждения
      if (response.data?.accessToken) {
        saveToken(response.data);
      }

      return response.data;
    } catch (error) {
      console.error('Confirmation error:', error);
      
      console.log('===== CONFIRMATION ERROR START =====');
      console.log('Error:', error);
      console.log('Status:', error.response?.status);
      console.log('Response data:', error.response?.data);
      console.log('Request data sent:', error.config?.data);
      console.log('===== CONFIRMATION ERROR END =====');

      const serverData = error.response?.data;

      let errorMessage = 'Invalid verification code';

      if (serverData?.errors) {
        const firstKey = Object.keys(serverData.errors)[0];
        errorMessage = serverData.errors[firstKey][0];
      } else if (serverData?.message) {
        errorMessage = serverData.message;
      } else if (serverData?.error) {
        errorMessage = serverData.error;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const resendVerificationCode = createAsyncThunk(
  'auth/resendCode',
  async (phoneNumber, { rejectWithValue }) => {
    try {
      console.log('Resending code to:', phoneNumber);

      const response = await axiosRequest.post('AuthByPhone/registerPhone', {
        phoneNumber: phoneNumber
      });

      console.log('Resend response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Resend error:', error);
      
      console.log('===== RESEND ERROR START =====');
      console.log('Error:', error);
      console.log('Status:', error.response?.status);
      console.log('Response data:', error.response?.data);
      console.log('===== RESEND ERROR END =====');

      const serverData = error.response?.data;

      let errorMessage = 'Failed to resend code';

      if (serverData?.errors) {
        const firstKey = Object.keys(serverData.errors)[0];
        errorMessage = serverData.errors[firstKey][0];
      } else if (serverData?.message) {
        errorMessage = serverData.message;
      } else if (serverData?.error) {
        errorMessage = serverData.error;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

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