import React from 'react';
import ReactDOM from 'react-dom/client';
import "98.css";
import "./index.css";
import Home from './pages/home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
