const userModel = require("../models/userModel");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// const userModel = require("../models/userModel");
const nodemailer = require('nodemailer')
const log = console.log
const organization_email = process.env.EMAIL_ID;
const organization_password =process.env.EMAIL_PASSWORD;

const jwt_token = process.env.JWT_TOKEN;

exports.createUser = async (req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email });

        if(user)
            return res.status(400).json({success:false,error:"Sorry , A user already exists"})
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await userModel.create({
            ...req.body,
            password:secPass,
            verified:false
        });

        //sending mails
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
                to: `${req.body.email}`, 
                subject: 'Confirm your account ',
                html: ` <p>Hi ${req.body.name} <br> 
                Please click on the link below to verify your email ${req.body.email} </p> <br>
                <a href="http://localhost:8080/api/user/verify/${user.id}" style="text-decoration:none;">
                <button style="display: inline-block;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: white;
                border-radius: 4px;
                text-decoration: none;
                font-size: 16px;
                font-weight: bold;">Click here to verify</button>
                </a>
                `
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
        
          
          res.json({success:true , msg:"user created successfully"})

    } catch (error) {
     console.log(error)  
     res.status(500).send({success:true , msg:"some error occured"});
    }
}

exports.verifyUser =async(req,res)=>{
    try {
        let user = await userModel.findById(req.params.id);
        if(!user)
            return res.status(404).send({success:true , msg:"user not found"});

        if(user.verified)
            return res.status(404).send({success:true , msg:"user already verified !"});
        
        user = await userModel.findByIdAndUpdate(req.params.id,{verified:true});
        
          res.status(200).send("verified user successfully now please login")
    } catch (error) {
        console.log(error)  
        res.status(500).send({success:true , msg:"some error occured"});
    }
}

exports.loginUser = async (req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email});
        if(!user)
            return res.status(404).json({success:false,msg:'Please Enter correct credentials '});
        
        if(user.verified === false)
            return res.status(400).json({success:false ,msg:'Please verify your email first !'});

        let pass = await bcrypt.compare(req.body.password, user.password);
        
        if(!pass)
            return res.status(400).json({success:false,msg:'Please Enter correct credetials !'});

        const data = {
                user:{
                    id: user.id
                }
        }
        const authToken = jwt.sign(data , jwt_token);
        res.json({success:true , authToken, user})

        
    } catch (error) {
        console.log(error);
        res.status(500).send({success:true , msg:"some error occured"});
    }
}

exports.User = async (req,res)=>{
    try {
        let user = await userModel.findById(req.user.id);
        if(!user) return res.status(404).send({success:false, msg:'user not found!'})
        res.json({success:true ,  user})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({success:true , msg:"some error occured"});

    }
}

exports.updateUser = async(req , res ) =>{
    try {
        let user = await userModel.findById(req.user.id);
        if(!user) return res.status(404).send({success:false , msg: "user not found !"});
        user = await userModel.findByIdAndUpdate(req.user.id , req.body);
        res.json({success:true ,  msg: "user updated ! "});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:true , msg:"some error occured"});
    }
}

exports.updateAddress = async(req,res)=>{
    try {
        let user = await userModel.findById(req.user.id);
        if(!user) return res.status(404).send({success:false , msg: "user not found !"});
        let a = user.address;
        a = user.address.filter(e => e.addressType !== req.body.addressType)
        a.push(req.body)
        user = await userModel.findByIdAndUpdate(req.user.id , {address:a});
        res.json({success:true ,  msg: "user's address updated!"});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:true , msg:"some error occured"});

    }
}
