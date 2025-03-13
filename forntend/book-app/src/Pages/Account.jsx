
import React,{ useContext, useEffect, useRef, useState} from 'react'
import { UserContext } from '../UserContext/usercontext'
import DiscordImg from "../assets/discord.jpeg"
export default function Account() {
  const ImageRef=useRef(null)
  const [profileImage,setprofileImage]=useState("")
  const {user} =useContext(UserContext)

 useEffect(()=>{
  const savaImage= localStorage.getItem("userImage")
  if(savaImage){
    setprofileImage(savaImage)
  }
 },[])

 const uploadeimage=async(event)=>{
  event.preventDefault();
  try{
    const file=event.target.files[0];
    if(!file) return
  const userimage=new FileReader()
  userimage.onload=(e)=>{
    const imageData=e.target.result
    setprofileImage(imageData)
    localStorage.setItem("userImage",imageData)
  }
  userimage.readAsDataURL(file)
  }catch(error){
    console.log("Error at uplading Image",error)
  }
}


  return (
        <div className=" flex flex-col mt-6  max-w-[600px]  mx-auto ">
          <div className='flex flex-col  gap-2 rounded-sm   px-3 py-1 '>
          <div
           onClick={()=>ImageRef.current.click()}
          className="relative w-full max-w-4xl group  cursor-pointer px-2 py-2">
               <input type="file" className="hidden" ref={ImageRef} onChange={uploadeimage}  accept="image/*"/>
                <img  src={profileImage ||  DiscordImg} className=' w-full h-64 object-cover rounded-lg group-hover:opacity-40 transition-opacity' />
                <div className='absolute inset-0 flex items-center justify-center text-black  opacity-0 group-hover:opacity-50 '>
                  <span className=' px-2  rounded-lg bg-opactiy-20  bg-slate-200 tracking-tighter font-sans font-semibold'>Change Cover photo</span>
                </div>
             </div>
          <div className='flex bg-white rounded-sm flex-col px-5 gap-4  py-2'>
          <h2 className=' bg-slate-200 px-3 rounded-md md:w-1/2  py-1  font-mono'>UserName:{user?.name}</h2>
          <p className='bg-slate-200 px-3 rounded-md md:w-1/2  py-1  font-mono'>Email: {user?.email}</p>
          </div>
          </div>
        </div>
    
     
  )
}
