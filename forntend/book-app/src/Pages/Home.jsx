import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Home() {
  const [allplaces,setAllplaces]=useState([])
  useEffect(()=>{
   axios.get("http://localhost:3000/home")
      .then(response=>{
       
        setAllplaces(response.data)
      }).catch(error=>{
        console.log("Errro at Feting",error)
  })

console.log(allplaces)
  },[])
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">All Places</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {allplaces.length > 0 ? (
        allplaces.map((place) => (
          <div key={place._id} className="border rounded-lg p-3 shadow-lg">
            {place.photos?.length > 0 ?(
                    <img src={
                        place.photos[0].startsWith('http') ?place.photos[0] :
                        `http://localhost:3000/uploads/${place.photos[0]}`} alt={place.title} className="w-full h-full object-cover" />
                ):(<p className="text-center text-gray-500">No Image</p>)}
            <h2 className="text-xl font-semibold mt-2">{place.title}</h2>
            <p className="text-gray-600">{place.address}</p>
            <p className="text-gray-800 mt-1">{place.description.substring(0, 60)}...</p>
          </div>
        ))
      ) : (
        <p>No places found.</p>
      )}
    </div>
  </div>
);
}
 