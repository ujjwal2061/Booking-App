import axios from "axios";
 const api=axios.create({
   baseURL:"http://localhost:3000/",
   //  baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials:true
 })
 export default api
 