const express = require("express");
const { addDest , editDest , viewAllDest , viewDest, deleteDest } = require("../controllers/destinationController");
const { fetchuser} = require("../middleware/fetchuser");
const router = express.Router();

router.route('/:id')
        .put(fetchuser , editDest)
        .get(viewDest)
        .delete(fetchuser , deleteDest)
        

router.route('/')
        .post(fetchuser , addDest)
        .get(viewAllDest)
        



module.exports = router;