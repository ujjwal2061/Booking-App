const express=require("express")

const alluser=require("../database/userSchema")
const {generatetoken} =require("../auth/jwt")
const jwt=require("jsonwebtoken")
const route=express.Router()

route.get("/test",(req,res)=>{
    res.json("test ok")
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
        const newuser=alluser({name,password,email})
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
            sameSite:"Strict",
            maxAge:10*24*60*60*1000,
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
  const ispaswordmatch=await user.comparePassword(password)
  if(!ispaswordmatch){
    return res.status(401).json({error:"Password does't match"})
  }
    const payload={
     id:user._id, 
     name:user.name,  
}
  const token=generatetoken(payload)
  res.cookie("auth_token",token ,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"Strict",
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
    res.cookie('auth_token','',{maxAge:0}).json(true)

})

module.exports = route;