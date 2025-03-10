import Preks from "./Perks";
import Photoupload from "./Photoupload";
import {  useState } from "react";
import axios from "axios";


 export default  function PlaceFrom(){
   
      const [title,setTitle]=useState("")
      const [address,setAddress]=useState("")
      const [description,setDescription]=useState("")
      const [photos,setPhotos]=useState([])
      const [perks,setPerks]=useState([])
      const [extraInfo,setExtraInfo]=useState("");
      const [checkIn,setCheckIn]=useState("");
      const [checkout,setCheckOut]=useState("");
      const [maxguests,setMaxguests]=useState(1)

      // function for handleing the form action 
      const hanleformsubmit=async(event)=>{
        event.preventDefault()
        try{
            const placesData={
                title, address,
                perks:perks,description,
                photos:photos,
                maxguests: maxguests,extraInfo,
                checkIn,checkOut:checkout}
                await axios.post("/places",placesData,{
                    withCredentials: true
                })
            }catch(error){
                console.log("Got the Error at the Sending part",error)
                throw error
            }
    }
 
 
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={hanleformsubmit} className="bg-white rounded-md p-6 md:p-8 ">
          <h2 className="text-2xl font-serif font-medium text-gray-800">Title</h2>
          <p className="text-gray-500 text-sm mb-2">Title for Your Place, should be catchy and attractive</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title, for example: My lovely apt"
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-6 transition-all"
          />
  
          <h2 className="text-xl font-serif font-medium text-gray-800">Address</h2>
          <p className="text-gray-500 text-sm mb-2">Address to this Place</p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-6 transition-all"
          />
  
          <div className="my-6">
            <Photoupload setPhotos={setPhotos} />
          </div>
  
          <h2 className="text-xl font-serif font-medium text-gray-800">Description</h2>
          <p className="text-gray-500 text-sm mb-2">Description of the Place</p>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description about the place"
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-6 transition-all"
          />
  
          <h2 className="text-xl font-serif font-medium text-gray-800 mt-6">Perks</h2>
          <p className="text-gray-500 text-sm mb-2">Select all of the Perks of Your Place</p>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 my-4 mb-6">
            <Preks selected={perks} onChange={setPerks} />
          </div>
  
          <h2 className="text-xl font-serif font-medium text-gray-800 mt-6">Extra Info</h2>
          <p className="text-gray-500 text-sm mb-2">House Rules, etc</p>
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            placeholder="Additional information guests should know"
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none mb-6 transition-all"
          />
  
          <h2 className="text-xl font-serif font-medium text-gray-800 mt-6">Check Times & Max Guests</h2>
          <p className="text-gray-500 text-sm mb-4">Add check in and out times, remember to have some time window for cleaning the room between guests!</p>
          
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mt-2 mb-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Check in time</h3>
              <input
                type="number"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="14:00"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            
      <div>
              <h3 className="font-medium text-gray-700 mb-2">Check out time</h3>
              <input
                type="number"
                value={checkout}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="11:00"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Max number of guests</h3>
              <input
                type="text"
                value={maxguests}
                onChange={(e) => setMaxguests(e.target.value)}
                placeholder="4"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
  
          <div className="mt-8 flex justify-center">
            <button className="bg-black hover:bg-gray-800 transition-all duration-200 py-3 px-10 font-semibold text-white rounded-full w-96 md:w-72 sm:w-auto shadow-md transform hover:-translate-y-1 active:translate-y-0">
              Save
            </button>
          </div>
        </form>
      </div>
    )
}