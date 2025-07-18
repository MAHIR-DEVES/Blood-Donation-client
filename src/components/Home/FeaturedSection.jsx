import React from 'react';
import {
  FaShieldAlt,
  FaClock,
  FaHandHoldingHeart,
  FaUsers,
  FaAmbulance,
  FaBell,
  FaMapMarkerAlt,
  FaHeartbeat,
} from 'react-icons/fa';

const FeaturedSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Why We're Different
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The <span className="text-red-600">Fastest, Safest</span> Way to
            Connect Blood
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our verified network has helped save over 120,000 lives across
            Bangladesh through immediate donor connections.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {/* Feature 1 - Verified Donors */}
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-start mb-6">
              <div className="bg-red-100 p-3 rounded-xl mr-5">
                <FaShieldAlt className="text-red-600 text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Verified Donors
                </h3>
                <p className="text-gray-600">
                  Every donor completes health screening and ID verification
                  before joining our network.
                </p>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Health history review</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">ID verification</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Regular health updates</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2 - Fast Response */}
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-start mb-6">
              <div className="bg-red-100 p-3 rounded-xl mr-5">
                <FaClock className="text-red-600 text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-600">
                  Average 12-minute response time when you need blood urgently.
                </p>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">
                  Response Time
                </span>
                <span className="text-red-600 font-bold">12 min avg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: '85%' }}
                ></div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <FaMapMarkerAlt className="inline mr-1 text-red-500" />
                Donors located within 5km radius
              </div>
            </div>
          </div>

          {/* Feature 3 - Nationwide Network */}
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-start mb-6">
              <div className="bg-red-100 p-3 rounded-xl mr-5">
                <FaUsers className="text-red-600 text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Nationwide Reach
                </h3>
                <p className="text-gray-600">
                  Active donors in all 64 districts of Bangladesh, ready to
                  help.
                </p>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center justify-center mb-3">
                <img
                  src="https://i.ibb.co/2qJ8W0z/bangladesh-map.png"
                  alt="Bangladesh coverage map"
                  className="h-32 object-contain"
                />
              </div>
              <div className="text-center text-sm text-gray-600">
                <FaHeartbeat className="inline mr-1 text-red-500" />
                100% district coverage
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            <div className="p-8 text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-red-600 text-3xl" />
              </div>
              <p className="text-4xl font-bold text-red-700 mb-2">50K+</p>
              <p className="text-gray-600 font-medium">Active Donors</p>
            </div>
            <div className="p-8 text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandHoldingHeart className="text-red-600 text-3xl" />
              </div>
              <p className="text-4xl font-bold text-red-700 mb-2">120K+</p>
              <p className="text-gray-600 font-medium">Lives Saved</p>
            </div>
            <div className="p-8 text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAmbulance className="text-red-600 text-3xl" />
              </div>
              <p className="text-4xl font-bold text-red-700 mb-2">24/7</p>
              <p className="text-gray-600 font-medium">Emergency Service</p>
            </div>
            <div className="p-8 text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBell className="text-red-600 text-3xl" />
              </div>
              <p className="text-4xl font-bold text-red-700 mb-2">12min</p>
              <p className="text-gray-600 font-medium">Avg. Response</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
            Join Our Life-Saving Network
          </button>
          <p className="mt-4 text-gray-500">
            Register as donor or request blood in minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
