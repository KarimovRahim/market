import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import Layout from './Layout/Layout.jsx';
import LogIn from './pages/logIn.jsx';
import SignUp from './pages/signUp.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Shop from './pages/shop.jsx';
import Cart from './pages/cart.jsx';
import Wishlist from './pages/wishlist.jsx';
import LastPage from './pages/lastPage.jsx';
import PhoneVerification from './pages/PhoneVerification.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

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
        },
        {
          path: "verify-phone",
          element: <PhoneVerification />,
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