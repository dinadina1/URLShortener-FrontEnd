// import required packages
import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import HomeNav from './Wrappers/HomeNav';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import DashboardNav from './Wrappers/DashboardNav';
import Dashboard from './Components/Dashboard';
import { loader as useLoader } from './Wrappers/DashboardNav';
import Shortener from './Components/Shortener';
import History from './Components/History';


function App() {

  // create Browser Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeNav />,
      children: [
        {
          path: "/",
          element: <Home />
        }
      ]
    },
    {
      path: "signup",
      element: <Signup />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "reset-password",
      element: <ResetPassword />
    },
    {
      path: "dashboard",
      element: <DashboardNav />,
      loader: useLoader,
      children: [
        {
          path: "",
          index: true,
          element: <Dashboard />
        },
        {
          path: "shortener",
          element: <Shortener />
        },
        {
          path: "analytics",
          element: <History />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
