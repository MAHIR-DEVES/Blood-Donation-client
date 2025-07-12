import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import { IoArrowBackSharp } from 'react-icons/io5';

const DonorsCardDetails = () => {
  const { id: donorId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['singleDonor', donorId],
    queryFn: async () => {
      const res = await axiosSecure(`/single-donor/${donorId}`);
      return res?.data;
    },
  });

  const {
    name,
    email,
    imageUrl = 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
    bloodGroup,
    district,
    upazila,
    status = 'Available',
    lastDonationDate,
    phoneNumber,
    address,
  } = data || {};

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Donor Profile
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for considering {name} as a potential blood donor
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Left Column - Image */}
            <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-6">
              <img
                src={imageUrl}
                alt={name}
                className="h-64 w-64 rounded-full object-cover border-4 border-[#eb2c29] shadow-md"
              />
            </div>

            {/* Right Column - Details */}
            <div className="md:w-2/3 p-8">
              {/* Name and Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    status === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* Blood Group Badge */}
              <div className="mb-8">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-2xl font-bold bg-[#eb2c29] text-white">
                  {bloodGroup}
                </span>
                <p className="mt-2 text-gray-600">Blood Group</p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {email}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {phoneNumber || 'Not provided'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    District
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {district}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Upazila</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {upazila}
                  </p>
                </div>
              </div>

              {/* Last Donation */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-500">
                  Last Donation Date
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {lastDonationDate || 'No donation history'}
                </p>
              </div>

              {/* Address */}
              {address && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {address}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-[#eb2c29] hover:bg-[#d12522] text-white font-medium py-3 px-6 rounded-md transition duration-150 ease-in-out cursor-pointer"
                >
                  <span className="flex items-center justify-center gap-3">
                    {' '}
                    <IoArrowBackSharp /> Back
                  </span>
                </button>
                <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-md transition duration-150 ease-in-out cursor-pointer">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Important Notes
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#eb2c29] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Please verify donor availability before making a request
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#eb2c29] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                Emergency requests should be made by phone when possible
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-[#eb2c29] mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>
                All donors are verified but please follow hospital safety
                protocols
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonorsCardDetails;
