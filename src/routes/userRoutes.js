const express = require("express");
const { loginUser , createUser} = require("../controllers/userControllers");
const router = express.Router();

router.route('/create')
        .post(createUser);
router.route('/login')
        .post(loginUser)

module.exports = router;
