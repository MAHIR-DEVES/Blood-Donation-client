import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
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

const UpdateRequest = ({ closeModal, isOpen, request, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState(initialFormData);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState('');

  // Set formData from incoming request
  useEffect(() => {
    if (request) {
      setFormData({
        recipientName: request.recipientName || '',
        district: request.district || '',
        upazila: request.upazila || '',
        hospitalName: request.hospitalName || '',
        address: request.address || '',
        bloodGroup: request.bloodGroup || '',
        donationDate:
          request.donationDate || new Date().toISOString().split('T')[0],
        donationTime: request.donationTime || '',
        message: request.message || '',
      });
    }
  }, [request]);

  useEffect(() => {
    fetch('/districts.json')
      .then(res => res.json())
      .then(data => setDistricts(data));
    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

  useEffect(() => {
    if (formData.district) {
      const selected = districts.find(d => d.name === formData.district);
      const id = selected?.id || '';
      setSelectedDistrictId(id);

      const filtered = upazilas.filter(u => u.district_id === id);
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [formData.district, upazilas, districts]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { data } = await axiosSecure.put(
      `/update-request/${request._id}`,
      formData
    );
    if (data?.modifiedCount) {
      refetch();
      closeModal();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Request Successfully Updated',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white shadow-xl overflow-hidden">
          <div className="bg-[#eb2c29] p-4">
            <Dialog.Title className="text-xl font-semibold text-center text-white">
              Update Blood Donation Request
            </Dialog.Title>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Patient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb2c29] focus:border-transparent"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb2c29] focus:border-transparent"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb2c29] focus:border-transparent"
                >
                  <option value="">Select district</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upazila <span className="text-red-500">*</span>
                </label>
                <select
                  name="upazila"
                  value={formData.upazila}
                  onChange={handleChange}
                  required
                  disabled={!formData.district}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb2c29] focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Select upazila</option>
                  {filteredUpazilas.map(u => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hospital Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hospital Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb2c29] focus:border-transparent"
                />
              </div>

              {/* Full Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb2c29] focus:border-transparent"
                />
              </div>

              {/* Donation Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="donationDate"
                  value={formData.donationDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb2c29] focus:border-transparent"
                />
              </div>

              {/* Donation Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="donationTime"
                  value={formData.donationTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb2c29] focus:border-transparent"
                />
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Message
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb2c29] focus:border-transparent"
                placeholder="Any special instructions or details..."
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#eb2c29] rounded-md hover:bg-[#d12522] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb2c29] focus:ring-opacity-50"
              >
                Update Request
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UpdateRequest;
