import './App.css'
import { useContext,useEffect } from 'react';
import { Routes, Route ,Navigate} from "react-router";
import Login from './Pages/Login';
import Home from './Pages/Home';
import Account from './Pages/Account';
import Layout from './Section/Layout';
import Register from './Pages/Register';
 import { UserContext,} from './UserContext/usercontext';
import PlacesPage from './Pages/Placespage';
import PlaceFrom from './Pages/PlaceForm';
import Bookings from './Pages/Bookings';
import PlaceDetails from './Pages/PlaceDetails';
import Allplaces from './Pages/Allplaces';
import api from './api';
import {  BookingcontextProvider } from './UserContext/Bookingcontext';
function App() {

const {user ,setUser,setLoading ,setReady,setError}=useContext(UserContext)

useEffect(()=>{
  setLoading(true)
  api.get('/profile',{withCredentials:true})
  .then(({data})=>{
      setUser(data)
  })
  .catch((error)=>{
      setUser(null);
      setError(error)
  }) 
  .finally(()=>{
      setReady(true)
      setLoading(false);
  })
 
},[])

  return (
   
      <BookingcontextProvider>
    <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}> 
       <Route index element={user ? <Navigate to="/allplaces" /> : <Home />} />
       <Route path="/allplaces" element={<Allplaces />} />
       <Route path="account" element={<Account />} />
       <Route path="/account/bookings" element={<Bookings />} />
       <Route path="/account/places" element={<PlacesPage />} />
       <Route path="/account/places/new" element={<PlaceFrom />} />
       <Route path="/allplaces/places/:id" element={<PlaceDetails />} />
      </Route>
    </Routes>
   </BookingcontextProvider>
   
  )
}

export default App
