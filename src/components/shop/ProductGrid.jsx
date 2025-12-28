import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar, FaRegStar, FaEye } from 'react-icons/fa';
import { setSortBy } from '../../store/shopFilterSlice';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import { allProducts } from '../ProductsData';

const ProductGrid = () => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.shopFilter);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
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

  // Обработчики событий
  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand
    }));
    alert(`"${product.name}" added to cart!`);
  };

  const handleToggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      alert(`"${product.name}" removed from wishlist!`);
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        label: product.label || 'FAVORITE'
      }));
      alert(`"${product.name}" added to wishlist!`);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Проверка в избранном
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Проверка в корзине
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Генерация звезд рейтинга
  const renderStars = (rating = 4) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          star <= rating ? (
            <FaStar key={star} className="text-yellow-400 text-sm" />
          ) : (
            <FaRegStar key={star} className="text-gray-300 text-sm" />
          )
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Sorting and Info */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-gray-700">
            <span className="font-bold text-gray-900 text-lg">Products Found: {filteredProducts.length}</span>
            <p className="text-gray-600 text-sm mt-1">Page {currentPage} of {totalPages}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select
              value={filterState.sortBy}
              onChange={handleSortChange}
              className="border-2 border-red-200 bg-white rounded-xl px-4 py-2 focus:outline-none focus:border-red-400 text-gray-700"
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
      {currentProducts.length === 0 ? (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-2xl shadow-lg p-12 text-center">
          <div className="text-red-300 text-8xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
          <p className="text-gray-600 mb-6">Try changing your filters or search query</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentProducts.map((product) => {
              const inWishlist = isInWishlist(product.id);
              const inCart = isInCart(product.id);

              return (
                <div key={product.id} className="bg-gradient-to-b from-white to-red-50 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-red-100 hover:border-red-200">
                  {/* Product Image - УВЕЛИЧЕНА */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${product.label === 'NEW' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' :
                          product.label === 'HOT' ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' :
                            product.label === 'TOP' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white' :
                              product.label === 'BEST' ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white' :
                                'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                        }`}>
                        {product.label}
                      </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={() => handleToggleWishlist(product)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all ${inWishlist
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700'
                            : 'bg-white text-gray-700 hover:bg-red-50'
                          }`}
                        title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <FaHeart className={`text-md ${inWishlist ? "fill-current" : ""}`} />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all ${inCart
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                            : 'bg-white text-gray-700 hover:bg-red-50'
                          }`}
                        title={inCart ? "Already in cart" : "Add to cart"}
                      >
                        <FaShoppingCart className="text-md" />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-700 shadow-lg hover:shadow-xl hover:bg-red-50 transition-all"
                        title="Quick View"
                      >
                        <Link to={`/product/${product.id}`}>
                          <FaEye className="text-md" />
                        </Link>
                      </button>
                    </div>
                  </div>

                  {/* Product Info - УПРОЩЕННЫЙ ДИЗАЙН */}
                  <div className="p-5">
                    {/* Brand and Price - В ОДНОЙ СТРОКЕ */}
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                          ${product.price}
                        </div>
                        <div className="text-xs text-gray-400 line-through">
                          ${Math.floor(product.price * 1.2)}
                        </div>
                      </div>
                    </div>

                    {/* Product Name - УМЕНЬШЕН */}
                    <h3 className="font-semibold text-lg mb-3 line-clamp-2 hover:text-red-600 cursor-pointer transition-colors leading-tight">
                      {product.name}
                    </h3>

                    {/* Rating - КОМПАКТНЕЕ */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          star <= 4 ? (
                            <FaStar key={star} className="text-yellow-400 text-xs" />
                          ) : (
                            <FaRegStar key={star} className="text-gray-300 text-xs" />
                          )
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">4.5</span>
                      <span className="text-xs text-gray-400 mx-1">•</span>
                      <span className="text-xs text-gray-500">{Math.floor(Math.random() * 500) + 50} reviews</span>
                    </div>

                    {/* Categories - КОМПАКТНЕЕ */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 rounded-lg text-xs font-medium border border-red-100">
                        {product.category}
                      </span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 rounded-lg text-xs font-medium border border-pink-100">
                        {product.functionality}
                      </span>
                    </div>

                    {/* Status Indicators - КОМПАКТНЕЕ */}
                    <div className="flex items-center flex-wrap gap-2 mb-4">
                      {inWishlist && (
                        <span className="flex items-center gap-1.5 text-red-600 text-xs font-medium bg-red-50 px-2.5 py-1.5 rounded-lg">
                          <FaHeart className="fill-current text-xs" />
                          <span>Wishlist</span>
                        </span>
                      )}
                      {inCart && (
                        <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium bg-green-50 px-2.5 py-1.5 rounded-lg">
                          <FaShoppingCart className="text-xs" />
                          <span>In Cart</span>
                        </span>
                      )}
                      <span className="text-xs text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                        Free Shipping
                      </span>
                    </div>

                    {/* Action Buttons - УЛУЧШЕННЫЙ ДИЗАЙН */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${inCart
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200 hover:from-green-200 hover:to-emerald-200'
                            : 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 hover:-translate-y-0.5'
                          }`}
                      >
                        <FaShoppingCart className="text-base" />
                        <span>{inCart ? 'In Cart' : 'Add to Cart'}</span>
                      </button>
                      <button
                        onClick={() => handleToggleWishlist(product)}
                        className={`px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg ${inWishlist
                            ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-600 border border-red-200 hover:from-red-100 hover:to-pink-100'
                            : 'border border-red-200 text-gray-700 hover:bg-red-50 hover:border-red-300'
                          }`}
                        title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <FaHeart className={`text-base ${inWishlist ? "fill-current" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Пагинация с красной темой */}
          {filteredProducts.length > itemsPerPage && (
            <div className="flex justify-center mt-14">
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl shadow-lg p-3 border border-red-100">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-6 py-3 rounded-xl transition-all ${currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-red-600 hover:bg-white shadow-md hover:shadow-lg'
                    }`}
                >
                  <span className="font-medium">← Previous</span>
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
                        className={`px-5 py-3 rounded-xl transition-all font-medium ${currentPage === page
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg'
                            : 'text-gray-700 hover:text-red-600 hover:bg-white shadow-md hover:shadow-lg'
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
                  className={`px-6 py-3 rounded-xl transition-all ${currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-red-600 hover:bg-white shadow-md hover:shadow-lg'
                    }`}
                >
                  <span className="font-medium">Next →</span>
                </button>
              </div>
            </div>
          )}

          {/* Ссылки на другие страницы с красной темой */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/Wishlist"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 rounded-xl hover:from-red-100 hover:to-pink-100 hover:border-red-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`p-3 rounded-lg ${wishlistItems.length > 0 ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' : 'bg-red-100 text-red-600'}`}>
                <FaHeart className="text-xl" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">My Wishlist</div>
                <div className="text-sm text-gray-600">{wishlistItems.length} saved items</div>
              </div>
            </Link>

            <Link
              to="/Cart"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-3 rounded-lg bg-white/20">
                <FaShoppingCart className="text-xl" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">My Cart</div>
                <div className="text-sm text-white/80">{cartItems.length} items • ${cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2)}</div>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;