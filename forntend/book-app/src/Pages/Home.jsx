import React, {  useState ,useContext} from 'react'
import { UserContext } from '../UserContext/usercontext';
import { MapPin ,Users,CalendarCheck } from 'lucide-react';
import Homejpg from "../assets/Home.jpg"
import Moutainjpg from "../assets/Moutain.jpg"
import { CiSearch } from "react-icons/ci";
import { Navigate } from 'react-router';
export default function Home() {

  const [search,setSearch]=useState("")
  const { user, } = useContext(UserContext);

  if (user) {
    return <Navigate to="/allplaces" replace />;
  }
  // object list 
  const herosectionList=[
    {
      icons:<MapPin />,
      text:"Where",
      desc:"Search destinations"
    },
      {
      icons:<CalendarCheck />,
      text:"Check in",
      desc:"Add dates"
    },
      {
      icons:<CalendarCheck />,
      text:"Check out",
      desc:"Add dates"
    },
      {
      icons:<Users />,
      text:"Who",
      desc:"Add guests"
    },
  ]

  return (
    <section className="min-h-screen flex py-4">
      <div className='w-full'>
        <div className='relative border-2'>
          <img 
            src="HomeImage.png" 
            className='blur-[1px] object-cover w-full h-64 sm:h-80 md:h-96 lg:h-[500px]' 
            alt="Home background"
          />
          <div className='absolute top-[20%] sm:top-[25%] md:top-[30%] justify-center items-center flex w-full px-4'>
            <div className='flex flex-col text-white gap-1 text-center'>
              <h1 className='font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight'>
                Find your next adventure
              </h1>
              <p className='font-medium text-sm sm:text-base md:text-lg'>
                Discover amazing places to stay around the world
              </p>
            </div>
          </div>
          <div className='flex absolute top-[55%] sm:top-[50%] md:top-[50%] justify-center w-full px-2 sm:px-4 md:px-6'>
            <div className='bg-[#f3f3f2] border-transparent px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-[10px] w-full max-w-4xl'>
              <div className='hidden sm:flex bg-[#ffffff] gap-2 px-4 py-2 md:px-6 md:py-3 rounded-md'>
                {herosectionList.map((item, idx) => (
                  <div 
                    key={idx} 
                    className='flex cursor-pointer rounded-2xl px-2 py-2 gap-2 hover:bg-slate-200 transition-all ease-out flex-1'
                  >
                    <p className='text-center flex items-center'>{item.icons}</p>
                    <div className='flex flex-col items-start p-1'>
                      <h4 className='font-semibold text-sm md:text-base'>{item.text}</h4>
                      <p className='text-xs md:text-sm text-gray-600'>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='sm:hidden bg-[#ffffff] rounded-md p-3'>
                <div className='grid grid-cols-2 gap-2'>
                  {herosectionList.map((item, idx) => (
                    <div 
                      key={idx} 
                      className='flex cursor-pointer rounded-lg px-2 py-3 gap-2 hover:bg-slate-200 transition-all ease-out'
                    >
                      <p className='text-center flex items-center text-sm'>{item.icons}</p>
                      <div className='flex flex-col items-start'>
                        <h4 className='font-semibold text-sm'>{item.text}</h4>
                        <p className='text-xs text-gray-600'>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='mt-3 pt-2 border-t border-gray-200'>
                  <button className='w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition-colors'>
                    <CiSearch size={20} />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    {/* <div className='flex  flex-col md:flex-row justify-center items-center mt-2 px-4 md:px-10 py-10'>
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
    </div>              */}
</section>
);
}
 