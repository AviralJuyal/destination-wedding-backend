const express = require("express");
const { loginUser , createUser, User} = require("../controllers/userControllers");
const { fetchuser} = require("../middleware/fetchuser");
const router = express.Router();
//signup
router.route('/create')
        .post(createUser);
        //login
router.route('/login')
        .post(loginUser)
router.route('/')
        .get(fetchuser,User)

module.exports = router;
