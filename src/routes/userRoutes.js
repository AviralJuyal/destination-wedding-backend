const express = require("express");
const { loginUser , createUser} = require("../controllers/userControllers");
const router = express.Router();
//signup
router.route('/create')
        .post(createUser);
        //login
router.route('/login')
        .post(loginUser)

module.exports = router;
