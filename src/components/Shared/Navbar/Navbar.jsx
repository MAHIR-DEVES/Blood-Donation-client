import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Container from '../Container';
import useAuth from '../../../hooks/useAuth';
import avatarImg from '../../../assets/images/placeholder.jpg';
import logo from '../../../assets/images/navlogo.png';
import { IoSearch } from 'react-icons/io5';
import axios from 'axios';
// import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`
      );
      return data;
    },
  });

  // useEffect(() => {
  //   const getUser = async () => {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/user/${user?.email}`
  //     );
  //     console.log(data);
  //   };

  //   if (user?.email) {
  //     getUser();
  //   }
  // }, [user?.email]);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 relative transition-colors ${
              isActive ? 'text-white' : 'text-red-100 hover:text-white'
            } ${
              isActive
                ? 'after:content-[""] after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:bg-white'
                : ''
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `px-4 py-2 relative transition-colors ${
              isActive ? 'text-white' : 'text-red-100 hover:text-white'
            } ${
              isActive
                ? 'after:content-[""] after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:bg-white'
                : ''
            }`
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bloodRequest"
          className={({ isActive }) =>
            `px-4 py-2 relative transition-colors ${
              isActive ? 'text-white' : 'text-red-100 hover:text-white'
            } ${
              isActive
                ? 'after:content-[""] after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:bg-white'
                : ''
            }`
          }
        >
          Blood Request
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `px-4 py-2 relative transition-colors flex items-center gap-2 ${
              isActive ? 'text-white' : 'text-red-100 hover:text-white'
            } ${
              isActive
                ? 'after:content-[""] after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:bg-white'
                : ''
            }`
          }
        >
          Search <IoSearch />
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed w-full bg-sec-500 z-50 shadow-sm">
      <div className="py-3 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex-shrink-0">
                <div className="bg-white flex items-center gap-3 p-2 shadow-sm">
                  <img
                    src={logo}
                    alt="BloodHero Logo"
                    width={20}
                    height={10}
                    className="object-contain"
                  />
                  <span className="text-2xl font-bold text-red-600 tracking-tight">
                    BloodHero
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex gap-6  justify-center items-center">
                {links}
              </ul>
            </div>

            {/* Profile Dropdown */}
            <div className="relative ">
              <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <AiOutlineClose size={24} />
                ) : (
                  <AiOutlineMenu size={24} />
                )}
              </button>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer transition-all duration-200 hover:opacity-80 hidden md:flex"
              >
                {user ? (
                  <img
                    className="rounded-full h-9 w-9 object-cover border-2 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                    src={query?.data?.imageUrl || avatarImg}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white">👤</span>
                  </div>
                )}
              </div>

              {isOpen && (
                <div className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                  <div className="py-1">
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 text-sm font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            logOut();
                            setIsOpen(false);
                          }}
                          className="w-full text-left px-5 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 text-sm font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                          </svg>
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-sec-500 mt-3 py-4 px-2 rounded-lg animate-slideDown">
              <ul className="space-y-3 ">
                {links}
                {user ? (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 pt-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logOut();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="block px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
