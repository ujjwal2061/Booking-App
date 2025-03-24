import { useState } from "react";
import {FaCloudUploadAlt} from "react-icons/fa";
import axios from 'axios';
import api from "../api";
export default function Photoupload({setPhotos}){
      const   [addPhoto,setaddPhoto]=useState([])
        const [photolnik,setLink]=useState("")
        // function to upload to photo by link
        const  uploadphotobylink=async(e)=>{
            e.preventDefault()
            try{
                const response=await  axios.post('/upload-by-links' ,{link:photolnik})
                const newphoto=response.data;
                 setaddPhoto((prev) => [...prev, newphoto]); /// -> slove the error at that photos store at inside array od the array 
                 setPhotos((prev) => [...prev, newphoto]);
                 console.log(newphoto)
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
        api.post('/upload',data,{
        }).then((response)=>{
            const {data:newphoto}=response;
            console.log(newphoto)
            setaddPhoto((prev) => [...prev, newphoto]); // -> slove the error at that photos store at inside array od the array 
            setPhotos((prev) => [...prev, ...newphoto]);
        }).catch((error)=>{
            console.log("Error at Upload",error);
    
        })
          
    }
    return(
        <>
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
                      `http://localhost:3000/upload/${link}`)}
                alt="Uploaded" 
                className="w-36 h-40 object-cover rounded-lg"  />
            </div>
        ))}
        
              <label className="border w-36 h-12 cursor-pointer   flex justify-center items-center  gap-2 bg-transparent rounded-xl px-2 py-4 shadow-sm text-slate-950 "> 
               <input type="file"   encType="multipart/form-data" className="hidden" onChange={uploadphoto}/>
                <FaCloudUploadAlt />
              Upload Photo</label> 
              </div>
        </>
    )
}