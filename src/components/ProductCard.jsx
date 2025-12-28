import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { ShoppingCart, Eye, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  const isInCart = cartItems.some(item => item.id === product.id);
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product.id));
    }
  };

  // Генерация случайного рейтинга от 3 до 5
  const rating = Math.floor(Math.random() * 3) + 3;
  const reviews = Math.floor(Math.random() * 100) + 1;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Бейдж и кнопки действий */}
      <div className="relative">
        {product.label && (
          <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold ${
            product.label === 'NEW' ? 'bg-green-500 text-white' :
            product.label === 'HOT' ? 'bg-red-500 text-white' :
            product.label === 'TOP' ? 'bg-yellow-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            {product.label}
          </div>
        )}
        
        {/* Кнопки быстрых действий */}
        <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50">
            <Heart size={18} />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50">
            <Eye size={18} />
          </button>
        </div>
        
        {/* Изображение */}
        <div className="h-56 overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      
      {/* Контент */}
      <div className="p-5">
        {/* Категория и бренд */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xs text-gray-500">{product.brand}</span>
        </div>
        
        {/* Название */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer h-14">
          {product.name}
        </h3>
        
        {/* Рейтинг */}
        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${
                i < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}>★</span>
            ))}
          </div>
          <span className="text-sm text-gray-600">({reviews})</span>
        </div>
        
        {/* Цена и кнопка */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">
              ${Math.floor(product.price * 1.2)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
              isInCart 
                ? 'bg-green-100 hover:bg-green-200 text-green-800' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <ShoppingCart size={18} />
            <span>{isInCart ? `(${quantity})` : 'Add'}</span>
          </button>
        </div>
        
        {/* Информация о доставке */}
        <div className="mt-3 pt-3 border-t border-dashed">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Free shipping
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;