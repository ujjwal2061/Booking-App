
import { createContext, useEffect, useState } from "react";
import api from "../api";
export const UserContext=createContext({})

export function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    const [ready,setReady]=useState(false)
    const [loading, setLoading] = useState(true);
    const[error,setError]=useState(false)
      // got the problem while Refersh the page it move to login page 
      // it happen beacuse when it mount  it take some milesecond   to load account page so.
      
    useEffect(()=>{
        // const cookies=document.cookie.includes('auth_token=')
    //  if(cookies){
        setLoading(true)
        api.get('/profile',{withCredentials:true})
        .then(({data})=>{
            console.log("Data",data)
            setUser(data)
        })
        .catch((error)=>{
            setUser(null);
            setError(error)
        }) 
        .finally(()=>{
        
            setReady(true)
            setLoading(false);

        })
       
    },[])
    return (
        <UserContext.Provider value={{user,setUser,ready,loading ,setReady,error}}>
            {children}
        </UserContext.Provider>
    )
}

// Making the User Context API 