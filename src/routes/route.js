const express = require("express")
const router = express.Router();
const {singUpUser , login } = require("../controller/auth")
const {addPost} =require("../controller/Post")
const {authTokenCheck} = require("../middleware/middleware")

router.use(express.json())

router.route("/signup").post(singUpUser)
router.route("/login").get(login)

router.route("/addPost").post(authTokenCheck , addPost)


module.exports = router