const fast2sms = require("fast-two-sms");
require("dotenv").config();

exports.fast2sms = async ({ message, contactNumber }) => {
    try {
      const res = await fast2sms.sendMessage({
        authorization: process.env.FAST2SMS,
        message,
        numbers: [contactNumber],
        // route:'t',
        language:'english'
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };