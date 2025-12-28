import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/authSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Если уже авторизован - перенаправляем
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/Home');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) dispatch(clearError());
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return false;
    }
    
    if (!formData.phone.trim()) {
      alert('Please enter your phone number');
      return false;
    }
    
    if (!formData.password) {
      alert('Please enter password');
      return false;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const result = await dispatch(registerUser({
        phone: formData.phone,
        password: formData.password,
        name: formData.name,
      })).unwrap();
      
      console.log('Registration successful:', result);
      navigate('/Home');
    } catch (error) {
      console.error('Registration failed:', error);
      // Error already shown by Redux
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join our community today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-red-600 rounded"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg transition-all hover:from-red-600 hover:to-pink-600 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2">Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/Log_in"
              className="font-medium text-red-600 hover:text-red-700"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;