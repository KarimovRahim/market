import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    joinDate: '',
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Проверка авторизации и загрузка данных
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Log_in');
    } else {
      loadUserData();
    }
  }, [isAuthenticated, navigate, user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Данные из Redux store (из auth slice)
      if (user) {
        setUserData({
          name: user.name || user.login || 'User',
          email: user.email || 'No email provided',
          phone: user.phoneNumber || user.phone || 'No phone provided',
          joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently',
        });
      } else {
        // Пытаемся получить из localStorage как fallback
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUserData({
            name: parsedUser.name || 'User',
            email: parsedUser.email || 'No email provided',
            phone: parsedUser.phone || 'No phone provided',
            joinDate: 'Recently',
          });
        }
      }

      // Загрузка заказов пользователя (пример API вызова)
      // try {
      //   const response = await axiosRequest.get('/User/orders');
      //   setOrders(response.data);
      // } catch (error) {
      //   console.error('Failed to load orders:', error);
      //   // Моковые данные для демонстрации
      //   setOrders([
      //     { id: 1, date: '2024-01-15', total: '$149.99', status: 'Delivered' },
      //     { id: 2, date: '2024-01-10', total: '$89.99', status: 'Processing' },
      //   ]);
      // }

      // Моковые данные для демонстрации
      setOrders([
        { id: 1, date: '2024-01-15', total: '$149.99', status: 'Delivered' },
        { id: 2, date: '2024-01-10', total: '$89.99', status: 'Processing' },
        { id: 3, date: '2023-12-28', total: '$199.99', status: 'Delivered' },
      ]);

    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/Log_in');
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-4 py-8 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="w-full max-w-6xl mt-4 md:mt-8">
        <label className="font-medium text-sm md:text-base text-gray-600">
          <Link to="/Home" className="hover:text-red-600 transition-colors">Home / </Link>
          <span className="text-gray-800">Profile</span>
        </label>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 md:gap-8 mt-6 md:mt-10">
        {/* Left Sidebar - User Info */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-3xl md:text-4xl font-bold">
                  {userData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="font-bold text-2xl md:text-3xl text-gray-900">{userData.name}</h2>
              <p className="text-gray-600 mt-1">Premium Member</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">📱</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">✉️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">📅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{userData.joinDate}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-8 h-12 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg transition-all hover:from-red-600 hover:to-pink-600 flex items-center justify-center gap-2"
            >
              <span>Log Out</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-2/3">
          {/* Orders Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl md:text-2xl text-gray-900">Recent Orders</h3>
              <Link to="/orders" className="text-red-600 hover:text-red-700 font-medium">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="mb-3 md:mb-0">
                    <p className="font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="mb-3 md:mb-0">
                    <p className="font-bold text-lg">{order.total}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-lg p-6 md:p-8 text-white">
              <h4 className="font-bold text-xl mb-4">Total Orders</h4>
              <p className="text-3xl md:text-4xl font-bold mb-2">{orders.length}</p>
              <p className="opacity-90">Completed purchases</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h4 className="font-bold text-xl text-gray-900 mb-4">Loyalty Points</h4>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">1,250</p>
              <p className="text-gray-600">Available for rewards</p>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-6 md:mt-8">
            <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-6">Account Settings</h3>
            <div className="space-y-4">
              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Change Password</p>
                  <p className="text-sm text-gray-500">Update your account password</p>
                </div>
                <span className="text-red-600">→</span>
              </button>

              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Payment Methods</p>
                  <p className="text-sm text-gray-500">Manage your payment options</p>
                </div>
                <span className="text-red-600">→</span>
              </button>

              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Notification Settings</p>
                  <p className="text-sm text-gray-500">Control email and SMS notifications</p>
                </div>
                <span className="text-red-600">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;