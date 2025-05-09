const express=require("express")
const bcrypt = require('bcryptjs');
const alluser=require("../database/userSchema")
const {generatetoken} =require("../auth/jwt")
const jwt=require("jsonwebtoken")
const multer = require('multer');
const Placemodel = require("../database/placeSchema");
const cloudstore=require("../cloud/cloudainary");
const Bookmark = require("../database/booking.controller");


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
            // secure:false,
            secure:process.env.NODE_ENV==="production",
            maxAge: 10 * 24 * 60 * 60 * 1000,
           sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            domain:".vercel.app"
        })
        res.status(201).json({msg:"User created succesfully",user:response})
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
    // secure:false,
    secure: process.env.NODE_ENV === "production",
    maxAge:10*24*60*60*1000,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
})
   res.json({
    status:"Success",
    user:{
        name:user.name,
        email:user.email,
        _id:user.id
    }
})
console.log(token)
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
        // good one 
        res.status(200).json({
            status:"Success",
            user:{
                name:user.name,
                email:user.email,
                _id:user.id
            }
        })
    }catch(error){
        res.status(500).json({error:"Invalid token. Please log in again."})
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
        res.status(500).json({error:"From the Sever ",err})
       
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
      folder:"blog-images", 
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
        error: "Upload failed",
        error: error.message }); 
    }

})


route.post('/places', (req, res) => {
    const token = req.cookies.auth_token;
    if (!token) return res.status(401).json({ error: "No authentication token provided" });

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userdata) => {
        if (err) return res.status(403).json({ success: false, err: "Invalid token" });

        try {
            const {
                title, address, photos,
                perks, extraInfo, description,
                checkIn, checkout, maxGuests
            } = req.body;

            // Process photos to match schema format
            const processedPhotos = Array.isArray(photos)
                ? photos.map(photo => ({
                    public_id: photo.public_id || 'default_public_id', // Add default or require from client
                    url: typeof photo === 'string' ? photo : photo.url
                }))
                : [{  // Handle single photo case
                    public_id: photos.public_id || 'default_public_id',
                    url: typeof photos === 'string' ? photos : photos.url
                }];

            const placeInfo = await Placemodel.create({
                owner: userdata.id,
                title,
                address,
                photos: processedPhotos,
                perks: Array.isArray(perks) ? perks : [perks],
                extraInfo,
                description,
                checkIn,
                checkout,
                maxGuests
            });

            res.json(placeInfo);
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Error creating place",
                error: error.message
            });
        }
    });
});
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
        res.status(200).json(await Placemodel.findById(id))
    }catch(error){
        res.status(400).json({
            status:"Fail",
            msg:"Problem at Fetching",error
        })
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
            status:"Fail",
            msg:"No places found matching your need"
        })
       }
       res.status(200).json({success:true,result})
     }catch(error){
     res.status(500).json({
         status:"Server Error",
         msg:"Can't get it",error})
     }
})
// for booking saving
route.post("/saves",async(req,res)=>{
try{
    const token = req.cookies.auth_token;
    if(!token) {
        return res.status(401).json({error: "No authentication token provided"})
    }
    const {placeId}=req.body;
    if(!placeId){
        return res.status(400).json({error:"Place ID is requried"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   const userId = decoded.id;
    // check is there is any bookmarks or not 
    let bookmarks =await Bookmark.findOne({user:userId})

    if(!bookmarks){
        bookmarks=new Bookmark({
            user:userId,
            places:[placeId]
        })
    }else{
        // check is same palceID is if it then show old one  bookmaks 
        if(!bookmarks.places.includes(placeId)){
            bookmarks.places.push(placeId)
        }
    }
    // saveing the bookmarks
    await bookmarks.save();
    res.status(200).json({
        status: "Success",
        msg: "Place saved successfully",
        data: bookmarks
      });
      console.log("Booking list",bookmarks)
}catch(e){
    console.log(e)
    res.status(500).json({
        status:"Fail to Save",
        msg:"Internal Server Error "
    })
}
})
// get savesbookmarks
route.get("/bookmarks",async(req,res)=>{
    try{
        const token = req.cookies.auth_token;
        if(!token) {
            return res.status(401).json({error: "No authentication token provided"})
        }
        const savebookmarks=Bookmark.find({})
        if((await savebookmarks).length >0){
            res.status(200).json({
                status:"Sucess",
                mesg:"Book Your place to see your Bookmakrs"
            })
        }
        res.status(200).json({
            status:"Success",
            saves:{
                savepalces:savebookmarks
            }
        })
    }catch(e){
        res.status(500).json({
            status:"Fail to Save",
            msg:"Internal Server Error "
        })
    }
})

module.exports = route;