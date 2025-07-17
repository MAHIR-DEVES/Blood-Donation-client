import React from 'react';
import { FaUser, FaTint } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const BloodRequestCard = ({ request }) => {
  const {
    _id,
    requesterName,
    requesterEmail,
    recipientName,
    bloodGroup,
    status,
    profile,
    role,
  } = request || {};

  const navigate = useNavigate();

  // Status color mapping
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-lg">
      {/* Header with status */}
      <div
        className={`px-4 py-2 flex justify-between items-center ${
          status === 'pending'
            ? 'bg-[#eb2c29]/10'
            : status === 'approved'
            ? 'bg-green-50'
            : status === 'rejected'
            ? 'bg-red-50'
            : 'bg-blue-50'
        }`}
      >
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              status === 'pending'
                ? 'bg-[#eb2c29]'
                : status === 'approved'
                ? 'bg-green-500'
                : status === 'rejected'
                ? 'bg-red-500'
                : 'bg-blue-500'
            }`}
          ></div>
          <span className="text-xs font-medium uppercase tracking-wider">
            {status || 'Unknown Status'}
          </span>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            statusColors[status] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {role || 'User'}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 md:p-6">
        {/* Requester Info */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border-2 border-[#eb2c29]/20">
              {profile ? (
                <img
                  src={profile}
                  alt={requesterName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#eb2c29]/10 text-[#eb2c29]">
                  <FaUser className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {requesterName || 'Anonymous'}
            </h3>
            <p className="text-sm text-gray-500">
              {requesterEmail || 'No email provided'}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* content parent */}
        <div className="flex justify-between">
          {/* Recipient Info */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              FOR PATIENT
            </h4>
            <p className="text-lg font-medium text-gray-900">
              {recipientName || 'Not specified'}
            </p>
          </div>

          {/* Blood Group Highlight */}
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#eb2c29]/10 text-[#eb2c29]">
              <FaTint className="mr-2" />
              <span className="font-bold text-lg">{bloodGroup || '--'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => navigate(`/blood-request-details/${_id}`)}
            className="flex-1 py-2 px-4 bg-[#eb2c29] hover:bg-[#d12522] text-white rounded-lg text-sm font-medium transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestCard;
