import { FaUserAlt, FaDollarSign } from 'react-icons/fa';
import { FaRegChartBar } from 'react-icons/fa';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { FiTrendingUp, FiUsers } from 'react-icons/fi';
import { FaMicroblog } from 'react-icons/fa6';
import { BiSolidDonateBlood } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [statsData, setStatsData] = useState({
    revenue: 0,
    orders: 0,
    plants: 0,
    users: 0,
  });

  const [requests, setRequests] = useState();
  const [donors, setDonors] = useState([]);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    axiosSecure.get(`/admin-dashboard-stats`).then(res => {
      setStatsData(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure.get(`/all-request`).then(res => {
      setRequests(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure.get(`/all-donor`).then(res => {
      setDonors(res.data);
    });
  }, [axiosSecure]);

  // Sample data - replace with your actual data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$53,458',
      icon: <FaDollarSign className="w-5 h-5" />,
      change: '+12%',
      trend: 'up',
      color: 'bg-gradient-to-tr from-red-600 to-red-400',
    },
    {
      title: 'Total Blog',
      value: `$${statsData.totalBlog}`,

      icon: <FaMicroblog className="w-5 h-5" />,
      change: '+8%',
      trend: 'up',
      color: 'bg-gradient-to-tr from-red-500 to-red-300',
    },
    {
      title: 'Total Request',
      value: `$${statsData.totalRequests}`,
      icon: <BiSolidDonateBlood className="w-5 h-5" />,
      change: '+3.2%',
      trend: 'up',
      color: 'bg-gradient-to-tr from-red-700 to-red-500',
    },
    {
      title: 'Total Donors',
      value: `$${statsData.totalUser}`,
      icon: <FiUsers className="w-5 h-5" />,
      change: '+4.1%',
      trend: 'up',
      color: 'bg-gradient-to-tr from-red-800 to-red-600',
    },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-red-700">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div
                  className={`p-3 rounded-lg ${stat.color} shadow-md text-white`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.change} <FiTrendingUp className="inline ml-1" />
                </div>
              </div>
              <h3 className="mt-4 text-gray-500 text-sm font-medium">
                {stat.title}
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <div className="mt-4 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">Compared to last month</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent request */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2 overflow-x-scroll">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-red-700">
              Recent Request
            </h2>
            <select className="text-sm border border-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-300">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Group
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests?.map(request => (
                  <tr key={request}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="block relative">
                            <img
                              alt="profile"
                              src={request?.profile}
                              className="mx-auto object-cover rounded h-7 w-10 "
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request?.requesterName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {request?.district}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {request?.bloodGroup}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* all Blog*/}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-red-700 mb-4">
            Recent Blog
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(item => (
              <div
                key={item}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="p-2 bg-red-100 rounded-full mr-3">
                  <FaRegChartBar className="text-red-600 w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    New order received
                  </p>
                  <p className="text-xs text-gray-500">
                    Order #1234 from John Doe
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* All Donors */}
        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-scroll h-96">
          <h2 className="text-lg font-semibold text-red-700 mb-4">
            All Donors
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profile
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Groupe
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donors?.map((donor, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="block relative">
                            <img
                              alt="profile"
                              src={donor?.imageUrl}
                              className="mx-auto object-cover rounded h-7 w-10 "
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {donor?.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {donor?.bloodGroup}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {donor?.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-red-700 mb-4">Calendar</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
              <Calendar
                onChange={setValue}
                value={value}
                className="w-full"
                style={{ width: '1000px', height: '199px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
