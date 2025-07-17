import React from 'react';
import { DollarOutlined, PlusOutlined } from '@ant-design/icons';
import FundingModal from '../../components/Modal/FundingModal';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const Funding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    data: fundingDetails,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['funding-details', page],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/funding-details?page=${page}&limit=${limit}`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Funding Management
          </h1>
          <p className="text-gray-600">
            View and manage all donations to our organization
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-sec-500 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center mt-4 md:mt-0"
        >
          <PlusOutlined className="mr-2" />
          Give Fund
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Funds</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            $ {fundingDetails?.totalAmount}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Donations</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {fundingDetails?.result.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            Average Donation
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            $
            {fundingDetails && fundingDetails.result?.length > 0
              ? (
                  fundingDetails.totalAmount / fundingDetails.result.length
                ).toFixed(2)
              : '0.00'}
          </p>
        </div>
      </div>

      {/* Funding Table with Fixed Pagination */}
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col"
        style={{ minHeight: '500px' }}
      >
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Profile
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Donor Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fundingDetails?.result?.map(fund => (
                <tr key={fund.id}>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={fund?.profile}
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {fund?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="flex items-center">
                      <DollarOutlined className="mr-1" />{' '}
                      {fund.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(fund.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {fund.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - Fixed at the bottom */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              {page}
            </button>
            <button
              onClick={() =>
                setPage(prev =>
                  fundingDetails && page * limit < fundingDetails.total
                    ? prev + 1
                    : prev
                )
              }
              disabled={fundingDetails && page * limit >= fundingDetails.total}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      <FundingModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        refetch={refetch}
      ></FundingModal>
    </div>
  );
};

export default Funding;
