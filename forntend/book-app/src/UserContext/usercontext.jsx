import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext=createContext({})

export function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    const [ready,setReady]=useState(false)
      // got the problem while Refersh the page it move to login page 
      // it happen beacuse when it mount  it take some milesecond   to load account page so.
      
    useEffect(()=>{
     if(!user){
        axios.get('/profile',{withCredentials:true})
        .then(({data})=>{
            setUser(data)
            setReady(true)
        }).catch((error)=>{
            setUser(null);
            setReady(true)
            console.log(error)
      })    
        
     } 
    },[])
    return (
        <UserContext.Provider value={{user,setUser,ready,setReady}}>
            {children}
        </UserContext.Provider>
    )
}

// Making the User Context API 