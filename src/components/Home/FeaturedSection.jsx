import React from 'react';
import {
  FaShieldAlt,
  FaClock,
  FaHandHoldingHeart,
  FaUsers,
  FaAmbulance,
  FaBell,
} from 'react-icons/fa';

const FeaturedSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-700 mb-4">
            Why Choose <span className="text-red-800">BloodConnect</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our life-saving community where every donation makes a
            difference. We've facilitated over 50,000 successful blood donations
            nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <FaShieldAlt className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Verified Donor Network
              </h3>
            </div>
            <p className="text-gray-600">
              Every donor undergoes thorough health screening and verification
              to ensure the safest possible blood supply for recipients.
            </p>
            <div className="mt-6">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Verified donor"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <FaClock className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Rapid Response System
              </h3>
            </div>
            <p className="text-gray-600">
              Our emergency alert system connects you with nearby donors within
              minutes when every second counts.
            </p>
            <div className="mt-6">
              <img
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Emergency response"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <FaUsers className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Community Support
              </h3>
            </div>
            <p className="text-gray-600">
              Join 100,000+ donors and recipients who trust our platform for
              safe, reliable blood donation connections.
            </p>
            <div className="mt-6">
              <img
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Community support"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaUsers className="text-red-600 text-4xl mx-auto mb-3" />
            <p className="text-3xl font-bold text-red-700">50K+</p>
            <p className="text-gray-600">Active Donors</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaHandHoldingHeart className="text-red-600 text-4xl mx-auto mb-3" />
            <p className="text-3xl font-bold text-red-700">120K+</p>
            <p className="text-gray-600">Lives Saved</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaAmbulance className="text-red-600 text-4xl mx-auto mb-3" />
            <p className="text-3xl font-bold text-red-700">24/7</p>
            <p className="text-gray-600">Emergency Support</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaBell className="text-red-600 text-4xl mx-auto mb-3" />
            <p className="text-3xl font-bold text-red-700">15min</p>
            <p className="text-gray-600">Average Response Time</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
