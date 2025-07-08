import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { imageUpload } from '../../API/utils';

const SignUp = () => {
  const { createUser, loading } = useAuth();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Load Districts & Upazilas
  useEffect(() => {
    fetch('/districts.json')
      .then(res => res.json())
      .then(data => setDistricts(data));
    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

  // Filter upazilas based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilas.filter(
        upazila => upazila.district_id === selectedDistrict
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, upazilas]);

  // Handle Submit
  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;
    const bloodGroup = form.blood_group.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const imageFile = form.image.files[0];

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    const imageUrl = await imageUpload(imageFile);
    console.log(imageUrl);

    try {
      const fromData = {
        name,
        email,
        imageUrl,
        bloodGroup,
        district,
        upazila,
        role: 'donor',
        status: 'active',
      };
      console.log(fromData);

      const result = await createUser(email, password);

      // Optional: Save to database here
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        fromData
      );
      console.log(data);

      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-accent-500">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 w-full">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-500">Welcome to BloodDonor</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="input input-bordered w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="input input-bordered w-full"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="file-input file-input-bordered w-full"
          />

          <select
            name="blood_group"
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          <select
            name="district"
            required
            onChange={e => setSelectedDistrict(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            name="upazila"
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map(u => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            required
            className="input input-bordered w-full"
          />

          <button type="submit" className="btn bg-sec-500 w-full text-white">
            {loading ? (
              <TbFidgetSpinner className="animate-spin" />
            ) : (
              'Continue'
            )}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
