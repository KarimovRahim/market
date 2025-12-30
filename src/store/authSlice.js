import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, getCurrentUser } from '../api';

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