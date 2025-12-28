import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaTrashAlt, FaPlus, FaMinus, FaArrowLeft, FaTag, FaHeart } from 'react-icons/fa';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { addToWishlist } from '../store/wishlistSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.total);

  const shipping = cartTotal > 1000 ? 0 : 50;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shipping + tax;

  const handleIncreaseQuantity = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleSaveForLater = (item) => {
    dispatch(removeFromCart(item.id));
    dispatch(addToWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      label: "SAVED"
    }));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleApplyPromo = () => {
    const promoInput = document.querySelector('input[placeholder="Enter code"]');
    if (promoInput.value === 'SHOP10') {
      alert('Promo code applied! 10% discount!');
    } else if (promoInput.value) {
      alert('Invalid promo code');
    }
    promoInput.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 md:py-6 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-4">
              <Link 
                to="/Shop" 
                className="flex items-center gap-1 md:gap-2 hover:opacity-80 text-sm md:text-base"
              >
                <FaArrowLeft />
                <span>Back to Shop</span>
              </Link>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Shopping Cart</h1>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 md:px-4 md:py-2">
              <FaShoppingBag className="text-sm md:text-base" />
              <span className="text-sm md:text-base">{cartItems.length} items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-4 md:py-6 lg:py-8">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-6 md:p-8 lg:p-12 text-center">
            <div className="text-gray-400 text-5xl md:text-6xl mb-3 md:mb-4">
              <FaShoppingBag />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Your cart is empty</h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link 
              to="/Shop"
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg md:rounded-xl hover:from-blue-700 hover:to-purple-700 text-sm md:text-base"
            >
              <FaArrowLeft />
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-4 md:p-6">
                {/* Cart Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6 pb-3 md:pb-4 border-b">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900">
                    Cart Items ({cartItems.length})
                  </h2>
                  <button 
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 md:gap-2 text-sm md:text-base"
                  >
                    <FaTrashAlt className="text-sm md:text-base" />
                    <span>Clear All</span>
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="space-y-3 md:space-y-4">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 p-3 md:p-4 border rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full sm:w-20 md:w-24 h-40 sm:h-20 md:h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-base md:text-lg">{item.name}</h3>
                            <p className="text-xs md:text-sm text-gray-600 mt-1">{item.category}</p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                  className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                  <FaMinus className="text-gray-600 text-xs md:text-sm" />
                                </button>
                                <span className="w-7 md:w-8 text-center font-medium text-sm md:text-base">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                                  className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                  <FaPlus className="text-gray-600 text-xs md:text-sm" />
                                </button>
                              </div>
                              <div className="flex gap-3 md:gap-2">
                                <button 
                                  onClick={() => handleSaveForLater(item)}
                                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-xs md:text-sm"
                                >
                                  <FaHeart className="text-xs md:text-sm" />
                                  <span>Save</span>
                                </button>
                                <button 
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs md:text-sm"
                                >
                                  <FaTrashAlt className="text-xs md:text-sm" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="text-right sm:text-left">
                            <div className="text-lg md:text-xl font-bold text-gray-900">${item.price}</div>
                            <div className="text-base md:text-lg font-bold text-gray-900 mt-1 md:mt-2">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t">
                  <Link 
                    to="/Shop" 
                    className="inline-flex items-center gap-1 md:gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
                  >
                    <FaArrowLeft />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-4 md:p-6 sticky top-4 md:top-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Order Summary</h2>
                
                {/* Summary Details */}
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm md:text-base">Subtotal</span>
                    <span className="font-medium text-sm md:text-base">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm md:text-base">Shipping</span>
                    <span className="font-medium text-sm md:text-base">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm md:text-base">Tax (10%)</span>
                    <span className="font-medium text-sm md:text-base">${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-4 md:mb-6 py-3 md:py-4 border-t border-b border-gray-200">
                  <span className="text-base md:text-lg font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <div className="text-xl md:text-2xl font-bold text-gray-900">${total.toFixed(2)}</div>
                    <div className="text-xs md:text-sm text-gray-500">Including VAT</div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <FaTag className="text-gray-400 text-sm md:text-base" />
                    <span className="text-gray-600 text-sm md:text-base">Have a promo code?</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border border-gray-300 rounded-lg px-3 md:px-4 py-2 text-sm md:text-base focus:outline-none focus:border-blue-500"
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="px-3 md:px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm md:text-base"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 md:mt-2">
                    Try code: SHOP10 for 10% discount
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 md:space-y-3">
                  <button 
                    onClick={() => alert(`Proceeding to checkout. Total: $${total.toFixed(2)}`)}
                    className="w-full py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-sm md:text-base"
                  >
                    Proceed to Checkout
                  </button>
                  <Link 
                    to="/Wishlist"
                    className="w-full py-2 md:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base"
                  >
                    <FaHeart className="text-pink-500 text-sm md:text-base" />
                    <span>View Wishlist</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;