import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: 'All products',
  selectedBrands: [],
  selectedFeatures: [],
  priceRange: [0, 10000],
  condition: 'Any',
  rating: null,
  sortBy: 'Most Popular',
  searchQuery: '',
  categories: ['All products', 'Electronics', 'Home & Lifestyle', 'Medicine', 'Sports & Outdoor'],
  brands: ['Samsung', 'Apple', 'Hummel', 'Posso', 'Lenovo'],
  features: ['Metallic', 'Plastic cover', '600 item', 'Super power', 'Large Memory']
};

export const shopFilterSlice = createSlice({
  name: 'shopFilter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    toggleBrand: (state, action) => {
      const brand = action.payload;
      if (state.selectedBrands.includes(brand)) {
        state.selectedBrands = state.selectedBrands.filter(b => b !== brand);
      } else {
        state.selectedBrands.push(brand);
      }
    },
    toggleFeature: (state, action) => {
      const feature = action.payload;
      if (state.selectedFeatures.includes(feature)) {
        state.selectedFeatures = state.selectedFeatures.filter(f => f !== feature);
      } else {
        state.selectedFeatures.push(feature);
      }
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setCondition: (state, action) => {
      state.condition = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategory = 'All products';
      state.selectedBrands = [];
      state.selectedFeatures = [];
      state.priceRange = [0, 10000];
      state.condition = 'Any';
      state.rating = null;
      state.sortBy = 'Most Popular';
      state.searchQuery = '';
    },
  },
});

export const { 
  setCategory, 
  toggleBrand, 
  toggleFeature, 
  setPriceRange, 
  setCondition, 
  setRating, 
  setSortBy,
  setSearchQuery,
  resetFilters 
} = shopFilterSlice.actions;

export default shopFilterSlice.reducer;