const express = require("express");
const { addEvent , editEvent , deleteEvent , viewEvent , viewAllEvent} = require("../controllers/eventControllers");
const { fetchuser} = require("../middleware/fetchuser");
const router = express.Router();

router.route('/add')
        .post(fetchuser,addEvent)

router.route('/viewall')
        .get(fetchuser,viewAllEvent)

router.route('/view/:id')
        .get(fetchuser,viewEvent)

router.route('/edit/:id')
        .put(fetchuser,editEvent)

router.route('/delete/:id')
        .delete(fetchuser,deleteEvent)

 
module.exports = router;
