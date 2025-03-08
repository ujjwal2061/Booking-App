import axios from 'axios';
import React, { useContext, useState } from 'react'

import { Link, Navigate, useNavigate } from 'react-router'
import { UserContext } from '../UserContext/usercontext';
export default function Login() {
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
 
    const {setUser}=useContext(UserContext)
   const nvagtion=useNavigate()
 // for submit function 
 async function login(e){
  e.preventDefault();
  try{
    const response=await axios.post('/login',{
      name,password
    },{withCredentials:true}) 
    alert("Login succesfully")
    setUser(response.data.user.name);
    nvagtion("/allplaces")
  } catch (error) {
      console.error("Error connecting to backend:", error);
  }
  
 }

  return (
<div className='mt-4 grow flex items-center justify-around'>
    <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4 font-semibold'> Login</h1>
<form onSubmit={login} 
className='max-w-md mx-auto'>
  <input type='text' placeholder='Username' value={name} onChange={(e)=>setName(e.target.value)} />
 <input type="password" placeholder='password'   value={password} onChange={(e)=>setPassword(e.target.value)}/>
<button className='bg-primary p-2 w-full font-semibold text-white rounded-full'>Login</button>  
</form> 
  <div className='text-center p-2 text-gray-800'> Don't have Account ?<Link to={'/register'} className=' font-semibold hover:text-blue-700 underline '>Register</Link>
  </div>
    </div>
    </div>
  )
}
