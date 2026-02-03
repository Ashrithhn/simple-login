/**
 * App route definitions.
 */

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import CityList from "../pages/CityList";
import CityDetail from "../pages/CityDetail";
import CityExplorer from "../pages/CityExplorer";
import TrafficOverview from "../pages/TrafficOverview";
import CityGallery from "../pages/CityGallery";
import Info from "../pages/Info";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import BlogList from "../pages/BlogList";
import BlogDetail from "../pages/BlogDetail";
import BlogNew from "../pages/BlogNew";
import Layout from "../components/Layout";
import { ProtectedRoute, PublicOnlyRoute } from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "forgot-password",
        element: (
          <PublicOnlyRoute>
            <ForgotPassword />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "info",
        element: (
          <ProtectedRoute>
            <Info />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "cities",
        element: (
          <ProtectedRoute>
            <CityList />
          </ProtectedRoute>
        ),
      },
      {
        path: "cities/explorer",
        element: (
          <ProtectedRoute>
            <CityExplorer />
          </ProtectedRoute>
        ),
      },
      {
        path: "cities/traffic",
        element: (
          <ProtectedRoute>
            <TrafficOverview />
          </ProtectedRoute>
        ),
      },
      {
        path: "cities/gallery",
        element: (
          <ProtectedRoute>
            <CityGallery />
          </ProtectedRoute>
        ),
      },
      {
        path: "cities/:id",
        element: (
          <ProtectedRoute>
            <CityDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "blog",
        element: (
          <ProtectedRoute>
            <BlogList />
          </ProtectedRoute>
        ),
      },
      {
        path: "blog/new",
        element: (
          <ProtectedRoute adminOnly>
            <BlogNew />
          </ProtectedRoute>
        ),
      },
      {
        path: "blog/:id",
        element: (
          <ProtectedRoute>
            <BlogDetail />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
