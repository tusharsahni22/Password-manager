const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const UserLoginDetailSchema = mongoose.Schema({
    type:{
        type:String,
        // required:true,
        // default: null
    },
    name:{
        type:String,
        // required:true,
        // default: null

    },
    username:{
        type:String,
       // required:true,
        // default: null
    },
    password:{
        type:String,
        // required:true,
        // default: null
    },
    url:{
        type:String
    },
    note:{
        type:String
    },
    bankName:{
        type:String,
        require:true,
        default: null
    },
    cardholder:{
        type:String,
        require:true,
        default: null
    },
    cardnumber:{
        type:Number,
        minlength:16,
        require:true,
        default: null
    },
    cvv:{
        type:Number,
        require:true,
        minlength:3,
        default: null
    },
    expiryMonth:{
        type:String,
        require:true,
        default: null
    },
    expiryYear:{
        type:String,
        require:true,
        default: null
    },
    userid:{
        type:ObjectId,
        ref:'MasterUser'
    }
})

const UserLoginDetailModel = mongoose.model("UserLoginAndCardDetail",UserLoginDetailSchema)
module.exports =UserLoginDetailModel;