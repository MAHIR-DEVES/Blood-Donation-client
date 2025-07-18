import React, { useEffect, useState } from 'react';
import Button from '../../components/Shared/Button/Button';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import DonorCard from '../../components/Dashboard/Donors/DonorCard';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const SearchBlood = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const axiosSecure = useAxiosSecure();

  // Load districts & upazilas from public folder
  useEffect(() => {
    const loadData = async () => {
      try {
        const res1 = await fetch('/districts.json');
        const data1 = await res1.json();
        setDistricts(data1);

        const res2 = await fetch('/upazilas.json');
        const data2 = await res2.json();
        setUpazilas(data2);
      } catch (error) {
        console.error('Failed to fetch location data:', error);
      }
    };
    loadData();
  }, []);

  // Filter upazilas based on district
  useEffect(() => {
    if (district) {
      const filtered = upazilas.filter(u => u.district_id === district);
      setFilteredUpazilas(filtered);
      setUpazila('');
    }
  }, [district, upazilas]);

  const handelSearch = e => {
    e.preventDefault();
    setHasSearched(true);

    const districtName = districts.find(d => d.id === district)?.name || '';

    const searchData = {
      bloodGroup,
      district: districtName,
      upazila,
    };

    setSearchParams(searchData);
  };

  const { data: donors, isLoading } = useQuery({
    queryKey: ['donors', searchParams],

    queryFn: async () => {
      const { data } = await axiosSecure.get('/donors', {
        params: {
          bloodGroup: searchParams.bloodGroup,
          district: searchParams.district,
          upazila: searchParams.upazila,
        },
      });
      return data;
    },
    enabled: !!searchParams, //
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Blood Availability
            </h2>

            <form onSubmit={handelSearch} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Blood Group */}
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
                    className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    required
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    District
                  </label>
                  <select
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upazila */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upazila
                  </label>
                  <select
                    value={upazila}
                    onChange={e => setUpazila(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    required
                  >
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map(u => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <Button type="submit" label="Search Availability" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-9/12 mx-auto">
        {donors?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {donors.map(donor => (
              <DonorCard key={donor.id} donor={donor} />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] py-12 px-4 text-center">
            <div className="flex flex-col items-center justify-center min-h-[50vh] py-12 px-4 text-center">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Donors Found
              </h3>
              <p className="text-gray-500 max-w-md mb-6">
                We couldn't find any donors matching your criteria. Please try
                adjusting your search or check back later.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBlood;
