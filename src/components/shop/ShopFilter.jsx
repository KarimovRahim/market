import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronDown, FaStar, FaRegStar } from 'react-icons/fa';
import {
  setCategory,
  toggleBrand,
  toggleFeature,
  setPriceRange,
  setCondition,
  setRating,
  resetFilters
} from '../../store/shopFilterSlice';

const ShopFilter = () => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.shopFilter);

  const categories = [
    { name: 'All products', count: 24 },
    { name: 'Electronics', count: 12 },
    { name: 'Home & Lifestyle', count: 6 },
    { name: 'Medicine', count: 3 },
    { name: 'Sports & Outdoor', count: 8 },
  ];

  const brands = [
    { name: 'Samsung', count: 8 },
    { name: 'Apple', count: 6 },
    { name: 'Hummel', count: 3 },
    { name: 'Posso', count: 2 },
    { name: 'Lenovo', count: 4 },
  ];

  const features = [
    { name: 'Metallic', count: 5 },
    { name: 'Plastic cover', count: 8 },
    { name: '600 item', count: 2 },
    { name: 'Super power', count: 7 },
    { name: 'Large Memory', count: 9 },
  ];

  const conditions = ['Any', 'Refurbished', 'Brand new', 'Old home'];
  const ratings = [5, 4, 3, 2, 1];
  const prices = [100, 390, 700, 960, 160, 680, 650, 850, 870];

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  const handleBrandToggle = (brand) => {
    dispatch(toggleBrand(brand));
  };

  const handleFeatureToggle = (feature) => {
    dispatch(toggleFeature(feature));
  };

  const handlePriceRangeChange = (e) => {
    dispatch(setPriceRange([0, parseInt(e.target.value)]));
  };

  const handleConditionChange = (condition) => {
    dispatch(setCondition(condition));
  };

  const handleRatingChange = (rating) => {
    dispatch(setRating(rating));
  };

  const handleApplyFilters = () => {
    console.log('Applied filters:', filterState);
    alert(`Filters applied!\nCategory: ${filterState.selectedCategory}\nBrands: ${filterState.selectedBrands.length}\nPrice: $${filterState.priceRange[0]}-$${filterState.priceRange[1]}`);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    alert('All filters reset!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 sticky top-6 border border-red-100">
      {/* Category Section */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">Category</h3>
          <FaChevronDown className="text-gray-400" />
        </div>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <label key={index} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={filterState.selectedCategory === category.name}
                  onChange={() => handleCategoryChange(category.name)}
                  className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-400"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-red-600 transition-colors">
                  {category.name}
                </span>
              </div>
              <span className="text-xs text-gray-500 bg-red-50 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </label>
          ))}
        </div>
        <button className="w-full mt-3 text-red-500 hover:text-red-600 font-medium text-xs">
          See all
        </button>
      </div>

      {/* Brand Section */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">Brand</h3>
          <FaChevronDown className="text-gray-400" />
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {brands.map((brand, index) => (
            <label key={index} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={filterState.selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandToggle(brand.name)}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-red-600 transition-colors">
                  {brand.name}
                </span>
              </div>
              <span className="text-xs text-gray-500 bg-red-50 px-2 py-1 rounded-full">
                {brand.count}
              </span>
            </label>
          ))}
        </div>
        <button className="w-full mt-3 text-red-500 hover:text-red-600 font-medium text-xs">
          See all
        </button>
      </div>

      {/* Features Section */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">Features</h3>
          <FaChevronDown className="text-gray-400" />
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {features.map((feature, index) => (
            <label key={index} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={filterState.selectedFeatures.includes(feature.name)}
                  onChange={() => handleFeatureToggle(feature.name)}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-red-600 transition-colors">
                  {feature.name}
                </span>
              </div>
              <span className="text-xs text-gray-500 bg-red-50 px-2 py-1 rounded-full">
                {feature.count}
              </span>
            </label>
          ))}
        </div>
        <button className="w-full mt-3 text-red-500 hover:text-red-600 font-medium text-xs">
          See all
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Price range</h3>
        <input
          type="range"
          min="0"
          max="10000"
          value={filterState.priceRange[1]}
          onChange={handlePriceRangeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500"
        />
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>${filterState.priceRange[0]}</span>
          <span>${filterState.priceRange[1]}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {prices.map((price, index) => (
            <button
              key={index}
              onClick={() => dispatch(setPriceRange([0, price]))}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${filterState.priceRange[1] === price
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 border border-gray-200'
                }`}
            >
              ${price}
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Condition</h3>
        <div className="space-y-2">
          {conditions.map((condition, index) => (
            <label key={index} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="condition"
                checked={filterState.condition === condition}
                onChange={() => handleConditionChange(condition)}
                className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-400"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-red-600 transition-colors">
                {condition}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Rating</h3>
        <div className="space-y-2">
          {ratings.map((stars) => (
            <label key={stars} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filterState.rating === stars}
                onChange={() => handleRatingChange(stars)}
                className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400"
              />
              <div className="flex items-center ml-2">
                {[...Array(5)].map((_, i) => (
                  i < stars ? (
                    <FaStar key={i} className="text-yellow-400 text-xs" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300 text-xs" />
                  )
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Info */}
      {(filterState.selectedCategory !== 'All products' || 
        filterState.selectedBrands.length > 0 || 
        filterState.selectedFeatures.length > 0 ||
        filterState.rating !== null) && (
        <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-100">
          <p className="text-xs font-medium text-red-700 mb-1">Active Filters:</p>
          <div className="flex flex-wrap gap-1">
            {filterState.selectedCategory !== 'All products' && (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                {filterState.selectedCategory}
              </span>
            )}
            {filterState.selectedBrands.map(brand => (
              <span key={brand} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                {brand}
              </span>
            ))}
            {filterState.selectedFeatures.map(feature => (
              <span key={feature} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                {feature}
              </span>
            ))}
            {filterState.rating && (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                Rating: {filterState.rating}★
              </span>
            )}
          </div>
        </div>
      )}

      {/* Apply Button */}
      <div className="space-y-3">
        <button
          onClick={handleApplyFilters}
          className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="w-full py-2.5 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
        >
          Reset All
        </button>
      </div>
    </div>
  );
};

export default ShopFilter;