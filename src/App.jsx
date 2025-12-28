import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import Layout from './Layout/Layout.jsx';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import LastPage from './pages/LastPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <LogIn />,
        },
        {
          path: "Log_in",
          element: <LogIn />,
        },
        {
          path: "Sign_up",
          element: <SignUp />,
        },
        {
          path: "Home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "About",
          element: (
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "Contact",
          element: (
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          ),
        },
        {
          path: "Shop",
          element: (
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          ),
        },
        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "Wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "product/:id",
          element: (
            <ProtectedRoute>
              <LastPage />
            </ProtectedRoute>
          )
        }
      ]
    }
  ])
  
  return (
    <Provider store={store}>
      <div className="w-full m-auto flex flex-col">
        <RouterProvider router={router} />
      </div>
    </Provider>
  )
}

export default App