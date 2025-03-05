const mongoose=require("mongoose")
// Schema for the Places
const placeSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'userlist'},
    title:{type:String},
    address:{type:String},
    photos:[{type:String}],
    description:{type:String},
    perks:[{type:String}],
    extraInfo:{type:String},
    checkIn:{type:Number},
    checkOut:{type:String},
    maxGuests:{type:String},
})

const Placemodel=mongoose.model('Place',placeSchema)
module.exports=Placemodel;