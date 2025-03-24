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
    origin:['',
        "http://localhost:5173",  ],
        credentials:true
    }))
    
app.use(express.json())
app.use(cookies()); 

app.use('/images', express.static(path.join(__dirname,'images')))
app.use('/upload', express.static(path.join(__dirname, 'upload')));

const destDir = path.join(__dirname, 'images');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.use(allrouter)

app.listen(PORT,()=>{console.log(`Server is Start at Port ${PORT}`)})