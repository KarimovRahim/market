import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';
import { setSortBy } from '../../store/shopFilterSlice';
import { allProducts } from '../ProductData';

const ProductGrid = () => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.shopFilter);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Функция фильтрации товаров
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Фильтрация по поисковому запросу
    if (filterState.searchQuery) {
      const query = filterState.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Фильтрация по категории
    if (filterState.selectedCategory !== 'All products') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(filterState.selectedCategory.toLowerCase().split(' ')[0])
      );
    }

    // Фильтрация по брендам
    if (filterState.selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        filterState.selectedBrands.includes(product.brand)
      );
    }

    // Фильтрация по цене
    filtered = filtered.filter(product => 
      product.price >= filterState.priceRange[0] && 
      product.price <= filterState.priceRange[1]
    );

    // Сортировка
    switch (filterState.sortBy) {
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Newest First':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Most Popular - случайный порядок
        filtered.sort(() => Math.random() - 0.5);
    }

    return filtered;
  }, [filterState, allProducts]);

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleAddToCart = (productId) => {
    console.log('Added to cart:', productId);
    alert(`Product ${productId} added to cart!`);
  };

  const handleAddToWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      console.log('Removed from wishlist:', productId);
    } else {
      setWishlist([...wishlist, productId]);
      console.log('Added to wishlist:', productId);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Sorting and Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-gray-600">
            Showing <span className="font-bold text-gray-900">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> of <span className="font-bold text-gray-900">{filteredProducts.length}</span> products
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Sort by:</span>
            <select 
              value={filterState.sortBy}
              onChange={handleSortChange}
              className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
            >
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300">
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  product.label === 'NEW' ? 'bg-green-500 text-white' :
                  product.label === 'HOT' ? 'bg-red-500 text-white' :
                  product.label === 'TOP' ? 'bg-yellow-500 text-white' :
                  product.label === 'BEST' ? 'bg-pink-500 text-white' :
                  'bg-blue-500 text-white'
                }`}>
                  {product.label}
                </span>
              </div>
              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleAddToWishlist(product.id)}
                  className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 ${
                    wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-600'
                  }`}
                >
                  <FaHeart />
                </button>
                <button 
                  onClick={() => handleAddToCart(product.id)}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
                >
                  <FaShoppingCart className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-sm text-gray-500">{product.brand}</span>
                  <h3 className="font-bold text-lg mt-1 line-clamp-2">{product.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${product.price}</div>
                  <div className="text-sm text-gray-500 line-through">${Math.floor(product.price * 1.2)}</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    star <= 4 ? (
                      <FaStar key={star} className="text-yellow-400 text-sm" />
                    ) : (
                      <FaRegStar key={star} className="text-gray-300 text-sm" />
                    )
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.5)</span>
              </div>

              {/* Category and Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {product.functionality}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleAddToCart(product.id)}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
                <button 
                  onClick={() => handleAddToWishlist(product.id)}
                  className={`px-4 py-3 rounded-xl transition-colors flex items-center justify-center ${
                    wishlist.includes(product.id)
                      ? 'bg-red-50 border-2 border-red-200 text-red-600'
                      : 'border-2 border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Пагинация (исправленная) */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2 bg-white rounded-2xl shadow-lg p-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-5 py-3 rounded-xl transition-colors ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              // Показываем только несколько страниц
              if (
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-5 py-3 rounded-xl transition-colors ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                page === currentPage - 2 || 
                page === currentPage + 2
              ) {
                return (
                  <span key={page} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-5 py-3 rounded-xl transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Ссылка на Wishlist */}
      <div className="mt-8 text-center">
        <Link 
          to="/Wishlist"
          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
        >
          <FaHeart />
          <span>View My Wishlist ({wishlist.length} items)</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductGrid;