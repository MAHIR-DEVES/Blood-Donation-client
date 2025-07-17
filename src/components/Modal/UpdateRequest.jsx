import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import { useNavigate } from 'react-router';
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
        donationDate: new Date().toISOString().split('T')[0] || '',
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
        title: ' Successfully Updated',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl overflow-y-auto max-h-[90vh]">
          <Dialog.Title className="text-2xl font-semibold text-center text-[#eb2c29] mb-4">
            Update Your Request
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">Patient Name</label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm">District</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="">Select district</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm">Upazila</label>
                <select
                  name="upazila"
                  value={formData.upazila}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="">Select upazila</option>
                  {filteredUpazilas.map(u => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm">Hospital Name</label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm">Full Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm">Donation Date</label>
                <input
                  type="date"
                  name="donationDate"
                  value={formData.donationDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm">Donation Time</label>
                <input
                  type="time"
                  name="donationTime"
                  value={formData.donationTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm">Additional Message</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#eb2c29] text-white rounded hover:bg-[#d12522]"
              >
                Update
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UpdateRequest;
