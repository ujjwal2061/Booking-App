const mongoose=require("mongoose")
// const mongoose=require("../connection")
// Schema for the Places
const placeSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'userlist'},
    title:{type:String},
    address:{type:String},
    photos:[
        {
            public_id:String,
            url:String,
        }],
    description:{type:String},
    perks:[{type:String}],
    extraInfo:{type:String},
    checkIn:{type:Number},
    checkOut:{type:String},
    maxGuests:{type:String},
})

const Placemodel=mongoose.model('Place',placeSchema)
module.exports=Placemodel;