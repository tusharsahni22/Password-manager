const express = require("express")
bodyParser = require('body-parser')
const router = express.Router();
const {singUpUser , login } = require("../controller/auth")
const {addPost,UpdatePost,getPost, getAllPostByUserId, addAll, deleteById} =require("../controller/Post")
const {authTokenCheck} = require("../middleware/middleware");
const { addCardDetails, getAllCardByUserId, getCardDetail } = require("../controller/cards");
const { getUserDetails, updateUserDetails } = require("../controller/userProfile");
const { moveToTrash, restoreFromTrash, viewTrash,EmptyTrash } = require("../controller/trash");

router.use(express.json())
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.route("/signup").post(singUpUser)
router.route("/login").post(login)
router.route("/addAll").post(authTokenCheck , addAll)
router.route("/delete").post(authTokenCheck , deleteById)

//Get all card as well as login data by /getPost api
router.route("/getPost").get(authTokenCheck , getAllPostByUserId)
router.route("/getCard").get(authTokenCheck , getAllCardByUserId)

router.route("/addCard").post(authTokenCheck , addCardDetails)
router.route("/addPost").post(authTokenCheck , addPost)

router.route("/updatePost/:id").put(authTokenCheck , UpdatePost)
router.route("/updateUser").put(authTokenCheck , updateUserDetails)

router.route("/getPost/:id").get(authTokenCheck , getPost)
router.route("/getCard/:id").get(authTokenCheck , getCardDetail)
router.route("/getUser").get(authTokenCheck , getUserDetails)

router.route("/trash").post(authTokenCheck , moveToTrash)
router.route("/restore").post(authTokenCheck , restoreFromTrash)
router.route("/view-trash").get(authTokenCheck , viewTrash)
router.route("/emptytrash").post(authTokenCheck , EmptyTrash)


module.exports = router