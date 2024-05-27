// import required packages
import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import DashboardNav from './Wrappers/DashboardNav';
import Dashboard from './Components/Dashboard';
import Shortener from './Components/Shortener';
import History from './Components/History';


function App() {

  // create Browser Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardNav />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/shortener",
          element: <Shortener />
        },
        {
          path: "/analytics",
          element: <History />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "reset-password",
      element: <ResetPassword />
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
