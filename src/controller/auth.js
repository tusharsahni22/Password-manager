const UserCredential = require("../database/user")

const singUpUser = async(req,res)=>{
    const userData = new UserCredential({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }) 
console.log( userData.name ,userData.email, userData.password)
await userData.save().then((result)=>{
    res.send(result)
}).catch((err)=>{
    console.log(err)
})
}

const login = (req,res)=>{
    res.send("working")
}

module.exports = {singUpUser , login}