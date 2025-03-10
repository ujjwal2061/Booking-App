import { Link, Navigate, useParams } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
// import AccountNavbar from "./AccountNavabar";
import axios from 'axios'
export default function PlacesPage(){
    const {action}=useParams()
    const [redirect,setRedirect]=useState(false)
    const [places ,setPlaces]=useState([])
if(redirect && action!=='new'){
    return <Navigate to={'/places/new'} />
}
useEffect(()=>{
    axios.get("/places",{withCredentials: true})
    .then(({data})=>{
    setPlaces(data)
    console.log(data)
    })
},[])
 return(
<div className="p-2">
 <div className="text-center">
  <Link className="inline-flex items-center gap-2  bg-black text-white py-2 px-4 rounded-full " 
       to={'/account/places/new'} >
       <FaPlus /> Add new</Link>
        </div>
        <div className="grid grid-cols-1 mt-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.length > 0 && places.map((place) => (
                    <Link
                        to={`/allplaces/places/${place._id}`}
                        key={place._id}
                        className="cursor-pointer border border-gray-300 bg-white rounded-lg  overflow-hidden transform  transition-transform duration-300">
                        <div className="flex flex-col p-4">
                          
                            <div className="w-full h-48 bg-gray-300 mb-4">
                                {place.photos?.length > 0 ? (
                                    <img
                                        src={place.photos[0].startsWith('http')
                                            ? place.photos[0]
                                            : `http://localhost:3000/uploads/${place.photos[0]}`}
                                        alt={place.title}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                ) : (
                                    <p className="text-center text-gray-500">No Image</p>
                                )}
                            </div>

                         
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
                    </div>
                 </div>
             </Link>
         ))}
    </div>
</div>
);
}