import { configureStore } from '@reduxjs/toolkit';
import shopFilterReducer from './shopFilterSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    shopFilter: shopFilterReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});