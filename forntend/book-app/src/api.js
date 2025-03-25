import axios from "axios";
 const api=axios.create({
    baseURL: "https://booking-app-afjh.vercel.app/"||"http://localhost:3000",
    withCredentials:true
 })
 export default api
 