
import React, { useContext, useEffect, useState ,useRef} from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import { Link,  useNavigate } from 'react-router'
import { UserContext } from '../UserContext/usercontext';
import { IoMdArrowRoundBack } from "react-icons/io";
import api from '../api';
export default function Login() {
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState("")
    const {setUser}=useContext(UserContext)
    const [loading,setLoading]=useState(false)
    const navgtion=useNavigate()
    const errorTimeRef=useRef(null)
 async function login(e){
  e.preventDefault();
  try{
    setLoading(true)
    const response=await api.post('/login',{
      name,password
    },{withCredentials:true}) 
    setUser(response.data.user);
    navgtion("/allplaces")
    
  } catch (error) {
      setError(error.response?.data?.error);
  }finally{
    setLoading(false)
  }
 }
 useEffect(()=>{
  if(error){
    if(errorTimeRef.current){
      clearTimeout(errorTimeRef.current)
    }errorTimeRef.current=setTimeout(()=>{
      setError("")
    },3000)
  }
  return ()=>clearTimeout(errorTimeRef.current)
 },[error])
  return (
    <div className='relative  h-screen flex items-center justify-center p-4'>
    <div className='w-full max-w-md p-6   flex flex-col items-start'>
      <Link to="/" className='text-sm font-mono mb-4 text-blue-700 hover:underline flex items-center gap-1'>
      <IoMdArrowRoundBack size={18} /> Back
      </Link>
     <h1 className='text-3xl font-bold text-center mx-auto mb-6 font-mono w-full'>Login</h1>
      <form onSubmit={login} className='w-full'>
        <input type='text' placeholder='Username'   autoFocus  value={name} onChange={(e) => setName(e.target.value)} 
          className='w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none ' />
        <input  type='password' placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)} 
          className='w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 '
        />
        <button type='submit'   className='w-full bg-black text-white p-2 font-semibold rounded-full hover:bg-gray-800 transition duration-300'>
         {loading ? (
          <div className='flex  items-center justify-center gap-2'>
            Login
            <BiLoaderAlt  className="animate-spin" />
            </div>
         ):(
          <div className='flex  items-center justify-center gap-2'>
          Login   
          </div>
         )} 
        </button>
      </form>
      <div className='text-center mt-4 text-black'>
        Don't have an account? 
        <Link to='/register' className='font-semibold hover:text-blue-600 underline ml-1'>Register</Link>
      </div>
      {error&&<p className='absolute  top-10  right-2 bg-red-700 rounded-md  px-6 py-3 font-mono text-white'>{error}</p>}
    </div>
  </div>
);
};

