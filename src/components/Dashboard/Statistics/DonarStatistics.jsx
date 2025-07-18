import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DonorStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`
      );
      return data;
    },
  });

  const { data: requests, isLoading: userDataLoading } = useQuery({
    queryKey: ['my-request', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-request/${user?.email}`);
      return data;
    },
  });

  if (isLoading || userDataLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="w-full mx-auto">
        {/* Welcome Section */}
        <div className="bg-white  shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8 bg-gradient-to-r from-[#eb2c29] to-[#d12522]">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Welcome back, {user.displayName}!
            </h1>
            <p className="mt-2 text-white opacity-90">
              Thank you for saving lives. Here's your donor summary.
            </p>
          </div>
          {/* card */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Profile Section (unchanged) */}
              <div className="flex flex-col items-center md:items-start space-y-4 border-b md:border-b-0 pb-6 md:pb-0  bg-[#eb2c29]/5 p-5 border border-[#eb2c29]/10 rounded-lg">
                <div className="relative">
                  <img
                    src={data?.imageUrl || 'https://i.pravatar.cc/150?img=3'}
                    alt={data?.name || 'Donor'}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-[#eb2c29]/10"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = 'https://i.pravatar.cc/150?img=3';
                    }}
                  />
                  {data?.status === 'Available' && (
                    <div className="absolute bottom-0 right-0 bg-[#eb2c29] text-white text-xs font-bold px-2 py-1 rounded-full">
                      Active
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {data?.name || 'Anonymous Donor'}
                  </h3>
                  <p className="text-gray-600 mt-1 hidden lg:flex">
                    {data?.email || 'No email provided'}
                  </p>
                </div>
              </div>

              {/* Location Info - Redesigned Card */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="bg-[#eb2c29]/10 p-2 rounded-lg mr-4">
                      <svg
                        className="w-5 h-5 text-[#eb2c29]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Location
                      </h4>
                      <p className="text-lg font-semibold text-gray-800">
                        {data?.district || 'Not specified'}
                      </p>
                      <p className="text-gray-600">{data?.upazila || ''}</p>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200"></div>

                  <div className="flex items-start">
                    <div className="bg-[#eb2c29]/10 p-2 rounded-lg mr-4">
                      <svg
                        className="w-5 h-5 text-[#eb2c29]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Status
                      </h4>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          data?.status === 'Available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-green-300 text-gray-800'
                        }`}
                      >
                        {data?.status || 'No record'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blood Group - Redesigned Card */}
              <div className="bg-[#eb2c29]/5 rounded-lg p-5 border border-[#eb2c29]/10 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-[#eb2c29]/10 rounded-full flex items-center justify-center mb-3">
                    <svg
                      className="w-8 h-8 text-[#eb2c29]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Blood Type
                  </h4>
                  <p className="text-4xl font-bold text-[#eb2c29] mb-2">
                    {data?.bloodGroup || '--'}
                  </p>
                  {data?.bloodGroup && (
                    <p className="text-xs font-medium text-gray-500">
                      Universal{' '}
                      {data.bloodGroup.includes('+') ? 'recipient' : 'donor'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requests Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Recent Donations
            </h2>
            <p className="text-gray-600 mt-1">
              Last 3 blood donations you've made
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map(request => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={request?.profile}
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.requesterName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.donationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 rounded-full bg-[#fff0f0] text-[#eb2c29] font-medium">
                        {request.bloodGroup}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 text-center">
            <button className="text-[#eb2c29] hover:text-[#d12522] font-medium">
              View All Donations →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorStatistics;
