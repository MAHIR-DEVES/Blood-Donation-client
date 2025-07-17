import { useQuery } from '@tanstack/react-query';
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useState } from 'react';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState('active');

  const { data: donors, isLoading } = useQuery({
    queryKey: ['all-donor', status],
    queryFn: async () => {
      const data = await axiosSecure(`/all-donor?status=${status}`);
      return data?.data;
    },
  });

  const handleChange = e => {
    setStatus(e.target.value);
    console.log(status);
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Select Status:</h2>

            <div className="flex gap-6">
              {/* Active */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="active"
                  checked={status === 'active'}
                  onChange={handleChange}
                  className="accent-green-500"
                />
                <span className="text-green-600 font-medium">✅ Active</span>
              </label>

              {/* Unlock */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="unblock"
                  checked={status === 'unblock'}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                <span className="text-blue-600 font-medium">🔓 unblock</span>
              </label>

              {/* Block */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="block"
                  checked={status === 'block'}
                  onChange={handleChange}
                  className="accent-red-500"
                />
                <span className="text-red-600 font-medium">⛔ Block</span>
              </label>
            </div>

            <p className="mt-4 text-sm">
              Selected status: <strong>{status}</strong>
            </p>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Profile
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Role
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {donors?.map(donor => (
                    <UserDataRow key={donor._id} donor={donor} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
