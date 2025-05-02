
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './UserContext/usercontext.jsx';

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter >
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
 
)
