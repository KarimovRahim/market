import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.total = calculateTotal(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
        state.total = calculateTotal(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;