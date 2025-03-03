import { Link, Navigate, useParams } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import AccountNavbar from "./AccountNavabar";

export default function PlacesPage(){
    const {action}=useParams()
    const [redirect,setRedirect]=useState(false)
    
if(redirect && action!=='new'){
    return <Navigate to={'/places/new'} />
}
 return(
<div>
     <AccountNavbar />
       <div className="text-center">
       <Link className="inline-flex items-center gap-2  bg-primary text-white py-2 px-4 rounded-full " 
       to={'/account/places/new'} >
       <FaPlus /> Add new</Link>
          </div>
    
  
    </div>
)}