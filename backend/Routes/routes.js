const express=require("express")
const bcrypt = require("bcrypt");
const download=require("image-downloader")
const alluser=require("../database/userSchema")
const {generatetoken} =require("../auth/jwt")
const jwt=require("jsonwebtoken")
const multer = require('multer');
const path = require('path');
const Placemodel = require("../database/placeSchema");
const route=express.Router()
const saltRounds = 10;


route.get("/home",async(req,res)=>{
    try{
        const places=await Placemodel.find();
        res.json(places)
        console.log(places)
    }catch(error){
        console.log("Error ",error)
        res.status(500).json({msg:"Error at Feting "})
    }
    
}) 
// resgister route
route.post('/register',async (req,res)=>{
    try{
        const {name,password,email}=req.body
       if(!name || !password ||!email){
        return res.status(400).json({msg:"All field are requried"})
       }
       const existingUser = await alluser.findOne({ email });
       if (existingUser) {
           return res.status(400).json({ msg: "User already exists" });
       }
       const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newuser=alluser({name,password:hashedPassword,email})
        const response=await newuser.save()
        const payload={
            id:response._id,
            name:response.name,
        }
        // Cookies 
        const token=generatetoken(payload)
        res.cookie("auth_token",token ,{
            httpOnly:false,
            secure:process.env.NODE_ENV==="production",
            maxAge:10*24*60*60*1000,
        })
        console.log("For hello",token)
        res.status(201).json({msg:"User created succesfully",user:response,token:token})
   
    }catch(error){
        res.status(500).json({msg:"Error creating user",error:error.message})
    }
})
// login route
route.post('/login',async(req,res)=>{
    try{
  const {name,password}=req.body
  const user=await alluser.findOne({name})
  if(!user){
    return res.status(404).json({error:"User does't exsit"})
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if(!isPasswordMatch){
    return res.status(401).json({error:"Password does't match"})
  }
    const payload={
     id:user._id, 
     name:user.name,  
}
  const token=generatetoken(payload)
  res.cookie("auth_token",token ,{
    httpOnly:false,
    secure:false,
    maxAge:10*24*60*60*1000,
})
   res.json({token ,user:user})
    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
})
// profile route
route.get("/profile",(req,res)=>{
   const token=req.cookies.auth_token;
   if (!token) {
    return res.status(401).json({ msg: "Unauthorized. Please log in." });
}
// check the user cookies 
jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userdata) => {
    if (err) {
        return res.status(403).json({ err: "Invalid token. Please log in again." });
    }
    const {name,email,_id}=await alluser.findById(userdata.id)
    return res.json({name,email,_id});
});
});
// logout api
route.post('/logout',(req,res)=>{
    res.cookie('auth_token','',{
        httpOnly:true,
        maxAge:0,secure:false}).json(true)

})

// upload by the link route 
route.post("/upload-by-links",async (req,res)=>{
    try{
        const  {link}=req.body
        const newname = 'Photo' + Date.now() + '.jpg';
        const destDir = path.join(__dirname, '../images');
        const options = {
            url: link, 
            dest: path.join(destDir, newname)
            
        };
        await download.image(options)
        res.json(newname)
    }catch(err) {
          console.error('Error downloading image:', err);
        };
})

// for upload photo
const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null, './upload') 
    },
    filename:function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
        
    }
})
const upload = multer({ storage: storage })


route.post("/upload",upload.array("photos",100),(req,res)=>{
    try{
 const uploadedFiles=[]
 for(let i=0; i<req.files.length;i++){
    const{filename}=req.files[i]
    uploadedFiles.push(filename);
    }
    res.status(200).json(uploadedFiles);
    console.log("Uploaded photos:", uploadedFiles);

    }catch(error){
        console.error("Error processing uploads:", error);
        res.status(500).json({ error: "Upload failed" }); 
    }
    
})
route.post('/places',(req,res)=>{
    const token=req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ error: "No authentication token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userdata) => {
        if (err) {
            return res.status(403).json({ err: "Invalid token. Please log in again." });
        }
        try{  
            const {
                title,address,photos,
                perks,extraInfo, description,
                checkIn, checkout,maxGuests
            }=req.body
            const placeInfo= await Placemodel.create({
                owner:userdata.id, 
                title,address,photos:photos, // -> fix the error of here that MissMatch name of the Photos  
                perks:perks,extraInfo, description,
                checkIn, checkout,maxGuests
            }) 
            console.log(placeInfo)
            res.json(placeInfo)
        }catch(error){
            console.log(error)
            res.status(400).json({msg:"Error",error})
        }
    });
})
// for the place fetching
route.get("/places",(req,res)=>{
    const token=req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ error: "No authentication token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userdata) => {
        if (err) {
               return res.status(403).json({ err: "Invalid token. Please log in again." });
        }
        const {id}=userdata
        res.json(await Placemodel.find({owner:id}))


    })
})
// for the single page api according id of the page
route.get("/places/:id",async(req,res)=>{
    const {id}=req.params
    try{
        res.json(await Placemodel.findById(id))
    }catch(error){
        res.status(400).json({msg:"Got a the oSingle page loading",error})
        console.log(error)
    }
})
module.exports = route;