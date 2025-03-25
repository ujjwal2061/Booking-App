const express=require("express");
const cors=require("cors")//-> for cros connect the clinet and backend
const db=require("./connection")
const cookies=require("cookie-parser")
const allrouter=require("./Routes/routes")

const path = require('path');
const fs = require('fs');
const app=express();
require('dotenv').config();

const PORT=3000;
app.use(cors({
    origin:['https://booking-app-ecru-chi.vercel.app'  ],
        credentials:true,
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],

    }))
    app.use((req,res,next)=>{
        res.header(
           "Access-Control-Allow-Origin", 
        "https://booking-20lkoevn2-lazy61s-projects.vercel.app"
        )
        res.header("Access-Control-Allow-Credentials", true)
        next();
    });
app.use(express.json())
app.use(cookies()); 

app.use('/images', express.static('/tmp/images'))
app.use('/upload', express.static('/tmp/upload'));

const tmpImagesDir = path.join('/tmp', 'images');
const tmpUploadDir = path.join('/tmp', 'upload');

if (!fs.existsSync(tmpImagesDir)) {
  fs.mkdirSync(tmpImagesDir);
}
if (!fs.existsSync(tmpUploadDir)) {
  fs.mkdirSync(tmpUploadDir);
}
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.use(allrouter)

app.listen(PORT,()=>{console.log(`Server is Start at Port ${PORT}`)})