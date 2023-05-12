const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const UserLoginDetailSchema = mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,

    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    url:{
        type:String
    },
    note:{
        type:String
    },
    userid:{
        type:ObjectId,
        ref:'MasterUser'
    }
})

const UserLoginDetailModel = mongoose.model("UserLoginDetail",UserLoginDetailSchema)
module.exports =UserLoginDetailModel;