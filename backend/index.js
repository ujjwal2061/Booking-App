const express=require("express");
const cors=require("cors")//-> for cros connect the clinet and backend
const db=require("./connection")
const cookies=require("cookie-parser")
const allrouter=require("./Routes/routes")
const path = require('path');
const app=express();
require('dotenv').config();

const PORT=3000;
app.use(express.json())
app.use(cookies()); 
app.use(cors({
    origin:['https://hoomy.vercel.app', 'http://localhost:5173'] ,
        credentials:true,
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
        exposedHeaders: ["Set-Cookie"]
    }))

    app.options('*', cors({
      origin: ['https://hoomy.vercel.app', 'http://localhost:5173'],
      credentials: true
  }));
  

app.use('/images', express.static(path.join(__dirname, 'images'), {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', 'https://hoomy.vercel.app');
  }
}));

app.use('/upload', express.static(path.join(__dirname, 'upload'), {
  setHeaders: (res, path) => {
    res.set('Access-Control-Allow-Origin', 'https://hoomy.vercel.app');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (path.endsWith('.avif')) {
      res.set('Content-Type', 'image/avif');
    }
  }
})
);


//Deafult Route of Sever
app.get("/", (req, res) => {
    res.send("Server is running!");
});
// app.use(db)
// All Route
app.use(allrouter)
// SPA Fallback Route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT,()=>{console.log(`Server is Start at Port ${PORT}`)})