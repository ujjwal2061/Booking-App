import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { FaCaretDown } from "react-icons/fa";
import api from '../api';
export default function Header() {
  const {user,setUser,setReady}=useContext(UserContext)
  const [IsOpen,setIsOpen]=useState(false)
  const [IsShow,setIsShow]=useState(false)
   const [profileImage,setprofileImage]=useState("")
  const navigate = useNavigate()
   
  const closemenuref=useRef()
useEffect(()=>{
  const userImage=localStorage.getItem("userImage")
 if(userImage){
  setprofileImage(userImage)
 }
},[])
   useEffect(()=>{
    function closemenubara(event){
      if(closemenuref.current && !closemenuref.current.contains(event.target)){
       setIsOpen(false)
       setIsShow(false) 
      }
    }
    document.addEventListener("mousedown",closemenubara)
    return ()=>document.removeEventListener("mousedown",handlepofile)
   })
  async function logoutuser(){
    try{
      document.cookie="auth_token=;"
      await api.post('/logout')
      setUser(null); // Set the user state to null after logging out
      setReady(true)
       navigate("/")
       localStorage.clear("userImage")
    
  } catch (error) {
    navigate("/")
    throw error
    
  }
  }
  const handlepofile=()=>{
    setIsShow((prevState)=>!prevState)
  }
  const Toogle=()=>{
    setIsOpen((prevstate)=>!prevstate)
  }
  return (
    <div className=' z-30 bg-maincolor bg-opacity-90 backdrop-blur-md shadow-md w-full px-5 py-2 '>
      <header className='  flex  justify-between  '>
      <Link to={"/"} className='flex  items-center gap-3' >
      <h2 className='text-2xl tracking-wide font-mono font-semibold '>Homy</h2>
     </Link>
    <div className="relative   hidden md:block">
       <div className="flex items-center  justify-center gap-6  rounded-lg px-3  transition-all duration-200 border">
         <Link to="/login" className="  py-1 px-4 bg-white border border-gray-400 rounded-lg text-center font-medium text-gray-800 hover:bg-gray-50 transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="   py-1 px-4 bg-black rounded-lg text-center font-medium text-white hover:bg-gray-700 transition-colors">
            Sign Up
          </Link>
  </div>
  {IsShow && (
    <div ref={closemenuref} 
      className="absolute right-0 top-12 w-64  bg-pink-500  rounded-xl overflow-hidden z-20  border border-gray-100 animate-fadeIn" >
      {user ? (
<div className="flex flex-col">
  <div className="bg-gray-50 p-4 border-b hover:border-gray-200">
      <Link to="/account" className="w-full">
        <div className="flex items-center gap-3">
          <img src={ profileImage ||discordjpg} className="h-10 w-10 rounded-full object-cover border border-gray-200" />
             <div className="flex flex-col">
                <span className="font-medium text-gray-900">Profile</span>
                <span className="text-sm text-gray-500">Manage your account</span>
            </div>
        </div>
       </Link>
     </div>
  <div className="p-2">
    <Link to="/account/bookings" className="w-full">
       <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 transition-colors">
          <div className="bg-blue-50 p-2 rounded-lg">
           <FaHotel className="text-blue-600" size={18} />
            </div>
              <span className="font-medium text-gray-800">Your Bookings</span>
            </div>
      </Link>
      <Link to="/account/places" className="w-full">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 transition-colors">
          <div className="bg-green-50 p-2 rounded-lg">
            <CiViewList className="text-green-600" size={18} />
            </div>
        <span className="font-medium text-gray-800">Accommodations</span>
      </div>
    </Link>
  </div>
 <div className="border-t border-gray-100 p-2 mt-2">
    <button onClick={logoutuser}  className="w-full  bg-red-600 flex items-center justify-center gap-2 p-2 text-white hover:bg-red-500 rounded-lg transition-colors" >
     <IoIosLogOut size={18} />
        <span className="font-medium">Logout</span>
      </button>
  </div>
</div>
      ) : (
        <div className="p-4 flex flex-col gap-3">
          <Link to="/login" className="w-full py-2 px-4 bg-white border border-gray-200 rounded-lg text-center font-medium text-gray-800 hover:bg-gray-50 transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="w-full py-2 px-4 bg-blue-600 rounded-lg text-center font-medium text-white hover:bg-blue-700 transition-colors">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  )}
</div>
    <button className='md:hidden  mr-2 '
      onClick={Toogle}>
        <TiThMenu  size={23}/>
    </button>
    </header>
    {IsOpen && (
   <div   ref={closemenuref} 
    className={`  bg-opacity-15 bg-maincolor fixed top-0 z-10 right-0 h-screen w-60 px-2 shadow-md  
     transition-transform duration-500 ease-in-out   flex flex-col gap-5 md:hidden 
   ${IsOpen ? "translate-x-0" : "translate-x-full"}`}>
   <button onClick={()=>setIsOpen(false)}><TfiBackRight  className="hover:rotate-45 mt-5    rounded-md px-2  py-1  duration-300 " size={37} /></button>
  {user ? (
  <div className="flex flex-col">
    <div className=" p-4 rounded-md hover:bg-gray-300">
      <Link to="/account" className="w-full">
            <div className="flex items-center hover:border-gray-400 gap-3">
                <img src={discordjpg} className="h-10 w-10 rounded-full object-cover border border-gray-200" />
                <div className="flex flex-col">
                <span className="font-medium text-gray-900">Profile</span>
                <span className="text-sm text-gray-500">Manage your account</span>
              </div>
          </div>
        </Link>
    </div>
    <div className="p-2 flex-col flex  gap-2">
      <Link to="/account/bookings" className="w-full">
        <div className="flex items-center bg-gray-100 gap-3 p-2  rounded-lg hover:bg-gray-300 transition-colors">
            <div className="bg-blue-50 p-2 rounded-lg">
             <FaHotel className="text-blue-600" size={18} />
            </div>
           <span className="font-medium text-gray-800">Your Bookings</span>
          </div>
        </Link>
      <Link to="/account/places" className="w-full">
      <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-100  hover:bg-gray-300 transition-colors">
         <div className="bg-green-50 p-2 rounded-lg">
         <CiViewList className="text-green-600" size={18} />
        </div>
        <span className="font-medium text-gray-800">Accommodations</span>
      </div>
     </Link>
    </div>
      <div className=" absolute bottom-2 w-full right-0   p-2 mt-2">
          <button  onClick={logoutuser}  className="w-full bg-red-600  flex items-center justify-center gap-2 p-2 text-white hover:bg-red-500 rounded-lg transition-colors" >
          <IoIosLogOut size={18} />
          <span className="font-medium">Logout</span>
       </button>
      </div>
  </div>
        ) : (
     <div className='flex flex-col  gap-5  p-2'>
      <Link to="/login" className='font-mono rounded-md px-4 py-2 hover:bg-slate-200  transition-all ease-in-out  duration-500  text-black'>Sign In</Link>
      <Link to="/register" className='bg-black font-mono rounded-md px-4 py-1 text-white hover:bg-slate-700 ransition-all ease-in-out  duration-500  '> Sign Up</Link>
    </div>
    
    )}
</div>
    )}
</div>
  )
}
