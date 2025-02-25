const express=require("express");
const cors=require("cors")
const db=require("./connection")
const cookies=require("cookie-parser")
const allrouter=require("./Routes/routes")
const app=express();
require('dotenv').config();
const PORT=3000;
app.use(express.json())
app.use(cookies());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(allrouter)


app.listen(PORT,()=>{console.log(`Server is Start at Port ${PORT}`)})