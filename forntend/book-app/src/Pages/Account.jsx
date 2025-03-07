
import React,{ useContext, useState } from 'react'
import { UserContext } from '../UserContext/usercontext'
import { Navigate, useParams ,useLocation} from 'react-router'

import axios from 'axios'
import PlacesPage from './Placespage'
import AccountNavbar from './AccountNavabar'
export default function Account() {
  const {user,ready,setUser,setReady} =useContext(UserContext)
  const [redirect,setRedirect]=useState(null)
  const location=useLocation()
  const {subpage}=useParams()
  // check the user is login or not
  // got the problem while Refersh the page it move to login page 

  if (!ready) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />;

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
    
    <AccountNavbar />
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
