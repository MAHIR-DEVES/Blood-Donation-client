import React from 'react';
import { FiPlus, FiUpload, FiSearch } from 'react-icons/fi';
import ManageContentDataRow from '../../../components/Dashboard/TableRows/ManageContentRow';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useNavigate } from 'react-router';

const ManageContent = () => {
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const {
    data: contents,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['manage-contents'],
    queryFn: async () => {
      const { data } = await axiosSecure('/contents');
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-red-700">
          Manage Content
        </h1>
        <p className="text-gray-600 mt-2">
          Create, edit, and organize your website content
        </p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-300"
            placeholder="Search content..."
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate('/dashboard/add-blog')}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus /> Add New
          </button>
          <button className="flex items-center gap-2 bg-white border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
            <FiUpload /> Import
          </button>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-200 text-black">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Thumbnail
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Title
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium t uppercase tracking-wider"
                >
                  Last Updated
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  Update Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium  uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contents.map(item => (
                <ManageContentDataRow
                  key={item?._id}
                  item={item}
                  refetch={refetch}
                ></ManageContentDataRow>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">5</span> of{' '}
                <span className="font-medium">12</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  &larr;
                </button>
                <button
                  aria-current="page"
                  className="z-10 bg-red-50 border-red-500 text-red-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  &rarr;
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Total Content Items
          </h3>
          <p className="text-3xl font-bold text-red-600">24</p>
          <p className="text-sm text-gray-500 mt-1">5 published this week</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Most Viewed
          </h3>
          <p className="text-xl font-bold text-red-600">Care Guide</p>
          <p className="text-sm text-gray-500 mt-1">1,245 views this month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Needs Update
          </h3>
          <p className="text-3xl font-bold text-red-600">3</p>
          <p className="text-sm text-gray-500 mt-1">
            Last updated over 6 months ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageContent;
