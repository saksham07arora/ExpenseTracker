// src/components/Newbar.js
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.jpg";
import { useAuth } from '../../context/authContext'; // Import the useAuth hook

const Newbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { login, logout, isAuthenticated, accounts, isLoggingIn } = useAuth(); // Get authentication data from context

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 py-3 dark:bg-gray-900 shadow-sm">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-1 mx-auto">
        {/* Logo section */}
        <Link to="/" className="flex items-center">
          <img src={Logo} className="h-7 ml-5 mr-3 sm:h-9 border" alt="Logo" />
          <span className="text-2xl font-semibold dark:text-white">Expense Tracker</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 mr-2 text-grey-500 text-2xl lg:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <RiCloseLargeLine /> : <GiHamburgerMenu />}
        </button>

        {/* Desktop and mobile menu */}
        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <ul className="flex flex-col lg:flex-row lg:space-x-8 font-medium">
            <li>
              <Link to="/" className="text-purple-700 text-lg lg:text-purple-700 dark:text-white py-2 px-.5 block">
                Home
              </Link>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-purple-700 text-lg dark:text-gray-400 dark:hover:text-white py-2 px-.5 block">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-purple-700 text-lg dark:text-gray-400 dark:hover:text-white py-2 px-.5 block">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Login/Logout button */}
        <div className="space-x-2">
          {!isAuthenticated ? (
            <button onClick={login} className="hidden lg:inline-block text-black font-medium hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg text-md px-5 py-2 hover:text-white" disabled={isLoggingIn}>
              {isLoggingIn ? 'Logging in...' : 'Login with Azure AD B2C'}
            </button>
          ) : (
            <>
              <span className="hidden lg:inline-block text-white font-medium bg-purple-700 rounded-lg text-md px-5 py-2 dark:bg-purple-600">
                Welcome, {accounts[0].username}
              </span>
              <button onClick={logout} className="hidden lg:inline-block text-black font-medium hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg text-md px-5 py-2 hover:text-white">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Newbar;
