import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { AiOutlineBars, AiOutlineClose } from 'react-icons/ai';

import MenuItem from './Menu/MenuItem';
import useAuth from '../../../hooks/useAuth';
import AdminMenu from './Menu/AdminMenu';
import DonarMenu from './Menu/DonarMenu';
import Volunteer from './Menu/Volunteer';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Logo from '../../Shared/Logo';

const Sidebar = () => {
  const [role, isRoleLoading] = useRole();
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);

  if (isRoleLoading) return <LoadingSpinner />;

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-gray-100 flex justify-between md:hidden sticky top-0 z-20">
        <div className="block cursor-pointer p-4 font-bold">
          <Logo />
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none"
        >
          {isActive ? (
            <AiOutlineClose className="h-5 w-5" />
          ) : (
            <AiOutlineBars className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isActive && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={handleToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-40 flex flex-col justify-between w-64 h-full bg-sec-500 px-2 py-4 transform transition-transform duration-300 ease-in-out ${
          isActive ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          <div className="flex justify-center items-center w-full bg-white p-4 mb-6">
            <Logo />
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1">
            <nav>
              {/* Menu Items */}
              {role === 'donor' && <DonarMenu />}
              {role === 'volunteer' && <Volunteer />}
              {role === 'admin' && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr className="border-gray-600 my-4" />
          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 hover:bg-gray-300 rounded-md bg-white hover:text-black transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
