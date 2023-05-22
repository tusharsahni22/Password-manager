const mongoose = require("mongoose")
const userCardSchema =mongoose.Schema({
    bankName:{
        type:String,
        require:true
    },
    cardholder:{
        type:String,
        require:true
    },
    cardnumber:{
        type:Number,
        minlength:16,
        require:true
    },
    cvv:{
        type:Number,
        require:true,
        minlength:3
    },
    expiryMonth:{
        type:String,
        require:true
    },
    expiryYear:{
        type:String,
        require:true
    },
})

const  userCardModel=mongoose.model("UserCardDetails", userCardSchema)
module.exports=userCardModel