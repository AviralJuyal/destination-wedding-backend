const guestModel = require('../models/guestModel');
const multer = require("multer");
const path = require('path');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');


const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  })

  const videoUpload = multer({
   
    // storage: videoStorage,
    limits: {
    fileSize: 50000000 // 10000000 Bytes = 50 MB
    },
    fileFilter(req, file, cb) {
        console.log('dj')
    cb(undefined, true)
}
})

const uploadToS3 = async (fileData,fileName) =>{

    console.log("FILEDATA", fileData);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `adhaar/${fileName}`,
    Body: fileData.buffer,
  }

let videoUrl=""
s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data.Location);
    videoUrl = data.Location;
    // resolve(data.Location)
  })
    return videoUrl
}

exports.adhaarUpload= (videoUpload.single('video'), (req, res) => {

    const newId = uuidv4();
    uploadToS3(req.file, newId);
    res.send({videoUrl:`https://weddingkj.s3.ap-south-1.amazonaws.com/adhaar/${newId}`});
  
  }, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
  })

exports.addGuest= async(req,res)=>{
    try {
        await guestModel.create({...req.body });
        res.status(200).json({success:true , msg: "guest Added" });
    } catch (error) { 
        console.error(error.message);
        res.status(500).send({success:false , msg:"some error occured"});
    }
}

exports.editGuest = async(req,res)=>{
    try {
        let guest = await guestModel.findById(req.params.id);
        if(!guest)return res.status(404).send({success:false , msg:"Not Found !!"});
        
        guest = await guestModel.find({phoneNumber:req.body.phoneNumber});
        if(!guest)return res.status(404).send({success:false , msg:"Phone Number Not Found !!"});
        
        const { name , email , numberOfPeople , namesOfPeople , travelItinerary , photoId , driverStay , driver}= req.body;

        guest = await guestModel.findByIdAndUpdate(req.params.id ,{name , email , numberOfPeople , travelItinerary , photoId , driver , namesOfPeople , driverStay } );
        res.json({success:true , guest});

    } catch (error) {
        console.log(error)
        res.status(500).send({success:false, msg:"some error occured"});
    }
}

exports.editGuestAdmin = async(req,res)=>{
    try {
        let guest = await guestModel.findById(req.params.id);
        if(!guest)return res.status(404).json({success:false , error:"Not Found !!"});
        
        guest = await guestModel.findByIdAndUpdate(req.params.id ,req.body);
        res.json({success:true ,guest});

    } catch (error) {
        console.log(error)
        success =false;
      res.status(500).send(success , "some error occured"); 
    }
}

exports.viewAllGuest= async(req,res)=>{
    try {
        const guest = await guestModel.find()
        if(!guest){
            res.status(404).send({success:false,msg:'Not Found'});
            
        }
        
        return res.json({success:true ,guest});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({success:false ,msg:"some error occured"});
    }
}

exports.viewGuest = async(req,res)=>{
    try {
        const guest = await guestModel.findById(req.params.id);
        if(!guest){
            res.status(404).send({success:false,msg:'Not Found'});
        }
        return res.json({success:true ,guest});
        
    } catch (error) {
        console.error(error.message);
        success =false;
      res.status(500).send({success , msg:"some error occured"}); 
    }
}

exports.deleteGuest = async(req,res)=>{
    try {
        let guest = await guestModel.findById(req.params.id);
        if(!guest)return res.status(404).send({success:false ,msg:"Not Found !!"});

        guest = await guestModel.findByIdAndDelete(req.params.id);
        res.json({success:true , msg:'deleted successfully'});

    } catch (error) {
        console.log(error);
        success =false;
        res.status(500).send(success , "some error occured"); 
    }
}

