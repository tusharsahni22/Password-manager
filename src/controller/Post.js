const { encrypt,decrypt} = require("./encrpytion")
const UserLoginDetailModel = require("../database/userLoginDetails")


const addPost = async (req,res)=>{
    if(!req.body.name || !req.body.password || !req.body.username){
        res.satus(400).send("Fill mandatory Details")
    }
    else{
        const UserLoginData = new UserLoginDetailModel({
            name :req.body.name,
            username:req.body.username,
            password:req.body.password,
            url:req.body.url,
            note:req.body.note,
            userid:req.user._id
        })

        UserLoginData.password =encrypt(UserLoginData.password)

        await UserLoginData.save().then((result)=>{
        res.send("Request created Sucessfully")
        }).catch((e)=>{
            console.log(error)
        })




    }
    

}

module.exports={addPost}