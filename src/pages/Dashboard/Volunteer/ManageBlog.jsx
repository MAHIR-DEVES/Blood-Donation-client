import { useState } from 'react';
import VolunteerBlogRow from '../../../components/Dashboard/TableRows/VolunteerBlogRow';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ManageBlog = () => {
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();
  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['volunteer-blogs', page],
    enabled: !isRoleLoading && !!role,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/volunteer-blogs?page=${page}&limit=${limit}&email=${role}`
      );
      return data;
    },
  });

  if (isLoading || isRoleLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <>
      <div className="container mx-auto sm:px-8">
        <div className="py-4">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-800">
                      Image
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-800">
                      Title
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-800">
                      Status
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-800">
                      Date
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-800">
                      Role
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-800">
                      Delete
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-800">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs?.length > 0 ? (
                    blogs.map(blog => (
                      <VolunteerBlogRow
                        key={blog._id}
                        blog={blog}
                        refetch={refetch}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-6 text-gray-500"
                      >
                        No blogs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="px-4 py-1 text-sm font-medium">
                  Page {page}
                </span>

                <button
                  onClick={() => setPage(prev => prev + 1)}
                  className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBlog;
