const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userData=new mongoose.Schema({
    name:{ type:String, required:true},
    email:{ type:String,  required:true, unique:true },
    password:{type:String,require:true}
   },{timestamps:true})

   //hashing the password Befor login
 userData.pre('save',async function (next) {
const user=this;
if(!user.isModified('password')) return next()
      try{
   const salt=await bcrypt.genSalt(5)
   const hashedpassword=await bcrypt.hash(user.password,salt)
  user.password=hashedpassword
   next()
}catch(err){
   next(err)
  }
 })
   
const alluser=mongoose.model('userlist',userData)
   module.exports=alluser;