import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UpdateRequest from '../../Modal/UpdateRequest';
const CustomerOrderDataRow = ({ request, refetch }) => {
  const {
    _id,
    requesterName,
    district,
    bloodGroup,
    donationDate,
    status,
    profile,
  } = request || {};
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const axiosSecure = useAxiosSecure();

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
        const { data } = await axiosSecure.delete(`/delete-request/${_id}`);
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
        <p className="text-gray-900 whitespace-no-wrap">{district}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{donationDate}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{bloodGroup}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="text-red-600 hover:text-red-900"
          >
            <FiEdit className="w-5 h-5" />
          </button>
          <button
            onClick={handelDelete}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>

        <UpdateRequest
          request={request}
          isOpen={isOpen}
          closeModal={closeModal}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
