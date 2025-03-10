import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useRef } from 'react'
import axios from "axios"
import { BiLoaderAlt } from 'react-icons/bi';
export default function Register() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const errorTimeRef=useRef(null)

    async function register(e){
        e.preventDefault();
        try {
          if(!name ||!email || !password){
            setError("All filed is requried ")
            return;
          }
          setLoading(true)
           await axios.post('/register',{
            name,
            email,
            password
          }); 
          setTimeout(() => {
            setName("")
            setEmail("")
            setPassword("")
            navigate('/');
            setLoading(false); 
        },2000);

        
          }catch(error) {
            setError( error.response?.data?.msg||"Register Failed");
          
          }finally{
            setLoading(false)
          }
    }
    useEffect(()=>{
      if(error){
      if(errorTimeRef.current){
          clearTimeout(errorTimeRef.current)
        }
      }errorTimeRef.current=setTimeout(()=>{
        setError("")
      },3000)
      
    },[error])
  return (
<div className='  relative min-h-screen flex items-center justify-center p-4'>
  <div className='  w-full max-w-md p-6  rounded-lg  flex flex-col items-center'>
    <h1 className='text-4xl text-center mb-4 font-semibold text-gray-800'>Register</h1>
    <form onSubmit={register} className='w-full'>
        <input  type='text'  placeholder='Username'  value={name}  onChange={(e) => setName(e.target.value)} 
            className='w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
          <input  type='email'  placeholder='youremail@gmail.com'  value={email}  onChange={(e) => setEmail(e.target.value)} 
            className='w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
          <input  type='password' placeholder='Password'  value={password}  onChange={(e) => setPassword(e.target.value)} 
            className='w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400' />
          <button type='submit' className='w-full bg-black text-white p-2 font-semibold rounded-full hover:bg-gray-800 transition duration-300' >
            {loading ? (
             <div className='flex  items-center justify-center gap-2'>
             Register
             <BiLoaderAlt  className="animate-spin" />
           </div>
              ):
            <div className='flex  items-center justify-center gap-2'>
              Register
            </div>
            }
          </button>
      </form>
        <div className='text-center mt-4 text-gray-800'>
          Already have an account? 
          <Link to='/login' className='font-semibold hover:text-blue-700 underline ml-1'>Login</Link>
      </div>
      {error&&<p className='absolute  top-10  right-2 bg-red-500 rounded-md  px-6 py-3 font-mono text-white'>{error}</p>}
    </div>
  </div> 

  )
}
