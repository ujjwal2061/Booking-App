import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from "axios"
export default function Register() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function register(e){
        e.preventDefault();
        try {
            const response = await axios.post('/register',{
                name,
                email,
                password
            });
            console.log(response.data);  
        } catch (error) {
            console.error("Error connecting to backend:", error);
        }
    }
  return (
<div className='mt-4 grow flex items-center justify-around'>
<div className='mb-64'>
<h1 className='text-4xl text-center mb-4 font-semibold'>Register</h1>
  <form onSubmit={register}
   className='max-w-md mx-auto'>
  <input type='text' placeholder='Lazy' value={name} onChange={(e)=>setName(e.target.value)} />
  <input type='email' placeholder='youremail@gmail.com'  value={email} onChange={(e)=>setEmail(e.target.value)}/>
  <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
  <button className='bg-primary p-2 w-full font-semibold text-white rounded-full'>Register</button>  
</form> 
<div className='text-center p-2 text-gray-800'> Allready have Account ?<Link to={'/login'} className=' font-semibold hover:text-blue-700 underline '>Login</Link>
</div>
</div>
</div>
  )
}
