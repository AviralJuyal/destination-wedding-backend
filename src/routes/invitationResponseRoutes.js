const express = require("express");
const { addResp } = require("../controllers/invitationResponseController");
const router = express.Router();

router.route('/')
        .post(addResp)


module.exports = router;