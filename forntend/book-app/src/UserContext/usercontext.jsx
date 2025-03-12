import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext=createContext({})

export function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    const [ready,setReady]=useState(false)
    const [loading, setLoading] = useState(true);

      // got the problem while Refersh the page it move to login page 
      // it happen beacuse when it mount  it take some milesecond   to load account page so.
      
    useEffect(()=>{
        const cookies=document.cookie.includes('auth_token=')
     if(cookies){
        setLoading(true)
        axios.get('/profile',{withCredentials:true})
        .then(({data})=>{
           
            setUser(data)
            setReady(true)
            setLoading(false);
        }).catch((error)=>{
            setUser(null);
            setReady(true)
            console.log(error)
        }) 
        
    }else{
        setUser(null);
        setReady(true);
        setLoading(false);
    }   
    },[])
    return (
        <UserContext.Provider value={{user,setUser,ready,loading ,setReady}}>
            {children}
        </UserContext.Provider>
    )
}

// Making the User Context API 