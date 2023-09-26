const UserLoginAndCardDetail = require("../database/UserLoginAndCardDetail")
const trashModel = require("../database/trash")

const moveToTrash = async(req,res)=>{
    if(!req.body.id){
        res.send("fill the post id ")
    }
    else{
        let id =req.body.id
        let document={};

        await UserLoginAndCardDetail.findById({_id:id}).then((result)=>{
            console.log("result",result)
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

            bankName:document.bankName,
            cvv:document.cvv,
            cardholder:document.cardholder,
            cardnumber:document.cardnumber,
            expiryMonth:document.expiryMonth,
            expiryYear:document.expiryYear,
        })

        console.log("data",trashData)

        // await trashData.save().then((result)=>{
        //     res.send("Request created Sucessfully")
        //     }).catch((e)=>{
        //         console.log("err",e)
        //         res.status(500).send("Something went Wrong")
        //     })

    }
}
module.exports={moveToTrash}