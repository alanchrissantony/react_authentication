import React, { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">

        <div className="relative w-1/3">
          <input type="text" placeholder="Search..." className="w-full p-2 pl-10 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 text-gray-400 focus:outline-none">
            <FaUserCircle className="text-3xl" />
            <span>Admin</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <p className="block px-4 py-2 text-gray-400 cursor-pointer">Logout</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;