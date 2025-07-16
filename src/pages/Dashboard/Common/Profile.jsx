import useAuth from '../../../hooks/useAuth';
import coverImg from '../../../assets/images/cover.jpg';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaEdit,
  FaKey,
} from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`
      );
      return data;
    },
  });

  const {
    name,
    email,
    imageUrl,
    bloodGroup,
    district,
    upazila,
    role: userRole,
    status,
  } = userData || {};

  if (isRoleLoading || isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-48 bg-gradient-to-r from-red-600 to-red-800">
          <img
            alt="cover photo"
            src={coverImg}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">My Donor Profile</h1>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-4">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center -mt-20">
            <div className="relative">
              <img
                alt="profile"
                src={imageUrl || 'https://via.placeholder.com/150'}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <span
                  className={`px-4 py-1 rounded-full text-xs font-semibold ${
                    role === 'donor'
                      ? 'bg-red-100 text-red-800'
                      : role === 'admin'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {role}
                </span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {name || user.displayName}
              </h2>
              <p className="text-gray-600">{email || user.email}</p>
              <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
                  <FaEdit className="mr-2" /> Update Profile
                </button>
                <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition">
                  <FaKey className="mr-2" /> Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaUser className="mr-2 text-red-600" /> Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{name || user.displayName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{email || user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-medium">{user.uid}</p>
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaTint className="mr-2 text-red-600" /> Donor Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="font-medium">
                    {bloodGroup ? (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        {bloodGroup}
                      </span>
                    ) : (
                      'Not specified'
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-red-600" />
                    {district && upazila
                      ? `${upazila}, ${district}`
                      : 'Location not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="font-medium flex items-center">
                    <FaShieldAlt className="mr-1 text-green-600" />
                    {status || 'Active'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Stats (optional) */}
          <div className="mt-6 bg-red-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Donation History
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-red-600">5</p>
                <p className="text-sm text-gray-600">Total Donations</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-red-600">3</p>
                <p className="text-sm text-gray-600">Last 6 Months</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-red-600">2023-07-15</p>
                <p className="text-sm text-gray-600">Last Donation</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-red-600">2023-09-09</p>
                <p className="text-sm text-gray-600">Eligible Next</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
