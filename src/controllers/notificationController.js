const {fast2sms} = require('../utils/sendMsg')
// const userModel = require("../models/userModel");

const jwt_token = process.env.JWT_TOKEN;


exports.sendMessage = async (req, res, next)=>{
    console.log(req.body.phone_no)
    try {
        await fast2sms(
            {
              message: `Welcome`,
              contactNumber: req.body.phone_no,
            }
          );
    res.status(200).send({msg:'Message sent!'})
        
    } catch (error) {
        console.log(error);
        success=false;
        res.status(500).send(success , "some error occured");

    }
}
