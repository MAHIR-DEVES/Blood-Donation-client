/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router';

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2 rounded-md transition-colors duration-300 ${
          isActive
            ? 'bg-gray-600 text-white font-semibold'
            : 'bg-white text-gray-700'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
