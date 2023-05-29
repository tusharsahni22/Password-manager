const UserCredentialModel = require("../database/user")
const { decrypt, encrypt } = require("./encrpytion")

const getUserDetails = (req,res)=>{
   const  _id= req.user._id
   const data = UserCredentialModel.findById(_id).select("-password").then((result)=>{
    res.status(200).send(result)
   }).catch((err)=>{
    console.log(err)
    res.status(500).send("something went wrong")
   })
}

const updateUserDetails = async(req,res)=>{
    const  _id= req.user._id   
    oldPass= await UserCredentialModel.findOne(_id)
    decriptedPass=decrypt(oldPass.password)
    if(decriptedPass!==req.body.password){
        res.status(400).send("invalid password")       
    } else {
        let dataToUpdate = req.body
        if(req.body.email){

            UserCredentialModel.findByIdAndUpdate(_id,{"email":dataToUpdate.email},{new:true}).then((result)=>{
                res.status(201).send(result)
                console.log(err)
            })
        }
        else if(req.body.newpassword){
            encryptedPassword=encrypt(dataToUpdate.newpassword);
            UserCredentialModel.findByIdAndUpdate(_id,{"password":encryptedPassword},{new:true}).then((result)=>{
                res.status(201).send(result)
            }).catch((err)=>{
                console.log(err)
                res.status(500).send("something went wrong")
            })
        }
    }
 }

module.exports={getUserDetails,updateUserDetails}