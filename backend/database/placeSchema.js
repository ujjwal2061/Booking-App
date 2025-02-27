const mongoose=require("mongoose")
// Schema for the Places
const placeSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:{type:String},
    address:{type:String},
    photos:[String],
    description:[String],
    perks:[String],
    extraInfo:{type:String},
    checkIn:{type:Number},
    checkOut:{type:Number},
    MaxGuests:{type:Number},
})

const Placemodel=mongoose.model('Place',placeSchema)
module.exports=Placemodel;