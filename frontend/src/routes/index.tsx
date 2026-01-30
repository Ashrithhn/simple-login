/**
 * App route definitions.
 */

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import CityList from '../pages/CityList';
import CityDetail from '../pages/CityDetail';
import Info from '../pages/Info';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import BlogList from '../pages/BlogList';
import BlogDetail from '../pages/BlogDetail';
import BlogNew from '../pages/BlogNew';
import Layout from '../components/Layout';
import { ProtectedRoute, PublicOnlyRoute } from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'forgot-password', element: <PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute> },
      { path: 'dashboard', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'info', element: <ProtectedRoute><Info /></ProtectedRoute> },
      { path: 'login', element: <PublicOnlyRoute><Login /></PublicOnlyRoute> },
      { path: 'register', element: <PublicOnlyRoute><Register /></PublicOnlyRoute> },
      { path: 'cities', element: <ProtectedRoute><CityList /></ProtectedRoute> },
      { path: 'cities/:id', element: <ProtectedRoute><CityDetail /></ProtectedRoute> },
      { path: 'blog', element: <ProtectedRoute><BlogList /></ProtectedRoute> },
      { path: 'blog/new', element: <ProtectedRoute adminOnly><BlogNew /></ProtectedRoute> },
      { path: 'blog/:id', element: <ProtectedRoute><BlogDetail /></ProtectedRoute> },
      { path: '*', element: <ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
