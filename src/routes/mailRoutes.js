const express = require("express");
const { contactFormResponse } = require("../controllers/eventController");
const router = express.Router();
//signup
router.route('/')
        .post(contactFormResponse);

module.exports = router;
