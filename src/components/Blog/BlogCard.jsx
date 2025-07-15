import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const BlogCard = ({ blog }) => {
  console.log(blog);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
      {/* Blog Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={blog.thumbnail || 'https://via.placeholder.com/400x250'}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="p-6">
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <span className="flex items-center mr-4">
            <FaUser className="mr-1 text-red-600" />
            {blog.role || 'Admin'}
          </span>
          <span className="flex items-center">
            <FaCalendarAlt className="mr-1 text-red-600" />
            {blog?.date}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-red-600 transition duration-300">
          {blog.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {blog.summary ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>
        <Link to={`/blog-details/${blog._id}`}>
          <span
            className="inline-flex items-center text-red-600 font-medium
        hover:text-red-800 transition duration-300 cursor-pointer"
          >
            Read More <FaArrowRight className="ml-2" />
          </span>
        </Link>
      </div>
    </div>
  );
};
export default BlogCard;
