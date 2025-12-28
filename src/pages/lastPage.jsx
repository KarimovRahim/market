import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiStar,
  FiArrowLeft,
  FiChevronRight,
  FiMinus,
  FiPlus
} from 'react-icons/fi';
import { allProducts } from '../components/ProductsData';

const LastPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true
      });
    }
  }, []);

  // Используйте общий массив allProducts
  const product = allProducts.find(item => item.id === parseInt(id));

  // Если нужно добавить недостающие поля для отображения
  const getProductDetails = (product) => {
    if (!product) return null;
    
    // Базовые данные из allProducts
    const baseProduct = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      brand: product.brand,
      label: product.label,
      functionality: product.functionality
    };
    
    // Дополнительные поля для страницы продукта
    return {
      ...baseProduct,
      old_price: Math.round(product.price * 1.2), // Добавляем старую цену
      discount: `-${Math.floor(Math.random() * 20) + 20}%`, // Случайная скидка
      rating: 4 + Math.random() * 0.5, // Рейтинг от 4.0 до 4.5
      reviews: Math.floor(Math.random() * 300) + 50, // Отзывы
      description: `Высококачественный ${product.name}. ${product.brand} - гарантия качества. Идеально подходит для ${product.functionality}.`,
      features: [
        "Высокое качество",
        "Гарантия 1 год",
        "Бесплатная доставка",
        "Официальная гарантия",
        "Экологичные материалы"
      ],
      colors: ["#2d3436", "#636e72", "#74b9ff", "#dfe6e9"],
      colorNames: ["Черный", "Серый", "Синий", "Белый"],
      sizes: ["S", "M", "L", "XL"],
      images: [product.image, product.image, product.image, product.image] // Повторяем основное изображение
    };
  };

  const productDetails = getProductDetails(product);

  if (!product || !productDetails) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
        <div className="text-center p-6 md:p-8 max-w-md">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Товар не найден</h1>
          <p className="text-gray-600 mb-6">Товар с ID {id} не существует</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            <FiArrowLeft size={18} className="mr-2" />
            Вернуться в магазин
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log('Добавлено в корзину:', product, 'Количество:', quantity);
    // Здесь можно добавить логику Redux
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Переход к оформлению заказа
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-6 lg:py-8 px-3 sm:px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Хлебные крошки */}
        <nav className="mb-4 md:mb-6 lg:mb-8">
          <div className="flex items-center text-xs md:text-sm text-gray-600 flex-wrap">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Главная
            </Link>
            <FiChevronRight size={14} className="mx-1 md:mx-2" />
            <Link to="/shop" className="hover:text-blue-600 transition-colors">
              Магазин
            </Link>
            <FiChevronRight size={14} className="mx-1 md:mx-2" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-blue-600 transition-colors">
              {product.category}
            </Link>
            <FiChevronRight size={14} className="mx-1 md:mx-2" />
            <span className="text-gray-800 font-medium truncate max-w-[150px] md:max-w-xs">
              {product.name}
            </span>
          </div>
        </nav>

        {/* Основная секция продукта */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Левая колонка - Галерея */}
          <div className="space-y-3 md:space-y-4">
            {/* Главное изображение */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md md:shadow-lg">
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Бейдж скидки */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-red-600 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded-full text-xs md:text-sm shadow-md">
                  {productDetails.discount}
                </div>
                {/* Бейдж типа товара */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-blue-600 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded-full text-xs md:text-sm shadow-md">
                  {product.label}
                </div>
              </div>
            </div>

            {/* Миниатюры */}
            <div className="grid grid-cols-4 gap-2 md:gap-3">
              {productDetails.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg md:rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-blue-500 shadow-sm'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} вид ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Правая колонка - Информация о товаре */}
          <div className="space-y-4 md:space-y-6">
            {/* Заголовок и категория */}
            <div>
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-md md:rounded-lg mb-2 md:mb-3">
                {product.category}
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="inline-flex items-center bg-green-100 text-green-800 text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-md md:rounded-lg mb-2 md:mb-3">
                {product.brand}
              </div>
              
              {/* Рейтинг */}
              <div className="flex items-center mb-3 md:mb-4">
                <div className="flex mr-1 md:mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={16}
                      className={`${i < Math.floor(productDetails.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm md:text-base ml-1 md:ml-2">
                  {productDetails.rating.toFixed(1)} ({productDetails.reviews} отзывов)
                </span>
              </div>
            </div>

            {/* Цены */}
            <div className="space-y-1 md:space-y-2">
              <div className="flex items-center">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-base md:text-lg text-gray-500 line-through ml-2 md:ml-4">
                  ${productDetails.old_price}
                </span>
              </div>
              <div className="text-green-600 font-semibold text-sm md:text-base">
                Экономия ${(productDetails.old_price - product.price).toFixed(2)}
              </div>
            </div>

            {/* Описание */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Описание</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {productDetails.description}
              </p>
            </div>

            {/* Особенности */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Особенности</h3>
              <ul className="space-y-1">
                {productDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 text-sm md:text-base">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Функциональность */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Функциональность</h3>
              <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-1 md:py-2 rounded-lg">
                {product.functionality}
              </div>
            </div>

            {/* Количество и кнопки */}
            <div className="pt-3 md:pt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
                {/* Выбор количества */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 md:px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-3 md:px-4 py-2 border-x border-gray-300 min-w-[40px] md:min-w-[50px] text-center font-semibold text-sm md:text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 md:px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base"
                  >
                    <FiShoppingCart size={18} />
                    <span>В корзину</span>
                  </button>
                  
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base"
                  >
                    Купить сейчас
                  </button>
                  
                  <button className="p-2 md:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FiHeart size={18} className="text-gray-600" />
                  </button>
                  
                  <button className="p-2 md:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FiShare2 size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Гарантии */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-1 md:p-2 bg-blue-100 rounded-lg">
                  <FiTruck size={18} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">Бесплатная доставка</h4>
                  <p className="text-xs md:text-sm text-gray-600">От $50</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-1 md:p-2 bg-green-100 rounded-lg">
                  <FiRotateCcw size={18} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">Возврат 30 дней</h4>
                  <p className="text-xs md:text-sm text-gray-600">Легкий возврат</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-1 md:p-2 bg-purple-100 rounded-lg">
                  <FiShield size={18} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">Гарантия 1 год</h4>
                  <p className="text-xs md:text-sm text-gray-600">Официальная гарантия</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Похожие товары */}
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Похожие товары</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {allProducts
              .filter(item => item.id !== product.id && item.category === product.category)
              .slice(0, 4)
              .map(item => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="group bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded">
                      {item.label}
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base md:text-lg font-bold text-gray-900">
                          ${item.price}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiShoppingCart size={16} className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastPage;