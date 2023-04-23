const express = require("express")
const router = express.Router();
const {singUpUser , login } = require("../controller/auth")

router.use(express.json())

router.route("/singup").get(singUpUser)
router.route("/login").get(login)


module.exports = router