import { useParams } from "react-router";
import { useEffect, useState } from "react";
import  Description from "./Description"
import api from "../api";
export default function PlaceDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get("/places/" + id).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="w-full">
    
             <img
             src={data.photos?.[0]?.url}
              alt={data.title}
              className="w-full  h-full object-cover rounded-t-md"
              onError={(e) => {
                e.target.src = 'https://booking-app-afjh.vercel.app/default-image.jpg';
              }}
              />
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-semibold text-gray-800">{data.title}</h1>
        <p className="text-gray-500">{data.address}</p>
      </div>

      <div className="mt-4">
      <Description description={data.description} />
        <p className="text-gray-600 italic mt-2">{data.extraInfo}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Perks:</h3>
        <ul className="flex gap-2 mt-1">
          {data.perks.map((perk, index) => (
            <li
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-md text-sm text-gray-700"
            >
              {perk}
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
          {data.photos.slice(1).map((photo, index) => (
            <div className="break-inside-avoid" key={index}>   
            
             <img
             src={photo.url}
              alt={data.title}
              className="w-full  h-full object-cover rounded-t-md"
              onError={(e) => {
                e.target.src = 'https://booking-app-afjh.vercel.app/default-image.jpg';
              }}
              />
          </div>
          ))}
        </div>
      )}
    </div>
  );
}
