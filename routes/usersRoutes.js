const express = require("express");
const router = express.Router();
const {
    RegisterUser,
    LoginUser,
    CurrentUser
} = require("../Controllers/usersController");


router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/currect").post(CurrentUser);



module.exports = router;