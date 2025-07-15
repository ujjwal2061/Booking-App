import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext/usercontext";
import { MapPin, Users, CalendarCheck, Hotel, BrushCleaning, ArrowRight } from "lucide-react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { Navigate } from "react-router";
import { ClipboardList, BookOpen } from "lucide-react";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  if (user) {
    return <Navigate to="/allplaces" replace />;
  }

  const herosectionList = [
    { icons: <MapPin className="text-[#175156]" />, text: "Where", desc: "Search destinations" },
    { icons: <CalendarCheck className="text-[#175156]" />, text: "Check in", desc: "Add dates" },
    { icons: <CalendarCheck className="text-[#175156]" />, text: "Check out", desc: "Add dates" },
    { icons: <Users className="text-[#175156]" />, text: "Who", desc: "Add guests" },
  ];

  const obj = [
    {
      icons: <Hotel />,
      name: "Best pricing",
      desc: "Book directly for exclusive discounts and the lowest prices",
    },
    {
      icons: <BrushCleaning />,
      name: "Expert Cleaning",
      desc: "Enjoy a completely cleaned and inspected home, plus fresh linens",
    },
    {
      icons: <MdOutlineSupportAgent size={24} />,
      name: "24/7 Service",
      desc: "Count on care—just a call, text, or email away",
    },
  ];

  const destinations = [
    {
      title: "South Lake Tahoe, California",
      description:
        "Nestled amidst the Sierra Nevada mountains, South Lake Tahoe captivates with its crystal-clear alpine lake and breathtaking vistas.",
      image: "First.jpeg",
    },
    {
      title: "Seaside Relaxation",
      description: "Cape Cod, Massachusetts: explore beaches, quaint towns, and local culture.",
      image: "Second.jpeg",
    },
    {
      title: "Maine Coast",
      description: "Cape Cod, Massachusetts: explore beaches, quaint towns, and local culture.",
      image: "Third.jpeg",
    },
    {
      title: "Contemplation",
      description: "Cape Cod, Massachusetts: explore beaches, quaint towns, and local culture.",
      image: "Last.jpeg",
    },
  ];

  const infoList = [
    {
      icon: <ClipboardList className="text-[#175156]" />, // Trip details icon
      title: "Trip details",
      description:
        "Complete trip information, including destinations, accommodations, activities, transportation, and schedule for a well-organized experience.",
    },
    {
      icon: <MapPin className="text-[#175156]" />, // Directions/Parking icon
      title: "Directions and parking info",
      description:
        "Location details and parking information, including directions, available parking options, and accessibility for a convenient visit.",
    },
    {
      icon: <BookOpen className="text-[#175156]" />, // Home guide icon
      title: "Complete home guide",
      description:
        "Enjoy the convenience of having all essentials within reach, ensuring a smooth and effortless stay with everything you need readily available.",
    },
  ];

  return (
    <section className="min-h-screen overflow-x-hidden">
      <div className="w-full py-10">
        <div className="relative h-96 md:h-[500px] px-5 md:px-20">
          <img
            src="HomeImage.png"
            className=" object-cover w-full h-full rounded-[30px]"
            alt="Home background"
          />
          <div className="absolute top-[2%] w-[90%] sm:top-[35%] flex justify-center items-center px-4">
            <div className="flex flex-col text-white gap-1 text-center">
              <h1 className="font-light font-serif  text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                Find your next adventure
              </h1>
              <p className="font-light font-serif text-gray-500 sm:text-base md:text-lg">
                Discover amazing places to stay around the world
              </p>
            </div>
          </div>

          <div className="flex absolute bottom-0 left-0 justify-center w-full px-2 sm:px-4 md:px-6">
            <div className="bg-[#f3f3f2] px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-[10px] w-full max-w-4xl">
              <div className="hidden sm:flex bg-[#ffffff] gap-2 px-4 py-2 md:px-6 md:py-3 rounded-md">
                {herosectionList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex cursor-pointer rounded-2xl px-2 py-2 gap-2 hover:bg-slate-200 transition-all flex-1">
                    <p className="text-center flex items-center">{item.icons}</p>
                    <div className="flex flex-col items-start p-1">
                      <h4 className="font-semibold text-sm md:text-base">{item.text}</h4>
                      <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sm:hidden bg-white rounded-md p-3">
                <div className="grid grid-cols-2 gap-2">
                  {herosectionList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex cursor-pointer rounded-lg px-2 py-3 gap-2 hover:bg-slate-200 transition-all">
                      <p className="text-center flex items-center text-sm text-[#175156]">
                        {item.icons}
                      </p>
                      <div className="flex flex-col items-start">
                        <h4 className="font-semibold text-sm">{item.text}</h4>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <button className="w-full bg-[#175156] text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
                    <CiSearch size={20} />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center py-14">
        <div className="flex flex-col gap-3 items-center px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44 text-center">
          <h1 className="font-medium text-2xl sm:text-5xl lg:text-6xl font-serif">
            Why your Vacasa?
          </h1>
          <p className="font-light font-serif text-gray-500 text-base sm:text-lg">
            We provide everything necessary for booking your vacation home <br />
            ensuring a secure and confident reservation process.
          </p>
        </div>
        <div className="w-full px-3 sm:px-6 md:px-20 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {obj.map((item, idx) => (
              <div
                key={idx}
                className={`flex  flex-col items-center rounded-[18px] px-6 py-6 border-2 shadow-sm transition duration-300 ${
                  idx === 0 ? "bg-[#175156] text-white" : "bg-white"
                }`}>
                <span
                  className={`p-3 rounded-full mb-3 ${
                    idx === 0 ? "bg-white text-[#175156]" : "bg-[#e7f4f2] text-[#175156]"
                  }`}>
                  {item.icons}
                </span>
                <h2
                  className={`text-xl font-semibold  font-serif text-center mb-1 ${
                    idx === 0 ? "text-white" : "text-gray-800"
                  }`}>
                  {item.name}
                </h2>
                <p
                  className={`text-sm text-center  font-light font-serif ${
                    idx === 0 ? "text-white" : "text-gray-700"
                  }`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#e2eeee] py-16">
        <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 justify-center px-4 sm:px-10">
          <div className="relative w-full sm:w-96 h-96 overflow-hidden">
            <img
              src="Night.png"
              className="object-cover rounded-[42px] w-full h-full"
              alt="Labor Day 1"
            />
            <img
              src="Night-2.png"
              className="hidden sm:block object-cover rounded-[42px] absolute top-16 -left-20 h-72 w-64"
              alt="Labor Day 2"
            />
          </div>
          <div className="flex gap-4 flex-col p-3 max-w-xl">
            <h1 className="text-2xl md:text-4xl font-bold font-serif">
              Are you ready for <br /> Labor Day festivities?
            </h1>
            <p className=" text-base font-light font-serif text-gray-500">
              Labor Day weekend is your chance to enjoy summer's final moments. <br />
              Plan a budget-friendly adventure, from beach getaways to cozy cabins before fall
              arrives.
            </p>
            <button className="bg-[#175156] w-full sm:w-1/2 rounded-lg px-3 py-2 text-white font-semibold">
              Book Your Labor Day Getaway
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-14">
        <div className="py-2 grid gap-2 text-center">
          <h1 className="text-gray-900 font-serif font-bold text-2xl sm:text-3xl md:text-4xl">
            Best destinations for <br className="hidden sm:block" /> lake holidays
          </h1>
          <p className=" text-sm  font-light font-serif text-gray-500 sm:text-base">
            There's still plenty of time to plan your ideal lake vacation, whether you want to{" "}
            <br className="hidden sm:block" />
            relax in the Ozarks, Lake Tahoe, or explore the Pacific Northwest.
          </p>
        </div>
        <div className="  grid  grid-cols-1  sm:grid-cols-3  md:grid-cols-4 gap-4 mt-10 justify-center">
          {destinations.map((item, idx) => (
            <div
              key={idx}
              className="relative h-96 rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm cursor-pointer
                   transition-all duration-500 ease-in-out    ">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <button className="absolute right-2 top-2 rounded-full w-10 h-10 bg-slate-100 flex justify-center items-center">
                <ArrowRight className="text-[#175156] -rotate-45" />
              </button>
              <div className="absolute bottom-0 w-full h-32 pointer-events-none bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent" />

              <div className="absolute bottom-2 p-3 sm:p-4 w-full text-white">
                <h1 className="font-serif font-bold text-base sm:text-lg md:text-xl truncate">
                  {item.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-100 font-medium mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" w-full  ">
        <div className="flex flex-col  gap-4 p-8">
          <h1 className="text-3xl  md:text-5xl font-serif font-bold text-center ">
            Everything you need for <br /> <span className="text-[#175156]">a perfect stay.</span>
          </h1>
          <p className="font-light font-serif text-gray-500 text-center ">
            Enjoy the convenicen of having all essential within reach , ensuring a <br />
            smooth and efortless stay with everything you need .
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 px-4 md:px-10 py-10">
          <div className="w-full md:w-2/3 space-y-6">
            {infoList.map((info, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-[#e1efec] p-3 rounded-full">{info.icon}</div>
                <div className="font-light font-serif text-gray-600">
                  <h2 className="text-lg font-semibold text-[#175156]">{info.title}</h2>
                  <p className="text-sm mt-1 leading-5 tracking-wide">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/3 max-w-sm md:max-w-sm">
            <img
              src="Night-2.png"
              alt="Night scene"
              className="rounded-xl w-full h-full object-cover shadow-md"
            />
          </div>
        </div>
      </div>
      <footer className="bg-[#070707] text-white">
        <div className="px-4 sm:px-6 md:px-8  py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex md:flex-row  flex-col gap-5  justify-between  ">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif">
                  Let's Connect With Us
                </h2>
                <div>
                  <a
                    href="mailto:connect@lorea.travel"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-base sm:text-lg underline decoration-gray-500 hover:decoration-white">
                    vacasame@lorea.travel
                  </a>
                </div>
                <div className="mt-8 sm:mt-12 md:mt-16">
                  <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-[#404040] leading-none tracking-wider">
                    estage
                  </h1>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">FOR GUESTS</h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base">
                        Explore by amenity
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base">
                        Support center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base">
                        Affirm financing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base">
                        Trip insurance
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="flex space-x-4 sm:space-x-6 pt-4 sm:pt-8">
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent border border-gray-500 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                    aria-label="Instagram">
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent border border-gray-500 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                    aria-label="Facebook">
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent border border-gray-500 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                    aria-label="Twitter">
                    <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
