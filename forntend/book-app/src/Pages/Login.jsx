import axios from 'axios';
import React, { useContext, useEffect, useState ,useRef} from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import { Link,  useNavigate } from 'react-router'
import { UserContext } from '../UserContext/usercontext';

export default function Login() {
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState("")
    const {setUser}=useContext(UserContext)
    const [loading,setLoading]=useState(false)
    const nvagtion=useNavigate()
   const errorTimeRef=useRef(null)
 async function login(e){
  e.preventDefault();
  try{
    setLoading(true)
    const response=await axios.post('/login',{
      name,password
    },{withCredentials:true}) 
    setUser(response.data.user.name);
    setTimeout(()=>{
      nvagtion("/allplaces")
    },5000)
  } catch (error) {
      setError(error.response?.data?.msg);
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
 },[error])
  return (
    <div className='relative min-h-screen flex items-center justify-center p-4'>
    <div className='w-full max-w-md p-6   flex flex-col items-center'>
      <h1 className='text-4xl text-center mb-4 font-semibold text-black font-mono'>Login</h1>
      <form onSubmit={login} className='w-full'>
        <input type='text' placeholder='Username'  value={name} onChange={(e) => setName(e.target.value)} 
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
      {error&&<p className='absolute  top-10  right-2 bg-red-500 rounded-md  px-6 py-3 font-mono text-white'>{error}</p>}
    </div>
  </div>
);
};

