require("dotenv").config()
const mongoose =require("mongoose")

mongoose.connect(process.env.MongoDbUrl).then(()=>{
    console.log("conneted to database")
}).catch((err)=>{
    console.log(err)
})