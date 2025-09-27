import React from 'react';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';

const Topbar = () => {
  return (
    <header className="h-16 bg-gradient-to-br from-rose-800 via-rose-700 to-rose-900 shadow-md px-6 flex items-center justify-between rounded-b-3xl">
      <h1 className="text-white text-2xl font-extrabold tracking-wide font-secondary">
        Admin Dashboard
      </h1>
      <div className="flex items-center gap-3 text-white cursor-pointer select-none group relative">
        <FaUserCircle size={28} />
        <button className="font-semibold hover:underline focus:outline-none">
          Admin
        </button>
        <FaChevronDown size={14} className="mt-1" />
      </div>
    </header>
  );
};

export default Topbar;
