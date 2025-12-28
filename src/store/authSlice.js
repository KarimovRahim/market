import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://103.7.54.156:81/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Registering user:', userData);

      const response = await api.post('AuthByPhone/loginByPhone', {
        phone: userData.phone,
        password: userData.password,
        ...(userData.name && { name: userData.name }),
      });

      console.log('Registration response:', response.data);

      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
      }
      if (response.data.userId || response.data.id) {
        localStorage.setItem('userID', response.data.userId || response.data.id);
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

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

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Logging in:', credentials);

      const response = await api.post('AuthByPhone/loginByPhone', {
        PhoneNumber: credentials.phone.trim(),
        password: credentials.password,
      });

      console.log('Login response:', response.data);

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
        const response = await api.get('/User/current', {
          headers: { Authorization: `Bearer ${token}` }
        });
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

const getInitialState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const userId = localStorage.getItem('userID');

  return {
    user: user ? JSON.parse(user) : null,
    token: token,
    userId: userId,
    isAuthenticated: !!token,
    isLoading: false,
    error: null,
  };
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || {
          id: action.payload.userId || action.payload.id,
          phone: action.payload.phone,
          name: action.payload.name,
        };
        state.token = action.payload.accessToken;
        state.userId = action.payload.userId || action.payload.id;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || {
          id: action.payload.userId || action.payload.id,
          phone: action.payload.phone,
          name: action.payload.name,
        };
        state.token = action.payload.accessToken;
        state.userId = action.payload.userId || action.payload.id;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      });
  },
});

export const { logout, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;