import { useState } from 'react';
import DeleteModal from '../../Modal/DeleteModal';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
const CustomerOrderDataRow = ({ request }) => {
  const { requesterName, district, bloodGroup, donationDate, status, profile } =
    request || {};
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

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
          <button className="text-red-600 hover:text-red-900">
            <FiEdit className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>

        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
