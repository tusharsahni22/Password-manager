const userCardModel = require("../database/userLoginDetails")

const addCardDetails=(req,res)=>{
    if(!req.body.bankName || !req.body.cvv || !req.body.cardholder || !req.body.cardnumber || !req.body.expiryMonth || !req.body.expiryYear){
        res.status(404).send("please fill all the details")
    }else{
        const data = new userCardModel({
            bankName:req.body.bankName,
            cvv:req.body.cvv,
            cardholder:req.body.cardholder,
            cardnumber:req.body.cardnumber,
            expiryMonth:req.body.expiryMonth,
            expiryYear:req.body.expiryYear,
            userid:req.user._id

        })

        data.save().then((result)=>{
            res.status(201).send(result)
        }).catch((err)=>{
            console.log(err)
            res.status(500).send("Something went Wrong")

        })
    }
}
const getCardDetail = async(req,res)=>{
    postId=req.params.id
    userCardModel.findById(postId).then(result=>{
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
const getAllCardByUserId = async(req,res)=>{
    const userid=req.user._id
    
    userCardModel.find(userid).then(result=>{
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

module.exports={addCardDetails,getAllCardByUserId,getCardDetail}