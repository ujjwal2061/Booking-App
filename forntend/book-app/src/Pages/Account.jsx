
import React,{ useContext } from 'react'
import { UserContext } from '../UserContext/usercontext'
import { Navigate, useParams ,useLocation} from 'react-router'
import { Link } from 'react-router'
import axios from 'axios'
export default function Account() {
  const {user,ready,setUser} =useContext(UserContext)
  const location=useLocation()
  const {subpage}=useParams()
  // check the user is login or not
  // got the problem while Refersh the page it move to login page 

  if (!ready) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
 function isActive(path){
  return location.pathname===path ? "bg-primary text-white":" "
 }
 // function  to logout 
  async function logoutuser(){
    try{ 
      await axios.post('/logout')
     setUser(null); // Set the user state to null after logging out
  } catch (error) {
    console.error('Error logging out:', error);
  }
  }
  return (
    <div>
    <nav className='w-full flex mt-8 justify-center  gap-3  mb-8 '>
        <Link className={`py-2 px-6 rounded-full ${isActive("/account")}`} to="/account">My Account</Link>
        <Link className={`py-2 px-6 rounded-full ${isActive("/account/bookings")}`} to="/account/bookings">My Bookings</Link>
        <Link className={`py-2 px-6 rounded-full ${isActive("/account/places")}`} to="/account/places">My Places</Link>
    </nav> 
    {subpage === undefined && (
        <div className="mt-6 text-center max-w-lg mx-auto ">
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={logoutuser}
          className="bg-primary m-2 hover:bg-pink-600  p-2 w-1/2 font-semibold text-white rounded-full">Logout</button>
        </div>
      )}
    </div>
  )
}
