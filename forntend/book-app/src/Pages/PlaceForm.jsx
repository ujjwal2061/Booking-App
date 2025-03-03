import Preks from "./Perks";
import Photoupload from "./Photoupload";
import { useState } from "react";
import axios from "axios";

 export default  function PlaceFrom(){
    const [title,setTitle]=useState("")
      const [address,setAddress]=useState("")
      const [description,setDescription]=useState("")
      const [preks,setPreks]=useState([])
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
                preks,description,
                maxguests,extraInfo,
                checkIn,checkout}
                await axios.post("/places",placesData,{
                    withCredentials: true
                })
            }catch(error){
                console.log("Got the Error at the Sending part",error)
                throw error
            }
    }
    return (
        
 <div >
     <form onSubmit={hanleformsubmit}>
      <h2 className="text-2xl  font-serif">Title</h2>
      <p className="text-gray-500 text-sm">Title for Your Place,should</p>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title ,for example My lovely apt" />
      <h2 className="text-xl  font-serif mt-2">Address</h2>
      <p className="text-gray-500 text-sm">Address to this Place</p>
      <input type="text"  value={address} 
      onChange={(e)=>setAddress(e.target.value)}
      placeholder="Address" />
       <Photoupload />
       <h2 className="text-xl  font-serif">Description</h2>
      <p className="text-gray-500 text-sm ">Description of the Place</p>
      <textarea rows={3}  value={description} 
      onChange={(e)=>setDescription(e.target.value)} placeholder="Descripton about the place"/>
      <h2 className="text-xl  font-serif">Perkes</h2>
      <p className="text-gray-500 text-sm ">Slecte all  of the Pekers of Your Place</p>
        <div className="grid gap-2  grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <Preks selected={preks} onChanage={setPreks} />
        </div>
         <h2 className="text-xl  font-serif">Extra Info</h2>
          <p className="text-gray-500 text-sm ">House,Rules,etc</p>
          <textarea value={extraInfo}  onChange={(e)=>setExtraInfo(e.target.value)}/>
          <h2 className="text-xl  font-serif">Check out Time,max guests</h2>
          <p className="text-gray-500 text-sm ">Add check in and out times ,rember to have some time window for cleaning the room between guests!</p>
         <div className="grid gap-2 sm:grid-cols-3">
            <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input type="number" value={checkIn} 
                onChange={(e)=>setCheckIn(e.target.value)} placeholder="14:00"/>
            </div>
            <div>
            <h3>Check out time</h3>
                <input type="number"  value={checkout} 
                onChange={(e)=>setCheckOut(e.target.value)}/>
            </div>
            <div>
            <h3> Max number of guests</h3>
                <input type="text" value={maxguests} 
                onChange={(e)=>setMaxguests(e.target.value)} />
            </div>
             <div>
                <button className="bg-primary mt-4 hover:bg-pink-600 py-2 w-full px-10 font-semibold text-white rounded-full">Save</button>
             </div>
         </div>
    </form>
</div>
    )
}