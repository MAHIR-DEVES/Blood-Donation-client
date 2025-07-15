import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  FaCalendarAlt,
  FaUser,
  FaHeartbeat,
  FaHospital,
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';
import { IoWater, IoTime, IoAlertCircle } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BlogDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/blog-details/${id}`);
      return data;
    },
  });

  const { title, thumbnail, blogDec, date, role } = data || {};

  return (
    <div className="min-h-screen bg-white">
      {/* Blood Donation Alert Banner */}
      <div className="bg-red-600 text-white py-3 px-4 text-center text-sm font-medium ">
        <span className="animate-pulse">🩸</span> Every blood donation can save
        up to 3 lives. Consider donating today!
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Blood Donation Facts */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-4">
            <h2 className="text-xl font-bold mb-6 text-red-600 border-b-2 border-red-100 pb-2 flex items-center">
              <FaHeartbeat className="mr-2" /> BLOOD DONATION FACTS
            </h2>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3 text-red-600">
                  <IoWater size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">One donation</h3>
                  <p className="text-sm text-gray-600">
                    Can save up to 3 lives
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3 text-red-600">
                  <IoTime size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Donation frequency</h3>
                  <p className="text-sm text-gray-600">
                    Every 56 days for whole blood
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3 text-red-600">
                  <FaHospital size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Blood need</h3>
                  <p className="text-sm text-gray-600">
                    Every 2 seconds someone needs blood
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3 text-red-600">
                  <IoAlertCircle size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Eligibility</h3>
                  <p className="text-sm text-gray-600">
                    Must be 16+, weigh 110+ lbs, and be in good health
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 bg-red-50 border-l-4 border-red-600 p-4 rounded-r">
              <h3 className="font-bold text-red-700 mb-2">Did You Know?</h3>
              <p className="text-sm text-gray-700">
                Type O-negative blood is the universal donor type that can be
                given to patients of any blood type.
              </p>
            </div>
          </div>
        </div>
        {/* Center Content Area - Dynamic content will go here */}

        {/* Center Content Area - Dynamic content will go here */}
        <div className="lg:w-2/4">
          <div id="dynamic-content" className="prose max-w-none">
            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {title || 'Blood Donation Article'}
              </h1>

              <div className="flex flex-wrap items-center text-gray-600 text-sm mb-6 gap-4">
                <span className="flex items-center">
                  <FaUser className="mr-2 text-red-600" />
                  {role || 'Blood Donation Specialist'}
                </span>
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-red-600" />
                  {date
                    ? new Date(date).toLocaleDateString()
                    : 'No date specified'}
                </span>
              </div>

              {/* Thumbnail Image */}
              {thumbnail && (
                <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg mb-6 shadow-md">
                  <img
                    src={thumbnail}
                    alt={title || 'Blood donation image'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="article-content">
              {blogDec ? (
                <div dangerouslySetInnerHTML={{ __html: blogDec }} />
              ) : (
                <div className="space-y-4">
                  <p>
                    This article would contain important information about blood
                    donation.
                  </p>
                  <p>
                    Blood donation is a vital service that saves millions of
                    lives each year. A single donation can help up to three
                    different patients in need.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                    Why Donate Blood?
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Save lives in emergency situations</li>
                    <li>Help patients with chronic illnesses</li>
                    <li>Support surgical procedures</li>
                    <li>Contribute to medical research</li>
                  </ul>

                  <div className="bg-red-50 border-l-4 border-red-600 p-4 my-6 rounded-r">
                    <p className="font-medium text-red-700">
                      Remember: There is no substitute for human blood. The
                      supply must constantly be replenished by generous donors.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Donation Call-to-Action */}
            <div className="mt-12 bg-white border border-red-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-red-600 mb-3">
                Ready to Make a Difference?
              </h3>
              <p className="mb-4">
                Your blood donation could save a life today. Find a donation
                center near you.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
                Find a Donation Center
              </button>
            </div>
          </div>
        </div>
        {/* Right Sidebar - Donation Centers & Events */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-4 space-y-8">
            {/* Upcoming Blood Drives */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-red-600 border-b-2 border-red-100 pb-2 flex items-center">
                <FaCalendarAlt className="mr-2" /> UPCOMING DRIVES
              </h2>
              <ul className="space-y-4">
                <li className="border-b border-gray-100 pb-3">
                  <h3 className="font-medium">Dhaka Central Hospital</h3>
                  <p className="text-sm text-gray-600">
                    July 25, 2023 • 9AM-4PM
                  </p>
                  <button className="mt-1 text-xs text-red-600 hover:text-red-800 font-medium">
                    View Details →
                  </button>
                </li>
                <li className="border-b border-gray-100 pb-3">
                  <h3 className="font-medium">Red Crescent Blood Center</h3>
                  <p className="text-sm text-gray-600">
                    August 2, 2023 • 10AM-5PM
                  </p>
                  <button className="mt-1 text-xs text-red-600 hover:text-red-800 font-medium">
                    View Details →
                  </button>
                </li>
                <li>
                  <h3 className="font-medium">
                    University Blood Donation Camp
                  </h3>
                  <p className="text-sm text-gray-600">
                    August 10, 2023 • 8AM-3PM
                  </p>
                  <button className="mt-1 text-xs text-red-600 hover:text-red-800 font-medium">
                    View Details →
                  </button>
                </li>
              </ul>
            </div>

            {/* Blood Type Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3">
                Blood Type Compatibility
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-red-600 text-white p-2 rounded text-center">
                  O- → All
                </div>
                <div className="bg-red-100 p-2 rounded text-center">
                  O+ → O+, A+, B+, AB+
                </div>
                <div className="bg-red-100 p-2 rounded text-center">
                  A- → A-, A+, AB-, AB+
                </div>
                <div className="bg-red-100 p-2 rounded text-center">
                  B- → B-, B+, AB-, AB+
                </div>
                <div className="bg-red-100 p-2 rounded text-center">
                  AB- → AB-, AB+
                </div>
                <div className="bg-red-100 p-2 rounded text-center">
                  AB+ → AB+ only
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-700 mb-2">Emergency Need?</h3>
              <p className="text-sm text-gray-700 mb-3">
                For urgent blood requests:
              </p>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition">
                Contact Blood Helpline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
