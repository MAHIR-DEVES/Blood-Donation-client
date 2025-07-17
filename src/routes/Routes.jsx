import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';
import Profile from '../pages/Dashboard/Common/Profile';
import Statistics from '../pages/Dashboard/Common/Statistics';
import MainLayout from '../layouts/MainLayout';

import Blog from '../pages/Blog/Blog';
import SearchBlood from '../pages/SearchBlood/SearchBlood';
import BloodRequest from '../pages/BloodRequest/BloodRequest';
import DonorsCardDetails from '../components/Dashboard/Donors/DonorsCardDetails';
import CreateRequest from '../pages/Dashboard/Donor/CreateRequest';
import MyRequest from '../pages/Dashboard/Donor/MyRequest';
import BloodRequestDetails from '../components/BloodRequest/BloodRequestDetails';
import ManageContent from '../pages/Dashboard/Admin/ManageContent';
import Dashboard from '../pages/Dashboard/Volunteer/Dashboard';
import ManageRequest from '../pages/Dashboard/Volunteer/ManageRequest';
import AddBlog from '../pages/Dashboard/Volunteer/AddBlog';
import ManageBlog from '../pages/Dashboard/Volunteer/ManageBlog';
import BlogDetails from '../components/Blog/BlogDetails';
import Funding from '../pages/Funding/Funding';

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
        path: '/blog',
        Component: Blog,
      },
      {
        path: '/blog-details/:id',
        element: (
          <PrivateRoute>
            <BlogDetails></BlogDetails>
          </PrivateRoute>
        ),
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
        path: '/funding',
        element: (
          <PrivateRoute>
            <Funding></Funding>
          </PrivateRoute>
        ),
      },
      {
        path: 'donor-card-details/:id',
        element: (
          <PrivateRoute>
            <DonorsCardDetails></DonorsCardDetails>
          </PrivateRoute>
        ),
      },
      {
        path: '/bloodRequest',
        Component: BloodRequest,
      },
      {
        path: '/blood-request-details/:id',
        element: (
          <PrivateRoute>
            <BloodRequestDetails></BloodRequestDetails>
          </PrivateRoute>
        ),
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
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: 'add-blog',
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-blog',
        element: (
          <PrivateRoute>
            <ManageBlog></ManageBlog>
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
        path: 'content-manage',
        element: (
          <PrivateRoute>
            <ManageContent />
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
        path: 'donation-requests',
        element: (
          <PrivateRoute>
            <MyRequest></MyRequest>
          </PrivateRoute>
        ),
      },
      {
        path: 'create-request',
        element: (
          <PrivateRoute>
            <CreateRequest></CreateRequest>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-request',
        element: <ManageRequest></ManageRequest>,
      },
    ],
  },
]);
