import { createContext, useState ,useEffect} from "react";

export const Bookingcontext=createContext()

export function BookingcontextProvider({children}){
    const [booking,setBooking]=useState(()=>{
        const stroedBooking=localStorage.getItem("booking");
  return stroedBooking ? JSON.parse(stroedBooking):[] 
   })
   useEffect(() => {
    localStorage.setItem("booking", JSON.stringify(booking));
}, [booking]);

const removeBookingList=(placeID)=>{
    setBooking((prevPlace)=>prevPlace.filter((places)=>places._id !==placeID))
   }
const clearBookinglist=()=>{
    localStorage.removeItem("booking")
    setBooking([])
}
    return(
    <Bookingcontext.Provider value={{booking ,setBooking ,clearBookinglist,removeBookingList}} >
            {children}
    </Bookingcontext.Provider>

    )
}