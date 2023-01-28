const express = require("express");
const { addEvent , editEvent , deleteEvent , viewEvent , viewAllEvent, downloadCsv,getTrueEvent} = require("../controllers/eventControllers");
const { fetchuser} = require("../middleware/fetchuser");
const router = express.Router();

router.route('/add')
        .post(fetchuser,addEvent)

router.route('/viewall')
        .get(fetchuser,viewAllEvent)

router.route('/view/:id')
        .get(viewEvent)

router.route('/viewTrue')
        .get(getTrueEvent)

router.route('/edit/:id')
        .put(fetchuser,editEvent)

router.route('/delete/:id')
        .delete(fetchuser,deleteEvent)

router.route('/downloadcsv/:id')
        .get( downloadCsv)
        

 
module.exports = router;
