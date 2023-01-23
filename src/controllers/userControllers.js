const userModel = require("../models/userModel");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// const userModel = require("../models/userModel");

const jwt_token = process.env.JWT_TOKEN;

exports.createUser = async (req,res)=>{
    try {
        let user = await userModel.findOne({username:req.body.username });

        if(user)
            return res.status(400).json({success:false,error:"Sorry , A user already exists"})
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await userModel.create({
            ...req.body,
            password:secPass,
        });

        const data ={
            user:{
              id: user.id
            }
          }
          const authToken = jwt.sign(data , jwt_token);
          success = true;
          res.json({success , authToken})

    } catch (error) {
     console.log(error)  
     success =false;
      res.status(500).send(success , "some error occured"); 
    }
}

exports.loginUser = async (req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email});
        if(!user)
            return res.status(404).json({success:false,error:'Please Enter correct credentials '});
        
        let pass = await bcrypt.compare(req.body.password, user.password);
        
        if(!pass)
            return res.status(404).json({success:false,error:'Please Enter correct credetials'});

        const data = {
            user:{
                id:user.id,
            }
        }
        const authToken = jwt.sign(data , jwt_token);
        success= true;
        res.json({success , authToken, user})

        
    } catch (error) {
        console.log(error);
        success=false;
        res.status(500).send(success , "some error occured");

    }
}
exports.User = async (req,res)=>{
    try {
        let user = await userModel.findById(req.user.id);
        if(!user) return res.status(404).send({success:false, msg:'user not found!'})
        res.json({success:true ,  user})

        
    } catch (error) {
        console.log(error);
        success=false;
        res.status(500).send(success , "some error occured");

    }
}
