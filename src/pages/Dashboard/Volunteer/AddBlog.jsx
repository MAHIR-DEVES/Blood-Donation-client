import { useNavigate } from 'react-router';
import AddBlogForm from '../../../components/Form/AddBlogForm';
import { FiArrowLeft, FiImage, FiUpload } from 'react-icons/fi';

const AddBlog = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen px-2 md:px-5 py-10">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-red-600 hover:text-red-800 transition-colors mb-2 cursor-pointer"
            >
              <FiArrowLeft className="mr-2" /> Back to Blogs
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-red-700">
              Create New Blog Post
            </h1>
            <p className="text-gray-600 mt-1">
              Fill out the form below to add a new blog post
            </p>
          </div>
          <div className="hidden md:block">
            <span className="inline-flex items-center px-4 py-2 bg-red-100 border border-red-200 text-sm font-medium rounded-lg text-red-700">
              <FiImage className="mr-2" /> Cover Image Required
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Form Header */}
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Blog Information
            </h2>
            <span className="text-sm text-gray-500">
              All fields are required
            </span>
          </div>

          {/* Main Form Content */}
          <div>
            {/* Blog Form Component */}
            <div className="space-y-6">
              <AddBlogForm />
            </div>
          </div>
        </div>

        {/* Side Tips (for larger screens) */}
        <div className="hidden lg:block mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Blog Post Tips
          </h3>
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-red-500">•</span>
              <span className="ml-2">
                Keep your title under 60 characters for better SEO
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-red-500">•</span>
              <span className="ml-2">
                Use headings to break up long content
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-red-500">•</span>
              <span className="ml-2">
                Add alt text to all images for accessibility
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-red-500">•</span>
              <span className="ml-2">
                Include keywords naturally in your content
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
