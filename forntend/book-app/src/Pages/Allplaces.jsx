
 import React, { useEffect, useState } from 'react'
 import AccountNavbar from './AccountNavabar';
 import { CiSearch } from "react-icons/ci";
 import axios from 'axios'
 export default function Allplaces(){
      const [allplaces,setAllplaces]=useState([])
    const [search,setSearch]=useState("")
    useEffect(()=>{
        axios.get("http://localhost:3000/allplaces")
           .then(response=>{
             setAllplaces(response.data)
           }).catch(error=>{
             console.log("Errro at Feting",error)
       })
       },[])
    return(
    <section className='px-3 py-7'>
      <div className='flex py-2   justify-center items-center w-full '>
         <div className='relative   mx-auto md:mx-0'>
          {!search && (
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
          )}
          <input 
            type="search" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className='md:w-96 rounded-md  px-10 py-2 outline-none' 
            placeholder='Search places...'
            />
        </div>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    {allplaces.length > 0 ? (
      allplaces.map((place) => (
        <div
        key={place._id}
        className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          {place.photos?.length > 0 ? (
            <img
            src={
              place.photos[0].startsWith("http")
              ? place.photos[0]
              : `http://localhost:3000/uploads/${place.photos[0]}`
            }
            alt={place.title}
            className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">No Image</p>
            </div>
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900">{place.title}</h2>
            <p className="text-gray-600 text-sm">{place.address}</p>
            <p className="text-gray-700 mt-2 text-sm">
              {place.description.substring(0, 60)}...
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 col-span-full">No places found.</p>
    )}
  </div>
    </section> 
    )
 }
 