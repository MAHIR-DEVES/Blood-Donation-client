import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import AddPlant from '../pages/Dashboard/Seller/AddPlant';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';
import Profile from '../pages/Dashboard/Common/Profile';
import Statistics from '../pages/Dashboard/Common/Statistics';
import MainLayout from '../layouts/MainLayout';
import MyInventory from '../pages/Dashboard/Seller/MyInventory';
import ManageOrders from '../pages/Dashboard/Seller/ManageOrders';
import MyOrders from '../pages/Dashboard/Customer/MyOrders';
import DonorDetails from '../pages/DonorDetails/DonorDetails';
import Blog from '../pages/Blog/Blog';
import SearchBlood from '../pages/SearchBlood/SearchBlood';
import BloodRequest from '../pages/BloodRequest/BloodRequest';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/plant/:id',
        element: <DonorDetails />,
      },
      {
        path: '/blog',
        Component: Blog,
      },
      {
        path: '/search',
        element: (
          <PrivateRoute>
            <SearchBlood></SearchBlood>
          </PrivateRoute>
        ),
      },
      {
        path: '/bloodRequest',
        Component: BloodRequest,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-plant',
        element: (
          <PrivateRoute>
            <AddPlant />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'donationRequests',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
    ],
  },
]);
