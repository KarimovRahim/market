import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar, FaArrowLeft, FaTrashAlt, FaRegStar } from 'react-icons/fa';
import { removeFromWishlist, clearWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { allProducts } from '../components/ProductsData';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
    alert(`${product.name} moved to cart!`);
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => {
      dispatch(addToCart(item));
    });
    dispatch(clearWishlist());
    alert('All items moved to cart!');
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      dispatch(clearWishlist());
    }
  };

  const recommendations = allProducts
    .filter(product => !wishlistItems.some(item => item.id === product.id))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 md:py-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-4">
              <Link 
                to="/Shop" 
                className="flex items-center gap-1 md:gap-2 hover:opacity-80 text-sm md:text-base"
              >
                <FaArrowLeft />
                <span>Back to Shop</span>
              </Link>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">My Wishlist</h1>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 md:px-4 md:py-2">
              <FaHeart className="text-sm md:text-base" />
              <span className="text-sm md:text-base">{wishlistItems.length} items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-4 md:py-6 lg:py-8">
        {/* Actions Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Saved Items</h2>
            <p className="text-gray-600 text-sm md:text-base">Items you've added to your wishlist</p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {wishlistItems.length > 0 && (
              <>
                <button 
                  onClick={handleAddAllToCart}
                  className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg md:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base"
                >
                  <FaShoppingCart />
                  <span>Add All to Cart</span>
                </button>
                <button 
                  onClick={handleClearWishlist}
                  className="px-4 py-2 md:px-6 md:py-3 border border-red-200 text-red-600 font-medium rounded-lg md:rounded-xl hover:bg-red-50 transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base"
                >
                  <FaTrashAlt />
                  <span>Clear All</span>
                </button>
              </>
            )}
            <Link 
              to="/Shop"
              className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base"
            >
              <FaArrowLeft />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-6 md:p-8 lg:p-12 text-center">
            <div className="text-gray-400 text-5xl md:text-6xl mb-3 md:mb-4">
              <FaHeart />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Save your favorite items here for later!</p>
            <Link 
              to="/Shop"
              className="inline-flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg md:rounded-xl hover:from-pink-600 hover:to-rose-600 text-sm md:text-base"
            >
              <FaArrowLeft />
              <span>Browse Products</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {wishlistItems.map((product) => (
                <div key={product.id} className="bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-lg overflow-hidden group hover:shadow-md md:hover:shadow-xl transition-all duration-300">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-40 md:h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Badge */}
                    <div className="absolute top-2 md:top-4 left-2 md:left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        product.label === 'NEW' ? 'bg-green-500 text-white' :
                        product.label === 'HOT' ? 'bg-red-500 text-white' :
                        product.label === 'TOP' ? 'bg-yellow-500 text-white' :
                        product.label === 'SAVED' ? 'bg-blue-500 text-white' :
                        'bg-pink-500 text-white'
                      }`}>
                        {product.label || 'WISHLIST'}
                      </span>
                    </div>
                    {/* Remove from Wishlist */}
                    <button 
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="absolute top-2 md:top-4 right-2 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 text-red-500"
                    >
                      <FaHeart className="text-red-500 text-sm md:text-base" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 md:p-4 lg:p-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2 md:mb-3">
                      <div className="flex-1">
                        <span className="text-xs md:text-sm text-gray-500">{product.brand || 'Brand'}</span>
                        <h3 className="font-bold text-base md:text-lg mt-1 line-clamp-2">{product.name}</h3>
                      </div>
                      <div className="text-right sm:text-left">
                        <div className="text-xl md:text-2xl font-bold text-gray-900">${product.price}</div>
                        <div className="text-xs md:text-sm text-gray-500 line-through">
                          ${Math.floor(product.price * 1.2)}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          star <= 4 ? (
                            <FaStar key={star} className="text-yellow-400 text-xs md:text-sm" />
                          ) : (
                            <FaRegStar key={star} className="text-gray-300 text-xs md:text-sm" />
                          )
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-gray-600">(4.5)</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleMoveToCart(product)}
                        className="flex-1 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg md:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base"
                      >
                        <FaShoppingCart className="text-sm md:text-base" />
                        <span>Add to Cart</span>
                      </button>
                      <button 
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="px-3 md:px-4 py-2 md:py-3 border border-red-200 text-red-600 font-medium rounded-lg md:rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center"
                      >
                        <FaTrashAlt className="text-sm md:text-base" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-8 md:mt-12">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">You might also like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {recommendations.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg md:rounded-xl shadow-sm p-3 md:p-4 hover:shadow-md transition-shadow">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-28 md:h-32 object-cover rounded-lg mb-2 md:mb-3"
                      />
                      <h4 className="font-medium text-gray-900 line-clamp-2 text-sm">{product.name}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-gray-900 text-base md:text-lg">${product.price}</span>
                        <button 
                          onClick={() => dispatch(addToCart(product))}
                          className="text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;