import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaHotel, FaCaretDown,  } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { UserContext } from '../UserContext/usercontext';
import defaultAvatar from "../assets/discord.jpeg";
import api from '../api';

export default function Header() {
  const { user, setUser, setReady } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef();
  const dropdownRef = useRef();

  // Initialize profile image from localStorage
  useEffect(() => {
    const userImage = localStorage.getItem("userImage");
    if (userImage) {
      setProfileImage(userImage);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Close profile dropdown if clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      
      // Close mobile menu when clicking outside (but only on mobile)
      if (window.innerWidth < 768 && menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  async function handleLogout() {
    try {
      document.cookie = "auth_token=;";
      await api.post('/logout');
      setUser(null);
      setReady(true);
      localStorage.removeItem("userImage");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/");
    }
  }

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(prev => !prev);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Homy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {!user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="py-2 px-4 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center space-x-3 py-2 px-3 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                  onClick={toggleProfileDropdown}
                >
                  <img 
                    src={profileImage || defaultAvatar} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full object-cover border border-gray-200" 
                  />
                  <span className="font-medium text-gray-700">{user.name}</span>
                  <FaCaretDown 
                    className={`text-gray-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn">
                    <div className="p-4 border-b border-gray-100">
                      <Link to="/account" className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg">
                        <img 
                          src={profileImage || defaultAvatar} 
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover border border-gray-200" 
                        />
                        <div>
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">Manage your account</p>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="p-2">
                      <Link to="/account/bookings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <FaHotel className="text-blue-600" size={16} />
                        </div>
                        <span className="font-medium text-gray-700">Your Bookings</span>
                      </Link>
                      
                      <Link to="/account/places" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="bg-green-50 p-2 rounded-lg">
                          <CiViewList className="text-green-600" size={16} />
                        </div>
                        <span className="font-medium text-gray-700">Accommodations</span>
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-100 p-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <IoIosLogOut size={18} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <RiCloseLine className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <RiMenuLine className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        ref={menuRef}
        className={`fixed   inset-y-0 right-0 transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden transition duration-300 ease-in-out `}
      >
        <div className="h-full w-72  shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b  border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              <RiCloseLine className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 bg-maincolor bg-opacity-20  p-4">
            {user ? (
              <>
                <div className="mb-2">
                  <Link 
                    to="/account" 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <img 
                      src={profileImage || defaultAvatar} 
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover border border-gray-200" 
                    />
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">Manage your account</p>
                    </div>
                  </Link>
                </div>

                <div className="space-y-2">
                  <Link 
                    to="/account/bookings" 
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <FaHotel className="text-blue-600" size={18} />
                    </div>
                    <span className="font-medium text-gray-700">Your Bookings</span>
                  </Link>
                  
                  <Link 
                    to="/account/places" 
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="bg-green-50 p-2 rounded-lg">
                      <CiViewList className="text-green-600" size={18} />
                    </div>
                    <span className="font-medium text-gray-700">Accommodations</span>
                  </Link>
                </div>
              </>
            ) : (
              <div className="space-y-4 py-6">
                <Link 
                  to="/login"
                  className="block w-full py-3 px-4 text-center bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  className="block w-full py-3 px-4 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {user && (
            <div className="p-4 border-t border-gray-100">
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 p-3 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <IoIosLogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}