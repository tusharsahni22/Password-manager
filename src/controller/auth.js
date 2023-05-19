const UserCredential = require("../database/user");
const { encrypt, decrypt } = require("../controller/encrpytion");
const jwt = require("jsonwebtoken");
require("dotenv").config();


tokenGenrate = async (_id) => {
  const token = await jwt.sign({ _id }, process.env.JWTSECRETKEY, {
    expiresIn: "24h",
  });
  return token;
};

const singUpUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).send("please fill all the details");
  }

  const userData = new UserCredential({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  let alreadyUserCheck = await UserCredential.findOne({
    email: userData.email,
  });

  if (alreadyUserCheck) {
    res.status(409).send("User already exits");
  } else {
        encryptedPassword = encrypt(userData.password);
    userData.password = encryptedPassword;
    await userData
      .save()
      .then((result) => {
        res.status(201).send({"message":"User Created","details":result});
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("please fill all the details");
  } 
  else{

    const userData = new UserCredential({
      email: req.body.email,
      password: req.body.password,
  });
  
  emailCheck = await UserCredential.findOne({
    email: userData.email,
  })
  if(!emailCheck){
    res.status(404).send("User Not found")
  }
  else{

    
    decryptedPassword = await decrypt(emailCheck.password)
    
    if(emailCheck && userData.password == decryptedPassword){
      token = await tokenGenrate(emailCheck._id)
      res.send(token)
    }else{
      res.status(401).send("Invaild Credentials")
    }
  }
}
};

module.exports = { singUpUser, login };
