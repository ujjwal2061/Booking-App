import { Link, useParams } from "react-router";
import { FaPlus } from "react-icons/fa";
import {FaCloudUploadAlt} from "react-icons/fa";
import { useState } from "react";
import Preks from "./Perks";
import axios from 'axios';
export default function PlacesPage(){
    const {action}=useParams()
    const [title,setTitle]=useState("")
    const [address,setAddress]=useState("")
    const [description,setDescription]=useState("")
    const [addPhoto,setaddPhoto]=useState([])
    const [photolnik,setLink]=useState("")
    const [preks,setPreks]=useState([])
    const [extraInfo,setExtraInfo]=useState("");
    const [checkIn,setCheckIn]=useState("");
    const [checkout,setCheckOut]=useState("");
    const [maxguests,setMaxguests]=useState(1)
    
    // function to upload to photo by link
     const  uploadphotobylink=async(e)=>{
        e.preventDefault()
        try{
            const response=await  axios.post('/upload-by-links' ,{link:photolnik})
            const newphoto=response.data;
             setaddPhoto((prev) => [...prev, newphoto]);
                setLink("")
            }catch(error){
                console.error("Upload failed:", error.response ? error.response.data : error.message);
    
            }
    }
    // for the upload photo
    function uploadphoto(event){
    const files=event.target.files;
    const data=new FormData()
    for(let i=0; i<files.length;i++){
        data.append('photos',files[i]);
    }
    axios.post('/upload',data,{
    // headers:{'Content-Type':'multipart/form-data'}
    }).then((response)=>{
        const {data:newphoto}=response;
        setaddPhoto((prev) => [...prev, ...newphoto]);
    }).catch((error)=>{
        console.log("Error at Upload",error);

    })
      
}
 return(
<div>
    {action !=='new'&&(
       <div className="text-center">
       <Link className="inline-flex items-center gap-2  bg-primary text-white py-2 px-4 rounded-full " to={'/account/places/new'} >
       <FaPlus /> Add new</Link>
          </div>
    ) }
   {action === 'new' && (
  <div >
     <form >
      <h2 className="text-2xl  font-serif">Title</h2>
      <p className="text-gray-500 text-sm">Title for Your Place,should</p>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title ,for example My lovely apt" />
      <h2 className="text-xl  font-serif mt-2">Address</h2>
      <p className="text-gray-500 text-sm">Address to this Place</p>

      <input type="text"  value={address} 
      onChange={(e)=>setAddress(e.target.value)}
      placeholder="Address" />

      <h2 className="text-xl mt-2  font-serif">Photo</h2>
      <p className="text-gray-500 text-sm ">Photo of this Place </p>

      <div className="flex gap-2 items-center ">
        <input type="text" value={photolnik} 
        onChange={(e)=>setLink(e.target.value)} placeholder={"Add using link...... jpg"} />
        <button  onClick={uploadphotobylink}
        className="bg-gray-300 h-12 w-auto  px-6  rounded-2xl ">Add&nbsp;Photo</button>
      </div>

          <div className="mt-2 grid items-center  grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {addPhoto.length > 0 && addPhoto.map((link, index) => (
          <div key={index} className="py-2 px-2 ">
         <img   src={link.includes('http') ? link : 
             (link.includes('.jpg') ? `http://localhost:3000/images/${link}` : 
              `http://localhost:3000/uploads/${link}`)}
        alt="Uploaded" 
        className="w-36 h-40 object-cover rounded-lg"  />
    </div>
))}

      <label className="border w-36 h-12 cursor-pointer   flex justify-center items-center  gap-2 bg-transparent rounded-xl px-2 py-4 shadow-sm text-slate-950 "> 
       <input type="file"   encType="multipart/form-data" className="hidden" onChange={uploadphoto}/>
        <FaCloudUploadAlt />
      Upload Photo</label> 
      </div>
      <h2 className="text-xl  font-serif">Description</h2>
      <p className="text-gray-500 text-sm ">Description of the Place</p>
      <textarea rows={3}  value={description} 
      onChange={(e)=>setDescription(e.target.value)} placeholder="Descripton about the place"/>
      <h2 className="text-xl  font-serif">Perkes</h2>
      <p className="text-gray-500 text-sm ">Slecte all  of the Pekers of Your Place</p>
        <div className="grid gap-2  grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <Preks selected={preks} onChnage={setPreks} />
        </div>
         <h2 className="text-xl  font-serif">Extra Info</h2>
          <p className="text-gray-500 text-sm ">House,Rules,etc</p>
          <textarea value={extraInfo}  onChange={(e)=>setExtraInfo(e.target.value)}/>
          <h2 className="text-xl  font-serif">Check out Time,max guests</h2>
          <p className="text-gray-500 text-sm ">Add check in and out times ,rember to have some time window for cleaning the room between guests!</p>
         <div className="grid gap-2 sm:grid-cols-3">
            <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input typ ="number" value={checkIn} 
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
 )}
    </div>
 )
}