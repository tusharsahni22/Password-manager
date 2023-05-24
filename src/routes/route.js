const express = require("express")
bodyParser = require('body-parser')
const router = express.Router();
const {singUpUser , login } = require("../controller/auth")
const {addPost,UpdatePost,getPost, getAllPostByUserId} =require("../controller/Post")
const {authTokenCheck} = require("../middleware/middleware");
const { addCardDetails, getAllCardByUserId, getCardDetail } = require("../controller/cards");
const { getUserDetails, updateUserDetails } = require("../controller/userProfile");

router.use(express.json())
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.route("/signup").post(singUpUser)
router.route("/login").post(login)

router.route("/addPost").post(authTokenCheck , addPost)
router.route("/updatePost/:id").put(authTokenCheck , UpdatePost)
router.route("/getPost/:id").get(authTokenCheck , getPost)
router.route("/getPost").get(authTokenCheck , getAllPostByUserId)
router.route("/addCard").post(authTokenCheck , addCardDetails)
router.route("/getCard/:id").get(authTokenCheck , getCardDetail)
router.route("/getCard").get(authTokenCheck , getAllCardByUserId)
router.route("/getUser").get(authTokenCheck , getUserDetails)
router.route("/updateUser").put(authTokenCheck , updateUserDetails)


module.exports = router