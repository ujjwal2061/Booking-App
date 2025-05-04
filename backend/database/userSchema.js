 const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")

const userData=new mongoose.Schema({
    name:{ 
      type:String, 
      required:true,
    },
     email:{ type:String, 
       required:true, 
       unique:true 
      },
     password:{
      type:String,
      required:true
    
    },
    booking:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Bookamark"
    }
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