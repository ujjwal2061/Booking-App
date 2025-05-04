import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaCaretDown } from 'react-icons/fa';

import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { UserContext } from '../UserContext/usercontext';
import defaultAvatar from '../assets/discord.jpeg';
import api from '../api';

export default function Header() {
  const { user, setUser, setReady } = useContext(UserContext);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const img = localStorage.getItem('userImage');
    if (img) setProfileImage(img);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      document.cookie = 'auth_token=;';
      await api.post('/logout');
      setUser(null);
      setReady(true);
      localStorage.removeItem('userImage');
      navigate('/');
    } catch (err) {
      console.error(err);
      navigate('/');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Homy</Link>

        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </button>
        </div>
            {/*this part is Desktop part */}
        <nav className="hidden md:flex items-center space-x-4">
          {!user ? (
            <div className='flex gap-4 '> 
              <Link to="/login" className="text-gray-700  hover:text-black">Login</Link>
              <Link to="/register" className="bg-black text-white px-3 py-1 rounded">Sign Up</Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setProfileDropdown(!profileDropdown)} className="flex items-center space-x-2">
                <img src={profileImage || defaultAvatar} className="w-8 h-8 rounded-full" alt="profile" />
                <span>{user.name}</span>
                <FaCaretDown />
              </button>
              {profileDropdown && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded p-3 w-48">
                  <Link to="/account" className="block px-2 py-1 hover:bg-gray-100">Profile</Link>
                  <Link to="/account/bookings" className="block px-2 py-1 hover:bg-gray-100">Bookings</Link>
                  <Link to="/account/places" className="block px-2 py-1 hover:bg-gray-100">Accommodations</Link>
                  <button onClick={handleLogout} className="text-red-600 w-full text-left px-2 py-1 hover:bg-red-50">Logout</button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-50 px-4 pb-4 space-y-2">
          {!user ? (
            <div className='flex flex-col gap-1  '>
              <Link to="/login" className="block w-1/2 px-2  hover:bg-slate-500 hover:rounded-md transition-colors duration-300 py-2" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" className="block w-1/2 px-2  bg-black text-white rounded-md  hover:bg-gray-800 py-2" onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </div>
          ) : (
            <>
              <Link to="/account" className="block py-2" onClick={() => setMobileOpen(false)}>Profile</Link>
              <Link to="/account/bookings" className="block py-2" onClick={() => setMobileOpen(false)}>Bookings</Link>
              <Link to="/account/places" className="block py-2" onClick={() => setMobileOpen(false)}>Accommodations</Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-red-600 block w-full text-left py-2">Logout</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
