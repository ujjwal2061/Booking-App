import { Link, Navigate, useParams } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import AccountNavbar from "./AccountNavabar";
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
    })
},[])
 return(
<div>
     <AccountNavbar />
       <div className="text-center">
       <Link className="inline-flex items-center gap-2  bg-primary text-white py-2 px-4 rounded-full " 
       to={'/account/places/new'} >
       <FaPlus /> Add new</Link>
        </div>
        <div className="mt-2  flex-col  px-2 py-2  bg-gray-600">
       {places.length >0 &&places.map((place)=>(
        <Link to={`/account/places/${place._id}`} key={place._id} className="cursior-ponter" >
         <div  className=" flex  m-2  border-2 rounded-md">
               <div className="w-32 h-32  bg-gray-300">
               
                {/* <img src={place.photos[0]} /> */}
                {place.photos?.length > 0 ?(
                    <img src={
                        place.photos[0].startsWith('http') ?place.photos[0] :
                        `http://localhost:3000/uploads/${place.photos[0]}`} alt={place.title} className="w-full h-full object-cover" />
                ):(<p className="text-center text-gray-500">No Image</p>)}
                </div>
               <p>{place.title}</p>
               <p>{place.address}</p>
               {place.perks?.map((perk, index) => (
            <div 
              key={index}
              className="flex items-center bg-gray-100 p-2 rounded-md"
            >
           
              <span className="capitalize">{perk}</span>
            </div>
          ))}
            </div>
            </Link>
       ))}
       </div>
    </div>
)}