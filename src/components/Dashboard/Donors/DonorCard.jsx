import React from 'react';
import Button from '../../Shared/Button/Button';
import { useNavigate } from 'react-router';

const DonorCard = ({ donor }) => {
  const {
    _id,
    name,
    email,
    imageUrl = 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80', // better default image
    bloodGroup,
    district,
    upazila,
    status = 'Available',
  } = donor || {};

  const bloodGroupColors = {
    'A+': 'bg-red-600',
    'A-': 'bg-red-400',
    'B+': 'bg-blue-600',
    'B-': 'bg-blue-400',
    'AB+': 'bg-purple-600',
    'AB-': 'bg-purple-400',
    'O+': 'bg-green-600',
    'O-': 'bg-green-400',
  };

  const statusColors = {
    Available: 'bg-green-100 text-green-800',
    Unavailable: 'bg-red-100 text-red-800',
    'Recently Donated': 'bg-yellow-100 text-yellow-800',
  };

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Image container with fixed aspect ratio */}
      <div className="relative pt-[75%] overflow-hidden">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={imageUrl}
          alt={`${name}'s profile`}
          onError={e => {
            e.target.src =
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80';
          }}
        />
      </div>

      {/* Card content */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h2>
          <span
            className={`${
              bloodGroupColors[bloodGroup] || 'bg-gray-600'
            } text-white text-xs font-bold px-2 py-1 rounded-full min-w-[2.5rem] text-center`}
          >
            {bloodGroup}
          </span>
        </div>

        <div className="mb-3">
          <span
            className={`text-xs font-semibold inline-block py-1 px-2 rounded-full ${
              statusColors[status] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {status}
          </span>
        </div>

        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p className="flex items-center truncate">
            <svg
              className="w-4 h-4 mr-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="truncate">{email}</span>
          </p>
          <p className="flex items-center truncate">
            <svg
              className="w-4 h-4 mr-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">
              {upazila}, {district}
            </span>
          </p>
        </div>

        <div className="mt-auto">
          <Button
            onClick={() => navigate(`/donor-card-details/${_id}`)}
            label={' Contact Donor'}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default DonorCard;
