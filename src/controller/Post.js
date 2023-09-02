const { encrypt,decrypt} = require("./encrpytion")
const UserLoginDetailModel = require("../database/UserLoginAndCardDetail")


const addPost = async (req,res)=>{
    if(!req.body.name || !req.body.password || !req.body.username || !req.body.type){
        res.satus(400).send("Fill mandatory Details")
    }
    else{
        const UserLoginData = new UserLoginDetailModel({
            name :req.body.name,
            username:req.body.username,
            password:req.body.password,
            url:req.body.url,
            note:req.body.note,
            userid:req.user._id,
            type:req.body.type
        })

        UserLoginData.password =encrypt(UserLoginData.password)

        await UserLoginData.save().then((result)=>{
        res.send("Request created Sucessfully")
        }).catch((e)=>{
            console.log(error)
            res.status(500).send("Something went Wrong")
        })
    }  
}

const UpdatePost = async(req,res)=>{

    const postId= req.params.id;
    let dataToUpdate = req.body 
    if(req.body.password){
        dataToUpdate.password=encrypt(req.body.password)
    }
    data = await UserLoginDetailModel.findByIdAndUpdate(postId,dataToUpdate,{new:"true"}).then((result=>{res.send(result)
    })).catch((err)=>{
        console.log(err)
        res.status(500).send("Something went Wrong")
    })   
   }


const getPost = async(req,res)=>{
    postId=req.params.id
    UserLoginDetailModel.findById(postId).then(result=>{
        if(!result){
            
            res.status(404).send("not found")
        }
        else{
            res.send(result)
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).send("Something went Wrong")
    })

}
const getAllPostByUserId = async(req,res)=>{
    const userid=req.user._id
        
    UserLoginDetailModel.find({"userid":userid}).then(result=>{
        if(!result){
            
            res.status(404).send("not found")
        }
        else{
            res.send(result)
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).send("Something went Wrong")
    })

}


module.exports={addPost,UpdatePost,getPost,getAllPostByUserId}