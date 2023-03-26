const express = require("express");
const { sendMessage } = require("../controllers/notificationController");
const router = express.Router();

router.route('/send-message')
        .post(sendMessage);

module.exports = router;
