 import React, { useCallback, useContext, useEffect, useState } from 'react'
 import {debounce} from "lodash"
 import { CiSearch } from "react-icons/ci";
 import { Link } from 'react-router';
 import { HiViewfinderCircle } from "react-icons/hi2";
import api from "../api"
import { BiLoaderAlt } from 'react-icons/bi';
 import { Bookingcontext } from '../UserContext/Bookingcontext';
import { IoCloseSharp } from "react-icons/io5";
 export default function Allplaces(){
  
      const [allplaces,setAllplaces]=useState([]);
      const [search,setSearch]=useState("");
      const {setBookinglist}=useContext(Bookingcontext);
      const [error,setError]=useState(false);
      const [currentpage,setCurrnetpage]=useState(1);
      const [totalpage,setTotalpage]=useState(1);
      const [loading,setLoading]=useState(false);
      const [activeimages,setActiveImages]=useState(null);
      const [booking,setBooking]=useState(false)
      useEffect(()=>{
        setLoading(true)
        api.get("/allplaces",{
          withCredentials: true,
          params:{page:currentpage,limit:5}
        })
           .then(response=>{
             setAllplaces(response.data.places)
             setTotalpage(response.data.totalpage)
            }).catch(error=>{
              setError(error)
              
            }).finally(()=>{
              setLoading(false)
              setError(false)
            })
          },[currentpage])
          // handle the page change
          const chnagepage=()=>{
            if(currentpage < totalpage){
              setCurrnetpage(currentpage+1)
            }
          }
          const backpage=()=>{
            if(currentpage>1){
              setCurrnetpage((prevpage)=>prevpage-1)
            }
          }
          //->image open
          const toggleactive=(id)=>{
               if(activeimages===id){
               
                setActiveImages(null)
               }else{
               
                setActiveImages(id)
               }
          }
          const  closeActiveimage=()=>{
            setActiveImages(null)
          }
          // Have to read and Write again this code 
          const searchplaces = useCallback(
            debounce(async (searchTerm) => {
              try {
                const response = await api.get("/get-places", {
                  params: { search: searchTerm },
                  withCredentials: true,
            });
            setAllplaces(response.data.result); 
          } catch (error) {
            setError(error.data.msg)
          }
        }, 500),
        [search] 
      );
      useEffect(() => {
        if (search.trim() === "") {
          setAllplaces([]); 
          return;
        }
        searchplaces(search);
      }, [search, searchplaces]);
  // booking route
  const bookpalces=async(placeID)=>{
    try{
      setBooking(true)
      const palces=({placeId:placeID})
      const response =await api.post("/saves",palces,{
        withCredentials: true
      })
      if (response==200) {
        setSaved(true);
        setBookinglist(response.data)
        console.log("✔️ Saved:", response.data);
      } else {
        console.error("❌ Save failed with status:", response.status);
      }
    } catch (error) {
      console.error("Save failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }
      return(
    <section className={` min-h-screen px-3 py-7`}>
      <div className='flex py-2   justify-center  items-center w-full'>
         <div className='relative   mx-auto md:mx-0'>
          {!search && (
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
          )}
          <input  type="search" value={search} onChange={(e) => {
            setSearch(e.target.value)
            searchplaces(e.target.value)
          }}
          className='md:w-96 rounded-md  px-10 py-2 outline-none' 
          placeholder='Search places...'/>
        </div>
      </div>
    <div className="grid  grid-cols-1   sm:grid-cols-2  lg:flex lg:px-40 lg-py-12 lg:flex-col gap-6  p-4">
     {loading ? (
       <p className='text-gray-800 text-center flex flex-row  items-center '>Geeting Your place <BiLoaderAlt className="animate-spin mt-1 " /> </p>
      ):( allplaces.map((place) => (
      <div
       className="  cursor-pointer  lg:px-15  rounded-md   lg:w-full transform transition duration-300  " >
           <div className="w-full  h-60  overflow-hidden rounded-t-md">
           <div className=' relative h-full '>
             <img
             src={place.photos?.[0]?.url}
             alt={place.title}
             className="w-full  h-full object-cover rounded-t-md"
             onError={(e) => {
               e.target.src = 'https://booking-app-afjh.vercel.app/default-image.jpg';
              }}
              />
              <button
              onClick={()=>toggleactive(place._id)} 
              className='absolute  text-white right-2  bottom-2 '>
                <HiViewfinderCircle size={25}  className='hover:scale-110 duration-300  hover:text-black '/></button>
              </div>
            </div>
            <div className="p-4 flex flex-col  flex-grow  bg-white gap-2">
            <Link to={`/allplaces/places/${place._id}`} >
            <h2 className="text-lg font-semibold text-gray-900">{place.title}</h2>
            <p className="text-gray-600 text-sm">{place.address}</p>
            <p className="text-gray-700 mt-2  min-h-[50px] text-sm">
            {place.description.substring(0, 200)}...
            </p>
            <p className="text-gray-700 mt-2 font-serif text-xs">{place.extraInfo.substring(0,160)}...</p>
            <p className="text-gray-700 mt-2 font-serif text-sm">
            <strong>Check-in Time:</strong> {place.checkIn}:00
            </p>
              </Link>
            <div>
            <button 
            onClick={()=>bookpalces(place._id)}
            // onClick={(event)=>handleBookhng(event,place)} 
            className='px-5 bg-black  w-32 md:w-32 py-1 hover:bg-gray-600 text-center rounded-md  text-white'>
              {booking===place._id ? "Booking..." :"Book Now"}
              </button>
              </div>
            </div>
          </div>
           
          ))
        )}
  </div>
   {error &&<p className='text-red-600 text-center'>{error.msg}</p>}
  <div className=' flex  flex-row justify-center items-center gap-5 py-2 px-7'>
    <button onClick={backpage}
    disabled={currentpage === 1}
     className='bg-gray-300 text-black px-4  font-mono py-2 rounded-md text-center'>Previous</button>
     <p className='font-serif'>{currentpage}</p>
    <button onClick={chnagepage}
    disabled={currentpage===totalpage}
    className='bg-gray-300 text-black px-4  py-2  font-mono rounded-md text-center' >Next</button>
  </div>
     
  {activeimages && (
        <div  className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"   onClick={closeActiveimage} >
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden" 
            onClick={(e) => e.stopPropagation()} >
            {allplaces.find(place => place._id === activeimages) && (
              <img src={allplaces.find(place => place._id === activeimages)?.photos?.[0]?.url}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = 'https://booking-app-afjh.vercel.app/default-image.jpg';
                }} />
            )}
            <button onClick={closeActiveimage}
              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all duration-300"  >
              <IoCloseSharp size={24} />
            </button>
          </div>
        </div>
      )}
    </section> 
    )
 }
 