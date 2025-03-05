import './App.css'
import { Routes, Route } from "react-router";
import Login from './Pages/Login';
import Home from './Pages/Home';
import Account from './Pages/Account';
import Layout from './Section/Layout';
import Register from './Pages/Register';
import axios from 'axios';
 import { UserContextProvider } from './UserContext/usercontext';
 import PlacesPage from './Pages/Placespage';
 import PlaceFrom from './Pages/PlaceForm';
 import Bookings from './Pages/Bookings';
 import PlaceDetails from './Pages/PlaceDetails';
function App() {
axios.defaults.baseURL='http://localhost:3000'
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}> 
       <Route index element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="account" element={<Account />} />
       <Route path="/account/bookings" element={<Bookings />} />
       <Route path="/account/places" element={<PlacesPage />} />
       <Route path="/account/places/new" element={<PlaceFrom />} />
      </Route>
       <Route path="/account/places/:id" element={<PlaceDetails />} />
    </Routes>
    </UserContextProvider>
  )
}

export default App
