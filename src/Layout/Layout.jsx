import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHome, FiShoppingBag, FiInfo, FiMail, FiHeart } from 'react-icons/fi';

const Layout = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Хедер */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Логотип */}
            <Link to="/" className="text-2xl font-bold text-red-600">
              ShopNow
            </Link>

            {/* Навигация для десктопа */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/Home" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors">
                <FiHome />
                Home
              </Link>
              <Link to="/Shop" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors">
                <FiShoppingBag />
                Shop
              </Link>
              <Link to="/About" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors">
                <FiInfo />
                About
              </Link>
              <Link to="/Contact" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors">
                <FiMail />
                Contact
              </Link>
              {isAuthenticated && (
                <Link to="/Wishlist" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors">
                  <FiHeart />
                  Wishlist
                </Link>
              )}
            </nav>

            {/* Правая часть хедера */}
            <div className="flex items-center gap-4">
              {/* Поиск */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
                <FiSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none px-2 w-40"
                />
              </div>

              {/* Корзина */}
              {isAuthenticated && (
                <Link to="/Cart" className="relative">
                  <FiShoppingCart className="text-2xl text-gray-700 hover:text-red-600 transition-colors" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              )}

              {/* Авторизация */}
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="hidden md:inline text-sm text-gray-700">
                      Hi, {user?.name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex gap-2">
                  <Link
                    to="/Log_in"
                    className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    to="/Sign_up"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Кнопка меню для мобильных */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-2xl text-gray-700"
              >
                {isMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>

          {/* Мобильное меню */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <nav className="flex flex-col gap-4">
                <Link to="/Home" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors py-2">
                  <FiHome />
                  Home
                </Link>
                <Link to="/Shop" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors py-2">
                  <FiShoppingBag />
                  Shop
                </Link>
                <Link to="/About" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors py-2">
                  <FiInfo />
                  About
                </Link>
                <Link to="/Contact" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors py-2">
                  <FiMail />
                  Contact
                </Link>
                
                {isAuthenticated && (
                  <>
                    <Link to="/Wishlist" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors py-2">
                      <FiHeart />
                      Wishlist
                    </Link>
                    <Link to="/Cart" className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors py-2">
                      <FiShoppingCart />
                      Cart ({cartItems.length})
                    </Link>
                  </>
                )}

                {/* Поиск для мобильных */}
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 mt-2">
                  <FiSearch className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none px-2 flex-1"
                  />
                </div>

                {/* Авторизация для мобильных */}
                {!isAuthenticated && (
                  <div className="flex gap-2 mt-2">
                    <Link
                      to="/Log_in"
                      className="flex-1 text-center py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/Sign_up"
                      className="flex-1 text-center py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Основной контент */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">ShopNow</h3>
              <p className="text-gray-400">
                The best place to find amazing products at great prices.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/Home" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/Shop" className="hover:text-white transition-colors">Shop</Link></li>
                <li><Link to="/About" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/Contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">Email: info@shopnow.com</p>
              <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;