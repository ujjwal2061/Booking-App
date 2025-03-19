const express=require("express");
const cors=require("cors")
const db=require("./connection")
const cookies=require("cookie-parser")
const allrouter=require("./Routes/routes")

const path = require('path');
const fs = require('fs');
const app=express();
require('dotenv').config();
const PORT=3000;
app.use(express.json())
 

app.use('/images', express.static(path.join(__dirname,'/images')))
app.use('/uploads', express.static(path.join(__dirname, '/upload')));
app.use(cookies()); 
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
const destDir = path.join(__dirname, 'images');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}
app.use(allrouter)

app.get("/",(req,res)=>{
    res.send({message:"Hello world"})
})
app.listen(PORT,()=>{console.log(`Server is Start at Port ${PORT}`)})