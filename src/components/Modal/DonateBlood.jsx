import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FaUser, FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Swal from 'sweetalert2';

const DonateBlood = ({ closeModal, isOpen, requesterEmail, _id }) => {
  const { user } = useAuth();
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const handelSubmit = async e => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const number = from.number.value;

    const fromData = {
      name,
      donateEmail: email,
      requestEmail: requesterEmail,
      number,
      profile: userData?.imageUrl,
    };

    const { data: status } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/update-request-status/${_id}`,
      { inprogress: 'inprogress' }
    );

    if (status?.modifiedCount) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/donates`,
        fromData
      );

      if (data?.insertedId) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your info has been send',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
          {/* Header */}
          <div className="bg-red-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <DialogTitle as="h3" className="text-xl font-bold text-white">
                Blood Donation Contact
              </DialogTitle>
              <button
                onClick={closeModal}
                className="text-white hover:text-red-200 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* User Profile */}
            <div className="flex items-center mb-6">
              <div className="relative">
                <img
                  src={userData?.imageUrl || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-4 border-red-100"
                />
                <div className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {userData?.bloodGroup || '?'}
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">
                  {userData?.name}
                </h4>
                <p className="text-sm text-gray-500">Ready to donate blood</p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handelSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaUser className="h-5 w-5" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    defaultValue={userData?.name}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    readOnly
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaEnvelope className="h-5 w-5" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    defaultValue={userData?.email}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    readOnly
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaPhone className="h-5 w-5" />
                  </div>
                  <input
                    name="number"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors"
                >
                  Confirm Donation Contact
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DonateBlood;
