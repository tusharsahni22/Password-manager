const jwt = require("jsonwebtoken");
const UserCredential = require("../database/user");

const authTokenCheck = async(req,res,next)=> {
    let token = req.headers.token
    TokenArray = token.split(" ")
    jwt.verify(TokenArray[1],"secretKey",(err,payload)=>{
        if(err){
            res.status(401).send(err)
        }
        else{
            requser = async ()=>{
                const{_id} =payload
                req.user= await UserCredential.findById(_id)
                next()
                
            }
            requser()
        }
    
    })
 

}
module.exports = {authTokenCheck}
