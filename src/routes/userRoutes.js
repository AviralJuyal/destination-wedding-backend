const express = require("express");
const { loginUser , createUser, User , updateUser , updateAddress, verifyUser } = require("../controllers/userControllers");
const { fetchuser} = require("../middleware/fetchuser");
const router = express.Router();
//signup
router.route('/create')
        .post(createUser);
        //login
router.route('/login')
        .post(loginUser)

router.route('/verify/:id')
        .get(verifyUser)

router.route('/')
        .get(fetchuser,User)
        .put(fetchuser ,updateUser)
        
router.route('/updateAddress')
        .put(fetchuser , updateAddress)

module.exports = router;
