import { Dialog } from '@headlessui/react';
import React, { useState, useEffect } from 'react';

const ViewBlog = ({ isOpen, setIsViewModalOpen, blog }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (blog?.thumbnail) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [blog?.thumbnail]);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={() => setIsViewModalOpen(false)}
    >
      {/* Blurred Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all">
          {/* Modal Header */}
          <div className="bg-red-600 px-6 py-4">
            <Dialog.Title className="text-xl font-bold text-white">
              Blog Details
            </Dialog.Title>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {blog?.title}
                </p>
              </div>

              {blog?.thumbnail && (
                <div className="mt-4 relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Loading image...</span>
                    </div>
                  )}
                  {imageError ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                      Image failed to load
                    </div>
                  ) : (
                    <img
                      src={blog.thumbnail}
                      alt="Blog thumbnail"
                      className={`w-full h-full object-contain ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-300`}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => {
                        setImageError(true);
                        setImageLoaded(true);
                      }}
                    />
                  )}
                </div>
              )}

              {/* Rest of your content remains the same */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Content</h3>
                <p className="mt-1 text-gray-700 whitespace-pre-line">
                  {blog?.blogDec}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1 text-gray-700">{blog?.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blog?.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {blog?.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end">
            <button
              type="button"
              onClick={() => setIsViewModalOpen(false)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ViewBlog;
