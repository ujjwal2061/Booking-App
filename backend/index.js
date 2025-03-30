const express=require("express");
const cors=require("cors")//-> for cros connect the clinet and backend
const db=require("./connection")
const cookies=require("cookie-parser")
const allrouter=require("./Routes/routes")

const tmpDir=require('os').tmpdir()
const path = require('path');
const fs = require('fs');
const app=express();
require('dotenv').config();

const PORT="https://hoomy.vercel.app"||3000;
app.use(cors({
    origin:'https://hoomy.vercel.app' ,
        credentials:true,
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
        exposedHeaders: ["Set-Cookie"]

    }))
  app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','https://hoomy.vercel.app')
    res.header('Access-control-Allow-Credentials',true)
    res.header('Acess-Contorl-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-Type,Authorization,Content-Length,X-Requested-with')
 if('OPTIONS'==req.method){
  res.sendStatus(200)
 }else{
  next()
 }
  })

app.use(express.json())
app.use(cookies()); 

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
// All Route
app.use(allrouter)
// SPA Fallback Route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT,()=>{console.log(`Server is Start at Port ${PORT}`)})