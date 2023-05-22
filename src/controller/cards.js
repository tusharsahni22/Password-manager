const userCardModel = require("../database/userCardDetails")

const addCardDetails=(req,res)=>{
    if(!req.body.bankName || !req.body.cvv || !req.body.cardholder || !req.body.cardnumber || !req.body.expiryMonth || !req.body.expiryYear){
        req.status().send("please fill all the details")
    }else{
        const data = new userCardModel({
            bankName:req.body.bankName,
            cvv:req.body.cvv,
            cardholder:req.body.cardholder,
            cardnumber:req.body.cardnumber,
            expiryMonth:req.body.expiryMonth,
            expiryYear:req.body.expiryYear

        })

        data.save().then((result)=>{
            res.send(result)
        }).catch((err)=>{
            res.send(err)
        })
    }
}

module.exports={addCardDetails}