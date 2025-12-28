import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';

const ShopNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-50 md:hidden">
      <div className="flex justify-around items-center">
        <Link to="/Home" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FaHome className="text-xl" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/Wishlist" className="flex flex-col items-center text-gray-600 hover:text-pink-600">
          <FaHeart className="text-xl" />
          <span className="text-xs mt-1">Wishlist</span>
        </Link>
        
        <Link to="/Cart" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <div className="relative">
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>
          <span className="text-xs mt-1">Cart</span>
        </Link>
        
        <Link to="/Profile" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FaUser className="text-xl" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default ShopNavigation;