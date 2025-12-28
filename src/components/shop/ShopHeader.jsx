import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { setSearchQuery } from '../../store/shopFilterSlice';

const ShopHeader = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Browse Products</h2>
          <p className="text-gray-600 mt-2">Filter by category, brand, price and more</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div className="flex gap-2">
            <Link 
              to="/Wishlist"
              className="relative flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              <FaHeart className="text-pink-500" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            <Link 
              to="/Cart"
              className="relative flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors font-medium"
            >
              <FaShoppingCart />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mt-6 text-sm text-gray-600">
        <Link to="/Home" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <span className="text-blue-600 font-medium">Shop</span>
      </div>

      {/* Filter Stats */}
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
          {cartItems.length} items in cart
        </div>
        <div className="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full">
          {wishlistItems.length} items in wishlist
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;