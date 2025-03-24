 const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
// const mongoose=require("../connection")
const userData=new mongoose.Schema({
    name:{ type:String, required:true,unique:true},
    email:{ type:String,  required:true, unique:true },
    password:{type:String,required:true},
   },{timestamps:true})


 userData.methods.comparePassword=async function(candidatepassword){
   try{
  const passwordmatch=await bcrypt.compare(candidatepassword,this.password)
  return passwordmatch    
}catch(err){
    throw err
}
} 
const alluser=mongoose.model('userlist',userData)
module.exports=alluser;