import React from 'react'
import { Link } from 'react-router'

export default function Login() {
  return (
<div className='mt-4 grow flex items-center justify-around'>
    <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4 font-semibold'> Login</h1>
<form className='max-w-md mx-auto'>
  <input type='email' placeholder='youremail@gmail.com' />
<input type="password" placeholder='password'/>
<button className='bg-primary p-2 w-full font-semibold text-white rounded-full'>Login</button>  
</form> 
  <div className='text-center p-2 text-gray-800'> Don't have Account ?<Link to={'/register'} className=' font-semibold hover:text-blue-700 underline '>Register</Link>
  </div>
    </div>
    </div>
  )
}
