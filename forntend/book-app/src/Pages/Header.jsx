import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { FaHotel } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { UserContext } from '../UserContext/usercontext'
import { TiThMenu } from "react-icons/ti";
import { TfiBackRight } from "react-icons/tfi";
import  discordjpg from "../assets/discord.jpeg"
import { IoIosLogOut } from "react-icons/io";
import { useNavigate} from 'react-router'
export default function Header() {
  const {user,setUser,setReady}=useContext(UserContext)
  const [IsOpen,setIsOpen]=useState(false)
  
   const navigate = useNavigate()
 
  async function logoutuser(){
    try{
      document.cookie="auth_token=;"
      await axios.post('/logout')
      setUser(null); // Set the user state to null after logging out
      setReady(true)
       navigate("/")
    
  } catch (error) {
    navigate("/")
    throw error
    
  }
  }

  const Toogle=()=>{
    setIsOpen((prevstate)=>!prevstate)
  }
  return (
    <div className='px-5 py-1 border-b-2'>
      <header className='  flex  justify-between  '>
      <Link to={"/"} className='flex  items-center gap-3' >
      <h2 className='text-2xl tracking-wide font-mono font-semibold '>Homy</h2>
     </Link>
    <div className='  gap-7  hidden md:flex  mr-2'>
      {user ? (
        
        <Link to="/account" className=' w-8 h-8 rounded-full hover:scale-105 transition-all ease-in-out duration-500 cursor-pointer flex justify-center items-center'>
          <img src={discordjpg || ""} className='w-8 h-8 border-2 rounded-full object-contain' />
        </Link>
      ):(
        <>
        <Link to={"/login"}  className='  font-mono   rounded-md px-4 py-1 text-center text-black ' >Sing In  </Link>
        <Link to={"/register"}  className='bg-black  font-mono   rounded-md px-4 py-1 text-center text-white '>Sing Up</Link>
        </>

      )}

    </div>
    <button className='md:hidden  mr-2 '
      onClick={Toogle}>
        <TiThMenu  size={23}/>

    </button>
    </header>
    {IsOpen && (
      <div  className={`fixed top-0 left-0 h-full w-40 px-2 shadow-md bg-maincolor flex flex-col gap-5 md:hidden transition-transform duration-600 ease-in-out ${IsOpen ? "translate-x-0" : "translate-x-full"}`}>
       <button onClick={()=>setIsOpen(false)}><TfiBackRight size={23} /></button>
       {user ? (
        <>
          <Link to="/account" className=' w-full h-8 rounded-full  cursor-pointer flex justify-center items-center'>
            <div className=' flex  items-center bg-buttoncolor px-3  py-2 h-10 gap-2 rounded-md w-full'>
             <img src={discordjpg} className='h-8 w-8 rounded-full object-contain ' />
              <h2 className='text-white font-mono font-semibold'>{user.name}</h2>
            </div>
           </Link>
           <Link to="/account/bookings">
           <div className='flex bg-black text-white px-3 w-full h-10  gap-2 rounded-md items-center'>
           <FaHotel />
           <h2 className='font-mono tracking-tighter'>Your Booking</h2>
           </div>
           </Link>
           <Link to="/account/places">
           <div className='flex  bg-black text-white  gap-1 px-2 w-full h-10 rounded-md items-center'>
           <CiViewList />
           <h2 className='font-mono tracking-tighter'>Accomodations</h2>
           </div>
           </Link>
           <div className='flex items-center gap-3 justify-center text-red-500 absolute right-5  bottom-2 bg-black  px-2 w-32 h-10 rounded-md '>
           <button  onClick={logoutuser} className=" flex  font-mono text-center ">Logout</button>
           <IoIosLogOut size={20} />
           </div>

        </>

          ) : (
            <>
              <Link to="/login" className='font-mono rounded-md px-4 py-1 text-black'>
                Sign In
              </Link>
              <Link to="/register" className='bg-black font-mono rounded-md px-4 py-1 text-white'>
                Sign Up
              </Link>
            </>
          )}
    </div>
    )}
  
    

    </div>
  )
}
