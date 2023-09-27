const UserLoginAndCardDetail = require("../database/UserLoginAndCardDetail")
const trashModel = require("../database/trash")
const { encrypt,decrypt} = require("./encrpytion")

const moveToTrash = async(req,res)=>{
    if(!req.body.id){
        res.send("fill the post id ")
    }
    else{
        let id =req.body.id
        let document={};
        let isMoved=false

        await UserLoginAndCardDetail.findById({_id:id}).then((result)=>{
            document=result
        }).catch((err)=>{
            console.log("error",err)
            res.status(500).send('Internal Server Error');
        })

        const trashData = new trashModel({
            name :document.name,
            username:document.username,
            password:document.password,
            url:document.url,
            note:document.note,
            userid:req.user._id,
            type:document.type,
            _id:document.id,

            bankName:document.bankName,
            cvv:document.cvv,
            cardholder:document.cardholder,
            cardnumber:document.cardnumber,
            expiryMonth:document.expiryMonth,
            expiryYear:document.expiryYear,
        })
        await trashData.save().then((result)=>{
            res.send("Data moved to trash Sucessfully")
            isMoved=true;
            }).catch((e)=>{
                console.log("err",e)
                res.status(500).send("Something went Wrong")
            })
        
            if(isMoved){
                await UserLoginAndCardDetail.findByIdAndDelete({_id:id}).then((result)=>{
                    console.log("Data removed and moved to Trashed ")
                }).catch((err)=>{
                    console.log("Error while delete data from origin",err)
                })

            }

    }
} 

const restoreFromTrash = async(req,res)=>{
    if(!req.body.id){
        res.send("fill the post id ")
    }
    else{
        let id =req.body.id
        let document={};
        let isMoved=false

        await trashModel.findById({_id:id}).then((result)=>{
            document=result
        }).catch((err)=>{
            console.log("error",err)
            res.status(500).send('Internal Server Error');
        })

        const restoreData = new UserLoginAndCardDetail({
            name :document.name,
            username:document.username,
            password:document.password,
            url:document.url,
            note:document.note,
            userid:req.user._id,
            type:document.type,
            _id:document.id,

            bankName:document.bankName,
            cvv:document.cvv,
            cardholder:document.cardholder,
            cardnumber:document.cardnumber,
            expiryMonth:document.expiryMonth,
            expiryYear:document.expiryYear,
        })
        await restoreData.save().then((result)=>{
            res.send("Data restore from trash Sucessfully")
            isMoved=true;
            }).catch((e)=>{
                console.log("err",e)
                res.status(500).send("Something went Wrong")
            })
        
            if(isMoved){
                await trashModel.findByIdAndDelete({_id:id}).then((result)=>{
                    console.log("Data deleted from Trashed restore successfully ")
                }).catch((err)=>{
                    console.log("Error while delete data from trash",err)
                })

            }

    }
}
const viewTrash= async(req,res)=>{
    const userid=req.user._id
    trashModel.find({"userid":userid}).then(result=>{
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

module.exports={moveToTrash,restoreFromTrash,viewTrash}