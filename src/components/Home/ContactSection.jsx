import React from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="py-16 px-4 bg-white" id="contact">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-red-600">Contact</span> Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reach out for inquiries, partnerships, or emergency blood requests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="bg-red-50 p-8 rounded-xl border border-red-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              How to Reach Us
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full mr-4 shadow-sm border border-red-200">
                  <FaPhone className="text-red-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    Emergency Hotline
                  </h4>
                  <p className="text-gray-600">+880 1711-234567</p>
                  <p className="text-sm text-gray-500 mt-1">24/7 available</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full mr-4 shadow-sm border border-red-200">
                  <FaEnvelope className="text-red-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Email</h4>
                  <p className="text-gray-600">contact@rokto.org</p>
                  <p className="text-gray-600">emergency@rokto.org</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full mr-4 shadow-sm border border-red-200">
                  <FaMapMarkerAlt className="text-red-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Headquarters</h4>
                  <p className="text-gray-600">
                    123 Blood Donation Road
                    <br />
                    Dhaka 1212, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-full mr-4 shadow-sm border border-red-200">
                  <FaClock className="text-red-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Office Hours</h4>
                  <p className="text-gray-600">
                    Sunday - Thursday: 9am - 5pm
                    <br />
                    Friday - Saturday: Closed
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-6">
                <h4 className="font-medium text-gray-800 mb-3">
                  Follow Our Movement
                </h4>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="bg-white p-3 rounded-full text-red-600 hover:bg-red-100 transition-colors border border-red-200 shadow-sm"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="bg-white p-3 rounded-full text-red-600 hover:bg-red-100 transition-colors border border-red-200 shadow-sm"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="bg-white p-3 rounded-full text-red-600 hover:bg-red-100 transition-colors border border-red-200 shadow-sm"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="bg-white p-3 rounded-full text-red-600 hover:bg-red-100 transition-colors border border-red-200 shadow-sm"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Urgent Request
            </h3>
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+880 1XXX-XXXXXX"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="blood-type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Blood Type Needed *
                </label>
                <select
                  id="blood-type"
                  name="blood-type"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Urgent Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Patient condition, hospital location, and urgent requirements"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-colors duration-200"
              >
                Send Emergency Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
