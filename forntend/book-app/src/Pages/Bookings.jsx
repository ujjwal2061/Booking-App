import { useContext } from "react"

import { Bookingcontext } from "../UserContext/Bookingcontext"
import {Link} from "react-router"


export  default function(){
 const {bookinglist ,}=useContext(Bookingcontext)
 console.log(bookinglist)
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:flex lg:px-40 lg:flex-col gap-6  p-4">
       {bookinglist.length > 0 ? ( bookinglist.map((place) => (
          <Link to={`/allplaces/places/${place._id}`} key={place._id}
             className="cursior-ponter  lg:px-10  rounded-md w-full transform transition duration-300 ">
              <div className="w-full h-52  md:h-60 lg:h-[400px] overflow-hidden rounded-t-md">
                      {place.photos?.length > 0 ? (
                          <img
                              src={place.photos[0].startsWith('https')
                                  ? place.photos[0]
                                  : `https://booking-app-afjh.vercel.app/uploads/${place.photos[0]}`}
                              alt={place.title}
                              className="w-full h-full object-cover rounded-t-md"
                          />
                      ) : (
                          <p className="text-center text-gray-500">No Image</p>
                      )}
                  </div>
                  <div className="p-4 flex flex-col bg-white gap-2">
                  <h1 className="text-xl font-semibold capitalize mb-2">{place.title}</h1>
                  <span className="flex gap-2 text-sm text-gray-700 font-semibold">
                      Address:
                      <p className="text-gray-800 font-normal text-base">{place.address}</p>
                  </span>
                  <p className="text-gray-900 font-serif mt-2 text-sm">{place.description.substring(0, 100)}...</p>
                  <p className="text-gray-700 mt-2 font-serif text-xs">{place.extraInfo}</p>
                  <p className="text-gray-700 mt-2 font-serif text-sm">
                      <strong>Check-in Time:</strong> {place.checkIn}:00
                  </p>
                <div className="flex flex-wrap mt-4 gap-2">
                      {place.perks?.map((perk, index) => (
              <div key={index} className="flex items-center justify-center bg-gray-200 px-3 py-1 rounded-md text-xs text-gray-700">
          {perk}
          </div>
          ))}
            <button onClick={(event)=>{
                event.preventDefault(); 
                event.stopPropagation();
                removeBookingList(place._id)
            }} className='px-5 bg-black w-40 py-1 hover:bg-gray-600 text-center rounded-md  text-white'>Remove Booking</button>
          </div>
         </div>
       
   </Link>
))):(
    <p>Yet No Booking</p>
)} 
</div>
)} 