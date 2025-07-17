import { useState } from 'react';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const VolunteerDataRow = ({ request }) => {
  const [role, isRoleLoading] = useRole();
  const [isStatus, setIsStatus] = useState('');
  const axiosSecure = useAxiosSecure();

  const queryClient = useQueryClient();
  const {
    requesterName,
    _id,
    district,
    bloodGroup,
    donationTime,
    status,
    profile,
    requesterEmail,
  } = request || {};

  const mutation = useMutation({
    mutationFn: async isStatus => {
      const { data } = await axiosSecure.patch(`/status-update/${_id}`, {
        isStatus,
      });
      return data;
    },
    onSuccess: data => {
      // refetch();
      queryClient.invalidateQueries(['all-request']);
      toast.success('Role successfully updated ');
      console.log(data);
    },

    onError: error => {
      console.log(error);
    },
  });

  console.log(mutation);

  const handelUpdate = e => {
    e.preventDefault();
    mutation.mutate(isStatus);
  };

  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={profile}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{requesterName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{requesterEmail}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{bloodGroup}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{donationTime}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{district}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-2">
          <select
            value={isStatus}
            onChange={e => setIsStatus(e.target.value)}
            required
            className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white"
            name="category"
          >
            <option value="Pending">Pending</option>
            <option value="Complete">Complete</option>
          </select>
          {role === 'admin' ? (
            <button
              onClick={() => setIsOpen(true)}
              className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">Cancel</span>
            </button>
          ) : (
            ''
          )}
          <button
            onClick={handelUpdate}
            type="submit"
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-500 opacity-50 rounded-full"
            ></span>
            <span className="relative">Update</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default VolunteerDataRow;
