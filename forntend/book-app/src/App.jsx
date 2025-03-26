import './App.css'
import { useState,useEffect } from 'react';
import { Routes, Route ,Navigate} from "react-router";
import Login from './Pages/Login';
import Home from './Pages/Home';
import Account from './Pages/Account';
import Layout from './Section/Layout';
import Register from './Pages/Register';
 import { UserContextProvider } from './UserContext/usercontext';
import PlacesPage from './Pages/Placespage';
import PlaceFrom from './Pages/PlaceForm';
import Bookings from './Pages/Bookings';
import PlaceDetails from './Pages/PlaceDetails';
import Allplaces from './Pages/Allplaces';
import {  BookingcontextProvider } from './UserContext/Bookingcontext';
function App() {

const [user, setUser] = useState(null);


  return (
    <UserContextProvider>
      <BookingcontextProvider>
    <Routes>
      <Route path="/" element={<Layout />}> 
       <Route index element={user ? <Navigate to="/allplaces" /> : <Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/allplaces" element={<Allplaces />} />
       <Route path="account" element={<Account />} />
       <Route path="/account/bookings" element={<Bookings />} />
       <Route path="/account/places" element={<PlacesPage />} />
       <Route path="/account/places/new" element={<PlaceFrom />} />
       <Route path="/allplaces/places/:id" element={<PlaceDetails />} />
      </Route>
    </Routes>
   </BookingcontextProvider>
    </UserContextProvider>
  )
}

export default App
