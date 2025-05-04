
const mongoose=require('mongoose')

const BookingScheam=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"userlist",
    required: true
},
places:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Place",
    
}]
})
const Bookmark=mongoose.model('booking',BookingScheam)
module.exports=Bookmark;