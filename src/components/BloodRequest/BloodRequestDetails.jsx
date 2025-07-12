import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
  FaUser,
  FaHospital,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTint,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const BloodRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['single-request', id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/request-details/${id}`);
      return data;
    },
  });

  const {
    _id,
    requesterName,
    requesterEmail,
    recipientName,
    district,
    upazila,
    hospitalName,
    address,
    bloodGroup,
    donationDate,
    donationTime,
    message,
    status,
    profile,
    role,
  } = data || {};

  // Format date
  const formattedDate = donationDate
    ? new Date(donationDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Status styling
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#eb2c29] hover:text-[#d12522] transition-colors"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to requests
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Status Header */}
          <div
            className={`px-6 py-3 flex justify-between items-center ${
              status === 'pending'
                ? 'bg-[#eb2c29]/10'
                : status === 'approved'
                ? 'bg-green-50'
                : status === 'rejected'
                ? 'bg-red-50'
                : 'bg-blue-50'
            }`}
          >
            <div className="flex items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusStyles[status] || 'bg-gray-100 text-gray-800'
                }`}
              >
                {status
                  ? status.charAt(0).toUpperCase() + status.slice(1)
                  : 'Unknown Status'}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-600">
              Request ID: #{_id?.slice(-6).toUpperCase()}
            </span>
          </div>

          {/* Card Content */}
          <div className="p-6">
            {/* Requester Profile */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border-4 border-[#eb2c29]/20">
                  {profile ? (
                    <img
                      src={profile}
                      alt={requesterName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#eb2c29]/10 text-[#eb2c29]">
                      <FaUser className="w-8 h-8" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {requesterName || 'Anonymous'}
                </h2>
                <p className="text-gray-600 mt-1">{role || 'Donor'}</p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <a
                    href={`mailto:${requesterEmail}`}
                    className="flex items-center text-sm text-[#eb2c29] hover:text-[#d12522]"
                  >
                    <FaEnvelope className="mr-1" /> {requesterEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Recipient Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Patient Name
                  </h4>
                  <p className="text-lg font-medium text-gray-900">
                    {recipientName || 'Not specified'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Required Blood Group
                  </h4>
                  <div className="inline-flex items-center px-4 py-2 bg-[#eb2c29]/10 text-[#eb2c29] rounded-full">
                    <FaTint className="mr-2" />
                    <span className="font-bold">{bloodGroup || '--'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Donation Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <FaHospital className="text-[#eb2c29] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Hospital
                    </h4>
                    <p className="text-gray-900">
                      {hospitalName || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <FaMapMarkerAlt className="text-[#eb2c29] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Location
                    </h4>
                    <p className="text-gray-900">
                      {[upazila, district].filter(Boolean).join(', ') ||
                        'Not specified'}
                    </p>
                    {address && (
                      <p className="text-sm text-gray-600 mt-1">{address}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <FaCalendarAlt className="text-[#eb2c29] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Donation Date
                    </h4>
                    <p className="text-gray-900">
                      {formattedDate || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <FaClock className="text-[#eb2c29] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Donation Time
                    </h4>
                    <p className="text-gray-900">
                      {donationTime || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Message */}
            {message && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Additional Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{message}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-1 py-3 px-6 bg-[#eb2c29] hover:bg-[#d12522] text-white font-medium rounded-lg shadow-sm transition-colors">
                Contact Requester
              </button>
              <button className="flex-1 py-3 px-6 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-sm transition-colors">
                View Donor List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestDetails;
