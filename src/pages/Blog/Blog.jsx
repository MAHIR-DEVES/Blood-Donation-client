import React, { useState } from 'react';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const { data } = axios(`${import.meta.env.VITE_API_URL}/all-blog`);
  console.log(data);

  return <div></div>;
};

export default Blog;
