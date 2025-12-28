import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Пока проверяется авторизация - показываем загрузку
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Если не авторизован - перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/Log_in" replace />;
  }

  // Если авторизован - показываем защищенный контент
  return children;
};

export default ProtectedRoute;