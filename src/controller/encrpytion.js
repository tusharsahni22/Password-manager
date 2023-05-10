var CryptoJS = require("crypto-js");

const encrypt = (password)=>{
    var ciphertext = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
return ciphertext
}

const decrypt =  (password)=>{
    var text=password
    var bytes  = CryptoJS.AES.decrypt(password, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
    }

module.exports={encrypt,decrypt}