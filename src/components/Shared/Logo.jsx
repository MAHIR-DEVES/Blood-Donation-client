import React from 'react';
import logo from '../../assets/images/navlogo.png';
import { Link } from 'react-router';

const Logo = () => {
  return (
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
  );
};

export default Logo;
