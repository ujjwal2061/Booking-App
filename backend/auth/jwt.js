const auth=require("jsonwebtoken")

const generatetoken=(userdata)=>{
    return auth.sign(userdata,process.env.JWT_SECRET)
}
module.exports={generatetoken}