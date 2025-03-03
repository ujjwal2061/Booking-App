import { Link, Navigate, useParams } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import AccountNavbar from "./AccountNavabar";
import axios from 'axios'
export default function PlacesPage(){
    const {action}=useParams()
    const [redirect,setRedirect]=useState(false)
    const [palces,setPlaces]=useState([])
if(redirect && action!=='new'){
    return <Navigate to={'/places/new'} />
}
useEffect(()=>{
    axios.get("/places",{withCredentials: true})
    .then(({data},)=>{
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
       {palces.length >0 &&palces.map((element,index)=>(
        <Link to={'/account/places/'+element._id} className="cursior-ponter" >
         <div key={index} className=" flex  m-2  border-2 rounded-md">
               <div className="w-32 h-32  bg-gray-300">
                {element.photos[0]}
                </div>
               <p>{element.title}</p>
               <p>{element.address}</p>
            </div>
            </Link>
       ))}
       </div>
    </div>
)}