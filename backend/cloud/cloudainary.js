const cloud=require("cloudinary").vs;

cloud.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secert:process.env.API_SECERT
})
module.exports=cloud