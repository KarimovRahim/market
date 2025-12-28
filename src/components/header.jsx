import React from 'react';
import { useSelector } from 'react-redux';
import { ShoppingCart, Search, User } from 'lucide-react';

const Header = () => {
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold">Shop</span>
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-6">
            <button className="relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button className="flex items-center space-x-2">
              <User size={24} />
              <span>Account</span>
            </button>
          </div>
        </div>
        
        {/* Categories Navigation */}
        <nav className="mt-4">
          <div className="flex space-x-6">
            <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
              All Products
            </button>
            <button className="text-gray-600 hover:text-blue-600 font-medium">
              Electronics
            </button>
            <button className="text-gray-600 hover:text-blue-600 font-medium">
              Home & Lifestyle
            </button>
            <button className="text-gray-600 hover:text-blue-600 font-medium">
              Medicine
            </button>
            <button className="text-gray-600 hover:text-blue-600 font-medium">
              Sports & Outdoor
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;