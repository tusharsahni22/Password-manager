const express = require("express")
bodyParser = require('body-parser')
const router = express.Router();
const {singUpUser , login } = require("../controller/auth")
const {addPost,UpdatePost,getPost} =require("../controller/Post")
const {authTokenCheck} = require("../middleware/middleware");
const { addCardDetails } = require("../controller/cards");

router.use(express.json())
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.route("/signup").post(singUpUser)
router.route("/login").post(login)

router.route("/addPost").post(authTokenCheck , addPost)
router.route("/updatePost/:id").put(authTokenCheck , UpdatePost)
router.route("/getPost/:id").get(authTokenCheck , getPost)
router.route("/addCard").post(authTokenCheck , addCardDetails)


module.exports = router