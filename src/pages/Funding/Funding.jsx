import React from 'react';
import { DollarOutlined, PlusOutlined } from '@ant-design/icons';
import FundingModal from '../../components/Modal/FundingModal';
import { useState } from 'react';

const Funding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  // Static data for demonstration
  const fundingData = [
    {
      id: 1,
      userName: 'John Doe',
      amount: 100.5,
      date: '2023-07-15',
      transactionId: 'txn_123456789',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      amount: 250.0,
      date: '2023-07-14',
      transactionId: 'txn_987654321',
    },
    {
      id: 3,
      userName: 'Robert Johnson',
      amount: 75.25,
      date: '2023-07-13',
      transactionId: 'txn_456789123',
    },
    {
      id: 4,
      userName: 'Emily Davis',
      amount: 500.0,
      date: '2023-07-12',
      transactionId: 'txn_321654987',
    },
    {
      id: 5,
      userName: 'Michael Wilson',
      amount: 150.75,
      date: '2023-07-11',
      transactionId: 'txn_789123456',
    },
  ];

  const totalFunds = fundingData.reduce((sum, item) => sum + item.amount, 0);

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
            ${totalFunds.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Donations</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {fundingData.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            Average Donation
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ${(totalFunds / fundingData.length).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Funding Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
              {fundingData.map(fund => (
                <tr key={fund.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {fund.userName}
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">5</span> of{' '}
            <span className="font-medium">5</span> donations
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Donation Modal (Visual Only) */}
      <FundingModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      ></FundingModal>
    </div>
  );
};

export default Funding;
