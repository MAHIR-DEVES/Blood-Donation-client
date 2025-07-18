import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState, useRef } from 'react';
import useRole from '../../hooks/useRole';
import JoditEditor from 'jodit-react';
import { imageUpload } from '../../API/utils';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Button from '../Shared/Button/Button';
import { useEffect } from 'react';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const UpdatePlantModal = ({ setIsEditModalOpen, isOpen, blog, refetch }) => {
  const { _id, title: defaultTitle, thumbnail, blogDec } = blog || {};
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();

  const handleImageChange = e => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    if (blogDec) {
      setContent(blogDec);
    }
  }, [blogDec]);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const uploadedImage = image ? await imageUpload(image) : thumbnail;

    const extractPlainText = htmlString => {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = htmlString;
      return tempElement.textContent || tempElement.innerText || '';
    };

    const blogDec = extractPlainText(content);

    const formData = {
      title,
      thumbnail: uploadedImage,
      blogDec,
      status: 'draft',
      role,
      date: new Date().toISOString().split('T')[0],
    };

    // TODO: Save formData to database here
    const { data } = await axiosSecure.put(`/blog-update/${_id}`, formData);
    if (data?.modifiedCount) {
      toast.success('successfully updated your blog');
      refetch();
      setIsEditModalOpen(false);
    }
  };

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={() => setIsEditModalOpen(false)}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal panel wrapper */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg space-y-6">
          <DialogTitle className="text-lg font-bold text-center text-gray-700 mb-2">
            Update Blog
          </DialogTitle>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blog Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold"
              >
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={defaultTitle}
                placeholder="Enter blog title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-lime-500"
                required
              />
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">
                Thumbnail Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-lime-500 file:text-white hover:file:bg-lime-600"
              />
              {(image || thumbnail) && (
                <img
                  src={image ? URL.createObjectURL(image) : thumbnail}
                  alt="preview"
                  className="h-40 object-cover rounded mt-2"
                />
              )}
            </div>

            {/* Jodit Editor */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">
                Content
              </label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={newContent => setContent(newContent)}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button type="submit" label="Submit" />
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdatePlantModal;
