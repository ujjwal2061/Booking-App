const cloud=require("cloudinary").v2;
require('dotenv').config();
cloud.config({
    cloud_name:"da0zslcf2",
    api_key:"359258858984937",
    api_secret:"oPhbyqGBkMMw6Juds9nhntZ-QQU"
})

module.exports=cloud