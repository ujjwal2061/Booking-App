import { useParams } from "react-router";
import { useEffect, useState } from "react";
import  Description from "./Description"
import api from "../api";
import { HiViewfinderCircle } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
export default function PlaceDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage,setActiveImage]=useState(null)
  useEffect(() => {
    if (!id) return;
    api.get("/places/" + id).then((response) => {
      setData(response.data);
      console.log(response.data)
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }
//->Showing image
  const shoewactiveImage=(id)=>{
   setActiveImage(id)
  }
  // for closeImage
  const closeActiveImage=()=>{
    setActiveImage(null)
  }
  const getActivePhoto = () => {
    if (!activeImage || !data.photos) return null;
    return data.photos.find(photo => photo._id === activeImage);
  };
  return (
    <div className="max-w-4xl   text-black mx-auto px-4 py-8">
      <div className="w-full">
             <img src={data.photos?.[0]?.url}
              alt={data.title}
              className="w-full  h-full object-cover rounded-t-md"
              onError={(e) => {
                e.target.src = 'https://booking-app-afjh.vercel.app/default-image.jpg';
              }}
              />
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-semibold ">{data.title}</h1>
        <p className="text-gray-500">{data.address}</p>
      </div>

      <div className="mt-4">
      <Description description={data.description} />
        <p className="text-gray-600 italic mt-2">{data.extraInfo}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Perks</h3>
        <ul className="flex flex-col  gap-2 mt-1">
          {data.perks.map((perk, index) => (
            <li
              key={index}
              className="px-3 py-1 rounded-md text-sm text-gray-700"
            >
              {`->${perk}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">
          <strong>Check-in Time:</strong> {data.checkIn}:00
        </p>
      </div>   
      {data.photos.length > 1 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {data.photos.slice(1).map((photo) => (
            <div className="break-inside-avoid relative" key={photo._id}>   
             <img
              src={photo.url}
              alt={data.title}
              className="w-full  h-full object-cover rounded-t-md"
              onError={(e) => {
                e.target.src = 'https://booking-app-afjh.vercel.app/default-image.jpg';
              }}
              />
              <button onClick={()=>shoewactiveImage(photo._id)} 
              className='absolute  text-white right-2  bottom-2 '>
               <HiViewfinderCircle size={25}  className='hover:scale-110 duration-300  hover:text-black '/></button>
            </div>
          ))}
        </div>
      )}
      {activeImage && (
        <div  className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"   onClick={closeActiveImage} >
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden" >
          {getActivePhoto() &&(
             <img  src={getActivePhoto()?.url} 
             className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = 'https://booking-app-afjh.vercel.app/default-image.jpg';
                }} />
          )
        }
        <button onClick={closeActiveImage}
            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full text-white transition-all duration-300"  >
            <IoCloseSharp size={24} />
          </button>
        </div>
        </div>
      )}
    </div>
  );
}
