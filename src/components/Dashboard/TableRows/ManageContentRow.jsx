import React, { useState } from 'react';

import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageContentRow = ({ item, refetch }) => {
  // const [role] = useRole();
  const [isStatus, setIsStatus] = useState('');
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const getStatusColor = status => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const mutation = useMutation({
    mutationFn: async isStatus => {
      const { data } = await axiosSecure.patch(
        `/blog-status-update/${item?._id}`,
        {
          isStatus,
        }
      );
      return data;
    },
    onSuccess: data => {
      // refetch();
      queryClient.invalidateQueries(['manage-contents']);
      toast.success('Role successfully updated ');
      console.log(data);
    },

    onError: error => {
      console.log(error);
    },
  });

  const handelUpdate = e => {
    e.preventDefault();
    mutation.mutate(isStatus);
  };

  const handelDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/delete-blog/${item?._id}`);
        if (data?.deletedCount) {
          refetch();
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }
      }
    });
  };

  return (
    <tr key={item?.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={item?.thumbnail}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{item?.title}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
        {item?.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
            item?.status
          )}`}
        >
          {item?.status}
        </span>
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
            <option value="draft">Secreted</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
          <button
            type="submit"
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-500 opacity-50 rounded-full"
            ></span>
            <span onClick={handelUpdate} className="relative">
              Update
            </span>
          </button>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-3">
          <button className="text-red-600 hover:text-red-900">
            <FiEdit className="w-5 h-5" />
          </button>
          <button
            onClick={handelDelete}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManageContentRow;
