import React, { useContext, useState } from 'react'
import { Link } from 'react-router'
import { UserContext } from '../UserContext/usercontext'
import { TiThMenu } from "react-icons/ti";
import { TfiBackRight } from "react-icons/tfi";
export default function Header() {
  const {user}=useContext(UserContext)
  const [IsOpen,setIsOpen]=useState(false)


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
        <Link to="/account" className='bg-black font-mono rounded-md px-4 py-1 text-white'>
              {user.name || "Account"}
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
      {/* {IsOpen ? <TiThMenu />:<TfiBackRight />} */}
    </button>
    </header>
    {IsOpen && (
      <div  className={`fixed top-0 right-0 h-full w-40 px-2 shadow-md bg-maincolor flex flex-col gap-5 md:hidden transition-transform duration-600 ease-in-out ${IsOpen ? "translate-x-0" : "translate-x-full"}`}>
       <button onClick={()=>setIsOpen(false)}><TfiBackRight size={23} /></button>
       {user ? (
            <Link to="/account" className='bg-black font-mono rounded-md px-4 py-1 text-white'>
              {user.name || "Account"}
            </Link>
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
