const express = require("express");
const { addGuest , editGuest , deleteGuest , viewGuest , viewAllGuest , editGuestAdmin , adhaarUpload} = require("../controllers/guestControllers");
const { fetchuser} = require("../middleware/fetchuser");
const router = express.Router();

router.route('/add')
        .post(fetchuser,addGuest)

router.route('/viewall')
        .get(fetchuser,viewAllGuest)

router.route('/view/:id')
        .get(fetchuser,viewGuest)

router.route('/edit/:id')
        .patch(editGuest)
        .put(fetchuser,editGuestAdmin)

router.route('/delete/:id')
        .delete(fetchuser,deleteGuest)

router.route('/adhaar')
        .post(adhaarUpload)


 
module.exports = router;