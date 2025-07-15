import React from 'react';
import { FaRegFileAlt, FaRegImage } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const ManageContentRow = ({ item }) => {
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

  const getTypeIcon = type => {
    switch (type) {
      case 'Image':
        return <FaRegImage className="text-red-500" />;
      case 'PDF':
        return <FaRegFileAlt className="text-red-500" />;
      default:
        return <FaRegFileAlt className="text-red-500" />;
    }
  };
  return (
    <tr key={item?.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{item?.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {getTypeIcon(item?.type)}
          <span className="text-gray-500">{item?.type}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
        {item?.lastUpdated}
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
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-3">
          <button className="text-red-600 hover:text-red-900">
            <FiEdit className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManageContentRow;
