
import { createContext, useState } from "react";

export const UserContext=createContext({})

export function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    const [ready,setReady]=useState(false)
    const [loading, setLoading] = useState(true);
    const[error,setError]=useState(false)
     
    const value={
        user,setUser,
        setError,
        setLoading,
        ready,
        loading ,
        setReady,
        error
       }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

// Making the User Context API 