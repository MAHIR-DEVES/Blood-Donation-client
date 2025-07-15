import React from 'react';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import BlogCard from '../../components/Blog/BlogCard';

const Blog = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['all-blogs'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/blogs`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Insights, stories, and ideas from our team
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Stay Updated</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest blog posts and news.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
