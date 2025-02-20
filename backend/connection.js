const mongoose=require("mongoose")
require('dotenv').config();
//Define the URI
const mongoURL=process.env.DATABASE

//set up MongoDB connection 
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection

db.on('connected',()=>{
    console.log("MongoDB connected ")
})

db.on('error',()=>{
    console.log("Sever connection error ")
})
db.on('disconnected',()=>{
    console.log("MongoDB disconnected ")
})
module.exports=db;