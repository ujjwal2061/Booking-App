import './App.css'
import { Routes, Route } from "react-router";
import Login from './Pages/Login';
import Home from './Pages/Home';
import Layout from './Section/Layout';
import Register from './Pages/Register';
import axios from 'axios';
function App() {
axios.defaults.baseURL='http://localhost:3000'
  return (
    <Routes>
      <Route path="/" element={<Layout />}> 
       {/* <Route index  element={<Home />} /> */}
       <Route path="login" element={<Login />} />
       <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
