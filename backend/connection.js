const mongoose=require("mongoose")
require('dotenv').config();
//Define the URI
const mongoURL=process.env.DATABASE
mongoose.connect(mongoURL,{
   
})
.then(()=>console.log("MongoDB Atrlas connected "))
.catch((err)=>console.log("MongoDB connection error ",err))

const db=mongoose.connection


module.exports=db;