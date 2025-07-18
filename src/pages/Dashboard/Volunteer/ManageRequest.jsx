import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import VolunteerDataRow from '../../../components/Dashboard/TableRows/VolunteerDataRow';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ManageRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState('Complete');
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: requestsData, isLoading } = useQuery({
    queryKey: ['manage-request', status, page],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/all-request?status=${status}&page=${page}&limit=${limit}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  const requests = requestsData?.result || [];
  const total = requestsData?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleChange = e => {
    setStatus(e.target.value);
    setPage(1); // reset to first page on status change
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {/* Filter Section */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Select Status:</h2>
            <div className="flex gap-6">
              {['Complete', 'Inprogress', 'Pending'].map(option => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={option}
                    checked={status === option}
                    onChange={handleChange}
                    className={`accent-${
                      option === 'Complete'
                        ? 'green'
                        : option === 'Inprogress'
                        ? 'blue'
                        : 'red'
                    }-500`}
                  />
                  <span
                    className={`text-${
                      option === 'Complete'
                        ? 'green'
                        : option === 'Inprogress'
                        ? 'blue'
                        : 'red'
                    }-600 font-medium`}
                  >
                    {option === 'Complete' && '✅ Complete'}
                    {option === 'Inprogress' && '🔄 In Progress'}
                    {option === 'Pending' && '⏳ Pending'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Table Section */}
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden mt-4">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {[
                    'Profile',
                    'Name',
                    'Email',
                    'Blood',
                    'Time',
                    'Location',
                    'Status',
                    'Action',
                  ].map(header => (
                    <th
                      key={header}
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <VolunteerDataRow key={request._id} request={request} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-1 text-sm font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage(prev => (page < totalPages ? prev + 1 : prev))
                }
                disabled={page >= totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRequest;
