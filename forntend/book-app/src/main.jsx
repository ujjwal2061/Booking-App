
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './UserContext/usercontext.jsx';
import { BookingcontextProvider } from './UserContext/Bookingcontext.jsx';

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter >
    <BookingcontextProvider>
     <UserContextProvider>
       <App />
      </UserContextProvider>
     </BookingcontextProvider>
  </BrowserRouter>
 
)
