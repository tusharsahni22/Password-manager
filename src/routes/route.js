const express = require("express")
bodyParser = require('body-parser')
const router = express.Router();
const {singUpUser , login } = require("../controller/auth")
const {addPost,UpdatePost,getPost} =require("../controller/Post")
const {authTokenCheck} = require("../middleware/middleware")

router.use(express.json())
router.use(bodyParser.json())

router.route("/signup").post(singUpUser)
router.route("/login").get(login)

router.route("/addPost").post(authTokenCheck , addPost)
router.route("/updatePost/:id").put(authTokenCheck , UpdatePost)
router.route("/getPost/:id").get(authTokenCheck , getPost)


module.exports = router