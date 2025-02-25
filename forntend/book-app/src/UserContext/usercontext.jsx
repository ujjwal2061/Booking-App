import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext=createContext({})

export function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    useEffect(()=>{
     if(!user){
        axios.get('/profile',{withCredentials:true})
        .then(response=>setUser(response.data))
        .catch(err=>console.log("Error fetching profile",err))
     }
    },[user])
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

// Making the User Context API 