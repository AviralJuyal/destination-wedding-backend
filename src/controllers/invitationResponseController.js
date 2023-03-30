const invitationResponse = require("../models/invitationResponseModel");
const nodemailer = require('nodemailer')
const log = console.log
const organization_email = process.env.EMAIL_ID;
const organization_password =process.env.EMAIL_PASSWORD;

exports.addResp = async(req,res)=>{
    try {
        let resp = await invitationResponse.create(req.body);
        // res.status(200).send({success:true , msg: "created successfully"})
       try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: organization_email , 
                pass: organization_password 
            }
        });
    
        // Structure of mail
        let mailOptions = {
            from: organization_email, 
            to: ` ${organization_email },${req.body.email}`, 
            subject: 'Invitation Response',
            html: ` <p>Name: ${req.body.name} <br> Email: ${req.body.email}<br>  Phone Number : ${req.body.phoneNumber} <br> Message: ${req.body.message} </p> <br><br><h2>Your request for creating your own personalized invitation has been recorded.
            We will be getting back to you shortly!</h2> <br>
            Call us at this number :<a
            href="tel:+919911987961"
            rel="noopener noreferrer">+919911987961</a> <br>
            <p>
            Regards. <br>
            Planmywedding.co.in <br>
            Page3Events</p>`
        };
        
        // sending mail
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                res.send({err})
                console.log(err)
                return log('Error occurs');
            }
            res.send({success:true,msg:"Thanks for Contacting Us! We'll contact you shortly!"})
            return log('Email sent!!!');
        });
       } catch (error) {
        console.log(error);
        res.status(500).send({success:false ,  msg:"some error occured in mail"});
       } 
    } catch (error) {
        console.log(error);
        success = false;
        res.status(500).send(success, "some error occured");
    }
}

