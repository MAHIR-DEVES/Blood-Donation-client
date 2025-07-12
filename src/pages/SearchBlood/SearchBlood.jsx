import React, { useState } from 'react';
import Button from '../../components/Shared/Button/Button';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DonorCard from '../../components/Dashboard/Donors/DonorCard';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const SearchBlood = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [searchParams, setSearchParams] = useState(null);

  const axiosSecure = useAxiosSecure();

  const handelSearch = e => {
    e.preventDefault();
    setSearchParams({ bloodGroup, location });
  };

  const { data, isLoading } = useQuery({
    queryKey: ['donors', searchParams],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donors`, {
        params: {
          bloodGroup: searchParams.bloodGroup,
          location: searchParams.location,
        },
      });
      return data;
    },
    enabled: !!searchParams,
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#eb2c29] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Find Blood Donors Near You
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Every drop counts. Search for available blood types in your area and
            help save lives today.
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Blood Availability
            </h2>
            <form onSubmit={handelSearch} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="blood-type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Blood Type
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={e => setBloodGroup(e.target.value)}
                    id="blood-type"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#eb2c29] focus:border-[#eb2c29] sm:text-sm rounded-md border"
                  >
                    <option>Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#eb2c29] focus:border-[#eb2c29] sm:text-sm"
                    placeholder="Deistic or Upazila"
                  />
                </div>
              </div>
              <div>
                <Button
                  onClick={handelSearch}
                  label={'Search Availability'}
                ></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* donors cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {data?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No donors found matching your criteria.
            </p>
            <p className="text-gray-500 mt-2">
              Please try different search filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.map(donor => (
              <DonorCard donor={donor} key={donor._id} />
            ))}
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Blood Donation Matters
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Every 2 seconds someone in the world needs blood. Your donation can
            save up to 3 lives.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-[#eb2c29] rounded-md shadow-lg">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                  Quick Response
                </h3>
                <p className="mt-5 text-base text-gray-600">
                  Our network connects you with donors quickly when emergencies
                  arise, ensuring timely access to blood.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-[#eb2c29] rounded-md shadow-lg">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                  Large Donor Network
                </h3>
                <p className="mt-5 text-base text-gray-600">
                  Thousands of registered donors across the country ready to
                  help when their blood type is needed.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center p-3 bg-[#eb2c29] rounded-md shadow-lg">
                    <svg
                      className="h-6 w-6 text-white"
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
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                  Verified Donors
                </h3>
                <p className="mt-5 text-base text-gray-600">
                  All donors are health-screened and verified to ensure the
                  safety and quality of donated blood.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#eb2c29]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to make a difference?</span>
            <span className="block">Register as a donor today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#eb2c29] bg-white hover:bg-gray-50"
              >
                Become a Donor
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#d12522] hover:bg-[#b8201e]"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBlood;
