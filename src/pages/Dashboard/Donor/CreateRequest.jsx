import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useRole from '../../../hooks/useRole';
import Swal from 'sweetalert2';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const initialFormData = {
  recipientName: '',
  district: '',
  upazila: '',
  hospitalName: '',
  address: '',
  bloodGroup: '',
  donationDate: '',
  donationTime: '',
  message: '',
};

const CreateRequest = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState('');

  useEffect(() => {
    fetch('/districts.json')
      .then(res => res.json())
      .then(data => setDistricts(data));
    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = upazilas.filter(
        upazila => upazila.district_id === selectedDistrictId
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId, upazilas]);

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`
      );
      return data;
    },
  });

  if (isLoading || isRoleLoading) return <LoadingSpinner />;

  if (userData?.status === 'blocked') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mt-3 text-lg font-medium text-gray-900">
            Account Restricted
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            You are blocked from creating donation requests. Please contact
            support for assistance.
          </p>
        </div>
      </div>
    );
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const donationRequest = {
      requesterName: userData?.name,
      requesterEmail: user?.email,
      ...formData,
      status: 'pending',
      profile: userData?.imageUrl,
      role: role,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/donation-request`,
        donationRequest
      );

      if (data?.insertedId) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Request Submitted!',
          text: 'Your blood donation request has been received.',
          showConfirmButton: false,
          timer: 1500,
          background: '#ffffff',
          iconColor: '#eb2c29',
        });

        setFormData(initialFormData);
        setSelectedDistrictId('');
        setFilteredUpazilas([]);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.message || 'Please try again.',
        confirmButtonColor: '#eb2c29',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-[#eb2c29]">Request</span> Blood Donation
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Fill out the form below to request blood donation for your patient.
            All fields are required.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requester Info */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userData?.name || ''}
                      readOnly
                      className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29]"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29]"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Recipient Info */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Patient Name <span className="text-[#eb2c29]">*</span>
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29]"
                    placeholder="Enter patient's full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Blood Group <span className="text-[#eb2c29]">*</span>
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29]"
                  >
                    <option value="">Select blood type</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Info */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    District <span className="text-[#eb2c29]">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={e => {
                      const selectedName = e.target.value;
                      const selectedDistrict = districts.find(
                        d => d.name === selectedName
                      );
                      setSelectedDistrictId(selectedDistrict?.id || '');
                      handleChange(e);
                    }}
                    required
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29]"
                  >
                    <option value="">Select district</option>
                    {districts.map(d => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upazila <span className="text-[#eb2c29]">*</span>
                  </label>
                  <select
                    name="upazila"
                    value={formData.upazila}
                    onChange={handleChange}
                    required
                    disabled={!selectedDistrictId}
                    className={`block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29] ${
                      !selectedDistrictId ? 'bg-gray-50' : ''
                    }`}
                  >
                    <option value="">
                      {selectedDistrictId
                        ? 'Select upazila'
                        : 'Select district first'}
                    </option>
                    {filteredUpazilas.map(u => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hospital Info */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Hospital Name <span className="text-[#eb2c29]">*</span>
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29]"
                    placeholder="Enter hospital/clinic name"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Address <span className="text-[#eb2c29]">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29]"
                    placeholder="Enter full address with details"
                  />
                </div>

                {/* Date & Time */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Donation Date <span className="text-[#eb2c29]">*</span>
                  </label>
                  <input
                    type="date"
                    name="donationDate"
                    value={formData.donationDate}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Donation Time <span className="text-[#eb2c29]">*</span>
                  </label>
                  <input
                    type="time"
                    name="donationTime"
                    value={formData.donationTime}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Message <span className="text-[#eb2c29]">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#eb2c29] focus:border-[#eb2c29]"
                  placeholder="Provide any additional details about the patient's condition or special requirements"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-[#eb2c29] hover:bg-[#d12522] text-white font-medium rounded-lg shadow-md transition duration-200 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Submit Donation Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
