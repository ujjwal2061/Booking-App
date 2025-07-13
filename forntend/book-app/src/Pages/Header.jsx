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
  const [scroll ,setScroll]=useState(0)
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

  //
 window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  setScroll(scrollY)

});
    // const value= window.scrollY
    // console.log("Scrool value",value)
 
  const handleLogout = async () => {
    try {
      document.cookie = 'auth_token=;';
      await api.post('/logout');
      setUser(null);
      setReady(true);
      localStorage.removeItem('userImage');
      navigate('/');
    } catch (err) {
      setError(err);
      navigate('/');
    }
  };

  return (
    <header className={`sticky   -top-0 z-50   ${scroll >= 22 ?" backdrop-blur-md bg-transparent  bg-slate-200 shadow-sm ":""}`}>
      <div className="w-full   px-4  py-3 flex  justify-between items-center">
        <Link to="/" className="text-xl font-bold">Homy</Link>

        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </button>
        </div>
            {/*this part is Desktop part */}
        <nav className="hidden md:flex items-center space-x-4 px-2">
          {!user ? (
            <div className='flex  items-center  gap-5 '> 
              <Link to="/login" className="text-gray-700  bg-slate-200  font-semibold px-5 py-1 rounded-lg hover:text-black">Login</Link>
              <Link to="/register" className="bg-black text-white px-5 py-1 font-semibold rounded-lg ">Sign Up</Link>
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
        <div className=" absolute right-0 md:hidden w-64 bg-gray-50 rounded-md px-4 pb-4 space-y-2">
          {!user ? (
            <div className='flex flex-col  gap-2    font-semibold '>
              <Link to="/login" className="block  px-2   bg-slate-200 hover:bg-slate-300 rounded-md hover:rounded-md transition-colors  text-center duration-300 py-2" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" className="block  px-2  bg-black text-white rounded-md  hover:bg-gray-800 py-2 text-center" onClick={() => setMobileOpen(false)}>Sign Up</Link>
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
