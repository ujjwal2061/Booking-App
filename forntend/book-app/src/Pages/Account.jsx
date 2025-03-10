
import React,{ useContext, useState} from 'react'
import { UserContext } from '../UserContext/usercontext'

export default function Account() {
  const {user} =useContext(UserContext)
  const [newuserName,setUserName]=useState("")

 console.log(user?.name)

  return (
        <div className="mt-6 text-center max-w-lg mx-auto ">
          <h2>Welcome, {user?.name}</h2>
          <p>Email: {user?.email}</p>
        </div>
    
     
  )
}
