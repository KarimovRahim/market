import React, { useState } from 'react';
import ShopFilter from './ShopFilter';
import ProductGrid from './ProductGrid';
import ShopHeader from './ShopHeader';
import ShopNavigation from './ShopNavigation';
import { FiFilter, FiX } from 'react-icons/fi';

const ShopContent = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isFilterOpen ? <FiX /> : <FiFilter />}
            <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        {/* ShopHeader */}
        <div className="mb-6 md:mb-8">
          <ShopHeader />
        </div>

        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
            {/* Filter Sidebar - Mobile version */}
            {isFilterOpen && (
              <div className="lg:hidden fixed inset-0 z-40 pt-16 bg-white overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Filters</h3>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <FiX size={24} />
                    </button>
                  </div>
                  <ShopFilter />
                </div>
              </div>
            )}

            {/* Filter Sidebar - Desktop */}
            <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
              <div className="lg:sticky lg:top-6">
                <ShopFilter />
              </div>
            </div>

            {/* Product Grid */}
            <div className="w-full lg:w-3/4 xl:w-4/5">
              <ProductGrid />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 md:mt-10 lg:mt-12">
          <ShopNavigation />
        </div>
      </div>
    </div>
  );
};

export default ShopContent;