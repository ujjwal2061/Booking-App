import { createContext, useState ,useEffect} from "react";
export const Bookingcontext=createContext()
import api from "../api";
export function BookingcontextProvider({children}){
    const [error ,setbookingError]=useState("")
    const [bookinglist,setBookinglist]=useState([])
   useEffect(() => {
     api.get("/bookmarks",{
    withCredentials: true,
   })
   .then(response=>{
   setBookinglist(response.data)   
   }).catch(error=>{
     setbookingError(error)
   }).finally(()=>{
     setbookingError(false)
   })
}, []);
    return(
    <Bookingcontext.Provider value={{bookinglist ,setBookinglist ,setbookingError,error}} >
            {children}
    </Bookingcontext.Provider>

    )
}