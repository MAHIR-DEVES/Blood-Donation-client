import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const UserDataRow = ({ donor }) => {
  const [isRole, setIsRole] = useState('');
  const [isStatus, setIsStatus] = useState('');
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { _id, name, email, imageUrl, role, status } = donor || {};

  const mutation = useMutation({
    mutationFn: async isRole => {
      const { data } = await axiosSecure.patch(`/role-update/${_id}`, isRole);
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

  const handelUpdateRole = e => {
    e.preventDefault();
    mutation.mutate({ isRole });
  };

  //

  const mutation2 = useMutation({
    mutationFn: async isStatus => {
      const { data } = await axiosSecure.patch(`/user-status/${_id}`, isStatus);
      return data;
    },
    onSuccess: data => {
      // refetch();
      queryClient.invalidateQueries(['all-request']);
      toast.success('status successfully updated ');
      console.log(data);
    },

    onError: error => {
      console.log(error);
    },
  });

  const handelUpdateStatus = e => {
    e.preventDefault();
    mutation2.mutate({ isStatus });
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={imageUrl}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{role}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <select
          value={isRole}
          onChange={e => setIsRole(e.target.value)}
          required
          className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white"
          name="category"
        >
          <option value="Pending">Select Role</option>
          <option value="donor">Donor</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handelUpdateRole}
          className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white ml-1"
        >
          Update
        </button>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`flex justify-center whitespace-no-wrap ${
            status === 'active' ? 'bg-green-300 rounded-2xl' : ''
          } ${status === 'block' ? 'bg-red-400 rounded-2xl text-white' : ''} ${
            status === 'unblock' ? 'bg-red-200 rounded-2xl text-black' : ''
          }`}
        >
          {status}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <select
          value={isStatus}
          onChange={e => setIsStatus(e.target.value)}
          required
          className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white"
          name="category"
        >
          <option value="Pending">Select status</option>
          <option value="active">Active</option>
          <option value="block">Block</option>
          <option value="unblock">Unblock</option>
        </select>
        <button
          onClick={handelUpdateStatus}
          className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white ml-1"
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default UserDataRow;
