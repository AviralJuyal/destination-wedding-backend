const express = require("express");
const { addGuest , editGuest , deleteGuest , viewGuest,viewEventGuests , viewAllGuest , editGuestAdmin , adhaarUpload, verifyByPhone} = require("../controllers/guestControllers");
const { fetchuser} = require("../middleware/fetchuser");
const multer = require("multer");
const router = express.Router();
const videoUpload = multer({
   
        // storage: videoStorage,
        limits: {
        fileSize: 50000000 // 10000000 Bytes = 50 MB
        },
        fileFilter(req, file, cb) {
        //     console.log('dj')
        cb(undefined, true)
    }
    })

router.route('/add')
        .post(fetchuser,addGuest)

router.route('/viewall')
        .get(fetchuser,viewAllGuest)

router.route('/view/:id')
        .get(fetchuser,viewGuest)

router.route('/viewEventGuest/:id')
        .get(fetchuser,viewEventGuests)

router.route('/edit/:id')
        .patch(editGuest)
        .put(fetchuser,editGuestAdmin)

router.route('/delete/:id')
        .delete(fetchuser,deleteGuest)

router.route('/upload/:folder')
// videoUpload.single('video'),
        .post(videoUpload.single('file'),adhaarUpload)
router.route('/verifyByPhone')
        .post(verifyByPhone)


 
module.exports = router;