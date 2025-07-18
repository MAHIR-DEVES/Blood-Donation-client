import { useState } from 'react';

import UpdatePlantModal from '../../Modal/UpdatePlantModal';
import ViewBlog from '../../Modal/ViewBlog';

const VolunteerBlogRow = ({ blog, refetch }) => {
  const { title, thumbnail, status, role, date } = blog || {};

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const handleViewClick = blog => {
    setSelectedBlog(blog);
    setIsViewModalOpen(true);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={thumbnail}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-nowrap">
          {title.length > 30 ? title.slice(0, 30) + '...' : title}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{status}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{date}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{role}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Update
          </button>
          <button
            onClick={() => handleViewClick(blog)}
            className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 bg-white text-xs font-medium rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            View
          </button>
        </div>
        {/* update */}
        <UpdatePlantModal
          setIsEditModalOpen={setIsEditModalOpen}
          isOpen={isEditModalOpen}
          blog={blog}
          refetch={refetch}
        ></UpdatePlantModal>

        {/* view */}
        <ViewBlog
          isOpen={isViewModalOpen}
          setIsViewModalOpen={setIsViewModalOpen}
          blog={selectedBlog}
        />
      </td>
    </tr>
  );
};

export default VolunteerBlogRow;
