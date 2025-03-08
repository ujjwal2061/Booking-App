// import { FaHotel } from "react-icons/fa";
// import { CiViewList } from "react-icons/ci";
// import { CiUser } from "react-icons/ci";
// import { Link } from 'react-router'
// import { useLocation } from "react-router";

// export default function AccountNavbar(){
//     const location=useLocation()
//     function isActive(path){
//         return location.pathname===path ? "bg-primary text-white":" bg-gray-300"
//        }
//     return (
//         <>
//          <nav className='w-full flex   mt-8 justify-center  gap-3  mb-8 '>
//         <Link className={`flex  items-center gap-2 py-2 px-6 rounded-full ${isActive("/account")}`} to="/account">
//         <CiUser />
//           My Account</Link>
//         <Link className={`flex  items-center gap-2 py-2 px-6 rounded-full ${isActive("/account/bookings")}`} to="/account/bookings">
//         <CiViewList />
//      My Bookings</Link>
//         <Link className={`flex  items-center gap-2 py-2 px-6 rounded-full ${isActive("/account/places")}`} to="/account/places">
//         <FaHotel />
//         My accomodations</Link>
//     </nav>
//         </>
//     )
// }