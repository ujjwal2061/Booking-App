const express=require("express")
const alluser=require("../database/userSchema")
const {generatetoken} =require("../auth/jwt")
const route=express.Router()

route.get("/test",(req,res)=>{
    res.json("test ok")
})
route.post('/register',async (req,res)=>{
    try{
        const {name,password,email}=req.body
       if(!name || !password||!email){
        return res.status(400).json({msg:"All field are requried"})
       }
       const existingUser = await alluser.findOne({ email });
       if (existingUser) {
           return res.status(400).json({ msg: "User already exists" });
       }
       
        const newuser=alluser({name,password,email})
        const response=await newuser.save()
        const payload={
            name:response.name,
            password:response.password
        }
        const token=generatetoken(payload)
        res.status(201).json({msg:"User created succesfully",user:response,token:token})
   
    }catch(error){
        res.status(500).json({msg:"Error creating user",error:error.message})
    }
})
route.post('/login',async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
})
module.exports=route;