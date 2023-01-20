const express = require("express");
const { addGuest , editGuest , deleteGuest , viewGuest , viewAllGuest} = require("../controllers/guestControllers");
const { fetchuser} = require("../middleware/fetchuser");
const router = express.Router();

router.route('/add')
        .post(fetchuser,addGuest)

router.route('/viewall')
        .get(fetchuser,viewAllGuest)

router.route('/view/:id')
        .get(fetchuser,viewGuest)

router.route('/edit/:id')
        .post(editGuest)

router.route('/delete/:id')
        .post(fetchuser,deleteGuest)

 
module.exports = router;