const nodemailer = require('nodemailer')
const log = console.log
const organization_email = process.env.EMAIL_ID;
const organization_password =process.env.EMAIL_PASSWORD;

exports.contactFormResponse = async(req,res,next) => {
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
        subject: 'Contact us form response',
        html: ` <p>Name: ${req.body.name} <br> Email: ${req.body.email}<br>  Phone Number : ${req.body.phoneNumber} <br> Message: ${req.body.message} </p> <br><br><h2>We will contact you as soon as possible! Thanks for your interest!</h2>`
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
    console.log(error)
}
}
