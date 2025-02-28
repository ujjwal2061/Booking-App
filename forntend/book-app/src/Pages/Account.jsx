
import React,{ useContext, useState } from 'react'
import { UserContext } from '../UserContext/usercontext'
import { Navigate, useParams ,useLocation} from 'react-router'
import { FaHotel } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router'
import axios from 'axios'
import PlacesPage from './Placespage'
export default function Account() {
  const {user,ready,setUser,setReady} =useContext(UserContext)
  const [redirect,setRedirect]=useState(null)
  const location=useLocation()
  const {subpage}=useParams()
  // check the user is login or not
  // got the problem while Refersh the page it move to login page 

  if (!ready) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
 function isActive(path){
  return location.pathname===path ? "bg-primary text-white":" bg-gray-300"
 }
 // function  to logout 
  async function logoutuser(){
    try{
      document.cookie="auth_token=;"
      await axios.post('/logout')
      setUser(null); // Set the user state to null after logging out
      setReady(true)
      setRedirect('/')
  } catch (error) {
    throw error
    
  }
  }
  if (redirect) return <Navigate to={redirect} />;
  return (
    <div>
    <nav className='w-full flex   mt-8 justify-center  gap-3  mb-8 '>
        <Link className={`flex  items-center gap-2 py-2 px-6 rounded-full ${isActive("/account")}`} to="/account">
        <CiUser />
          My Account</Link>
        <Link className={`flex  items-center gap-2 py-2 px-6 rounded-full ${isActive("/account/bookings")}`} to="/account/bookings">
        <CiViewList />
     My Bookings</Link>
        <Link className={`flex  items-center gap-2 py-2 px-6 rounded-full ${isActive("/account/places")}`} to="/account/places">
        <FaHotel />
        My accomodations</Link>
    </nav> 
    
    {subpage === undefined && (
        <div className="mt-6 text-center max-w-lg mx-auto ">
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={logoutuser}
          className="bg-primary m-2 hover:bg-pink-600  p-2 w-1/2 font-semibold text-white rounded-full">Logout</button>
        </div>
      )}
      {subpage==="places"&&(
        <PlacesPage />
      )}
    </div>
  )
}
