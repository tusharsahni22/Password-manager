const { encrypt,decrypt} = require("./encrpytion")
const UserLoginDetailModel = require("../database/UserLoginAndCardDetail")


const addPost = async (req,res)=>{
    if(!req.body.name || !req.body.password || !req.body.username || !req.body.type){
        res.status(400).send("Fill mandatory Details")
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
            result.forEach(element => {
                let decriptedPass = decrypt(element.password)
                element.password = decriptedPass
                
            });
            res.send(result)
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).send("Something went Wrong")
    })

}
const addAll = async (req,res)=>{
    
        const UserLoginData = new UserLoginDetailModel({
            name :req.body.name,
            username:req.body.username,
            password:req.body.password,
            url:req.body.url,
            note:req.body.note,
            userid:req.user._id,
            type:req.body.type,

            bankName:req.body.bankName,
            cvv:req.body.cvv,
            cardholder:req.body.cardholder,
            cardnumber:req.body.cardnumber,
            expiryMonth:req.body.expiryMonth,
            expiryYear:req.body.expiryYear,
        })

        UserLoginData.password =encrypt(UserLoginData.password)

        await UserLoginData.save().then((result)=>{
        res.send("Request created Sucessfully")
        }).catch((e)=>{
            console.log("err",e)
            res.status(500).send("Something went Wrong")
        })
    }

    const deleteById = (req,res)=>{
        if(!req.body.id){
            res.send("Post_id is missing ")
        }
        else{
      let id =  req.body.id 
      UserLoginDetailModel.deleteOne({_id:id}).then((result)=>{
        res.send(result)
        }).catch((err)=>{
        console.log("error while deleting",err)
        res.send("Something went wrong")
    })
    }}


module.exports={addPost,UpdatePost,getPost,getAllPostByUserId,addAll,deleteById}