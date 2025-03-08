
import React,{ useContext} from 'react'
import { UserContext } from '../UserContext/usercontext'


// import AccountNavbar from './AccountNavabar'
export default function Account() {
  const {user} =useContext(UserContext)


  // check the user is login or not
  // got the problem while Refersh the page it move to login page 

  return (
    
   
        <div className="mt-6 text-center max-w-lg mx-auto ">
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
         
        </div>
    
     
  )
}
