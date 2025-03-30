const express=require("express")
const bcrypt = require('bcryptjs');
const alluser=require("../database/userSchema")
const {generatetoken} =require("../auth/jwt")
const jwt=require("jsonwebtoken")
const multer = require('multer');
const Placemodel = require("../database/placeSchema");
const cloudstore=require("../cloud/cloudainary");


const route=express.Router()
const saltRounds = 10;


route.get("/allplaces",async(req,res)=>{
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 5;
    try{
        const skip=(page-1)*limit
        
        const totalPlaces=await Placemodel.countDocuments()
        const places=await Placemodel.find({})
           .skip(skip)
           .limit(limit)
        res.json({places,
            currentPage:page,
            totalpage:Math.ceil(totalPlaces/limit),
            totalPlaces:totalPlaces
        })
    }catch(error){
        res.status(500).json({msg:"Interal server Error ",error})
    }
    
}) 
// resgister route
route.post('/register',async (req,res)=>{
    try{
        const {name,password,email}=req.body
       const existingUser = await alluser.findOne({ name});
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
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge: 10 * 24 * 60 * 60 * 1000,
            sameSite: "None", 
            domain:".vercel.app"
        })
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
  const isPasswordMatch = await bcrypt.compare(password,user.password);
  if(!isPasswordMatch){
    return res.status(401).json({error:"Password does't match"})
  }
    const payload={
     id:user._id, 
     name:user.name,  
}
  const token=generatetoken(payload)
  res.cookie("auth_token",token ,{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    maxAge:10*24*60*60*1000,
    sameSite:"None"
})
   res.json({token ,user:user})
    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
})
// profile route
route.get("/profile",async(req,res,)=>{
    try{
        const token=req.cookies.auth_token;
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized. Please log in." });
        }
        // check the user cookies 
        const decode=jwt.verify(token, process.env.JWT_SECRET)
        const user=await alluser.findById(decode.id)
        if(!user){
            return res.status(404).json({msg:"User not Found"})
        }
        res.json({name:user.name,email:user.email,_id:user.id})
    }catch(error){
        res.status(403).json({error:"Invalid token. Please log in again."})
    }

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
        if (!link?.match(/^https?:\/\/.+\/.+\.(avif|png|jpg|jpeg|webp)(\?.*)?$/i)) {
            return res.status(400).json({ error: "Invalid image URL" });
          }
          // store the image stthe cloud 
          const uplodImage=await cloudstore.uploader.upload(link,{
            folder:"bolg-images",
          })
     
         res.json({public_id:uplodImage.public_id,url:uplodImage.secure_url})
    }catch(err) {
        res.status(400).json({error:"From the Sever ",err})
       
        };
})

// for upload photo
const storage=multer.memoryStorage()
const upload = multer({ storage: storage ,
    limits:{fileSize:10*1024*1024}, //10MB file size
    fileFilter:(req,file,cb)=>{
        const allowedTypefiles=[
            'image/avif',
            'image/png',
            'image/jpeg',
            'image/webp'
        ]
        if(allowedTypefiles.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error('Invalid File type'))
        }
    }
})


route.post("/upload",upload.array("photos",100),async(req,res)=>{
    try{
 const uploadedFiles=[]
 for(const file of req.files){
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;
    const uplodImages=await cloudstore.uploader.upload(dataURI,{
      folder:"bolg-images", 
      resource_type: "auto" 
    })
    uploadedFiles.push({
        public_id:uplodImages.public_id,
        url:uplodImages.secure_url
    });
    }
    res.status(200).json(uploadedFiles);
    }catch(error){
        
        res.status(500).json({
        susccess:false,
        error: "Upload failed" }); 
    }

})


route.post('/places',(req,res)=>{
    const token=req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ error: "No authentication token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userdata) => {
        if (err) {
            return res.status(403).json({
                susccess:false,
                 err: "Invalid token. Please log in again." });
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
          
            res.json(placeInfo)
        }catch(error){
            res.status(500).json({
                success: false,
                msg:"Error",error})
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
        const userplaces=await Placemodel.find({owner:id})
        res.json(userplaces)


    })
})
// for the single page api according id of the page
route.get("/places/:id",async(req,res)=>{
    const {id}=req.params
    try{
        res.json(await Placemodel.findById(id))
    }catch(error){
        res.status(400).json({msg:"Got a the Single page loading",error})
       
    }
})
// for serach query
route.get("/get-places",async (req,res)=>{
     try{
        const searchTerm=req.query.search;
        const searchquery={}
        if(searchTerm){
            const filtersearch=searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
           const regex=new RegExp(filtersearch,'i')

           searchquery.$or=[
            {title:{$regex:regex}},
            {address:{$regex:regex}},
            {description:{$regex:regex}},
            {perks:{$in:[regex]}}
           ]
        }

        if(req.query.address){
            searchquery.address={
                // Match the last aprt of the string 
                $regex:req.query.address,
                $options:'i' 
            }
            }
            //Searh by the title
            if(req.query.title){
            searchquery.title={
                $regex:req.query.title,
                $options:'i'
            }
        }
            // check the perks is string or array and if any $in use to find perks inside the array 
            if(req.query.perks){
                searchquery.perks={
                    $in:Array.isArray(req.query.perks)?req.query.perks:[req.query.perks]
                }
            }
       const result=await Placemodel.find(searchquery)
       //check the result 
       if(result.length===0){
        return res.status(400).json({
            susccess:false,
            msg:"No places found matching your need"
        })
       }
       
       res.status(200).json({success:true,result})
     }catch(error){
    res.status(500).json({
        success: false,
        msg:"Cnat get it",error})
     }
})
module.exports = route;