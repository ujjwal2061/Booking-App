import React, {  useState ,useContext} from 'react'
import { UserContext } from '../UserContext/usercontext';
import Homejpg from "../assets/Home.jpg"
import Moutainjpg from "../assets/Moutain.jpg"
import { CiSearch } from "react-icons/ci";
import { Navigate } from 'react-router';
export default function Home() {

  const [search,setSearch]=useState("")
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return <div className="h-screen flex justify-center items-center">
    <h1 className="text-xl sm:text-4xl md:text-5xl font-semibold underline text-center animate-fade-in-pulse">
      Homy Find Your Next House
    </h1>
  </div>
  }

  if (user) {
    return <Navigate to="/allplaces" replace />;
  }
  return (
    <section className="bg-white min-h-screen flex items-center">
    <div className='flex  flex-col md:flex-row justify-center items-center mt-2 px-4 md:px-10 py-10'>
      <div className='md:w-1/2 w-full px-4 md:px-10 py-8 text-center md:text-left'>
        <h1 className='text-4xl md:text-5xl font-serif'>Explore your <br />place to stay</h1>
        <p className='mt-4 font-serif text-gray-700'>
          Stay Beyond the Ordinary – From dreamy beachfront escapes to cozy cabins <br /> in the woods, find a stay that sparks joy.
        </p>
        <div className='mt-4 relative w-full md:w-72 mx-auto md:mx-0'>
          {!search && (
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
          )}
          <input 
            type="search" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className='w-full rounded-md  px-10 py-2 outline-none' 
            placeholder='Search places...'
          />
        </div>
        <div className='py-4 hidden md:block'>
          <h2 className='font-mono px-6 py-2 '>Be With Nature</h2>
          <div className='w-full md:w-1/2 flex   justify-center '>
            <img src={Moutainjpg} loading="lazy" alt="Nature" />
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/2 '>
        <img src={Homejpg} loading='lazy' className='w-full h-auto md:h-[600px] object-cover md:-mb-6 rounded-md' alt="Home" />
         <div className='bg-black mt-4 md:mt-9 flex justify-between px-6 rounded-lg py-2 text-white font-serif'>
          <h1>1,000+</h1>
          <p>Unique Places</p>
         </div>
        
      </div>
    </div>             
</section>
);
}
 