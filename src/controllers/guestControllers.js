const guestModel = require('../models/guestModel');
const {uploadToS3} = require('../utils/S3Upload')
const { v4: uuidv4 } = require('uuid');
const eventModel = require('../models/eventModel');




 
exports.adhaarUpload = (req, res) => {
    const newId = uuidv4();
    let fileType = req.file.mimetype.split('/')[1]
    uploadToS3(req.file, newId, req.params.folder);
    res.send({videoUrl:`https://weddingkj.s3.ap-south-1.amazonaws.com/${req.params.folder}/${newId}.${fileType}`});
  }


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
        let event = await eventModel.findById(req.params.id);
        if(!event)return res.status(404).send({success:false , msg:"Event Not Found !!"});
        
        let guest = await guestModel.find({eventid:req.params.id,phoneNumber:req.body.phoneNumber});
        if(!guest)return res.status(404).send({success:false , msg:"Phone Number Not Found !!"});
        
        const { email , numberOfPeople  ,peopleDetails, travelItinerary , photoId , driverStay , driver  , numberOfChild , numberOfAdult , travelPlan , pickupReq , driverNumber , driverName , arrival , departure }= req.body;

        guest = await guestModel.findOneAndUpdate({eventid:req.params.id,phoneNumber:req.body.phoneNumber},{peopleDetails, email ,rsvp : true, numberOfPeople , travelItinerary:travelItinerary.videoUrl , photoId , driver  , driverStay, numberOfChild , numberOfAdult , travelPlan , pickupReq , driverNumber , driverName  ,arrival, departure  } );
        res.json({success:true , msg:'Your presence will be awaited'});

    } catch (error) {
        console.log(error);
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

exports.viewEventGuests = async(req,res)=>{
    try {
        const guest = await guestModel.find({eventid:req.params.id}).populate('eventid');
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
exports.verifyByPhone = async(req,res)=>{
    try {
        let event = await guestModel.findOne(req.body);
        if(!event)return res.status(404).send({success:false, msg:"Please Contact the Owner for more details"});
        res.json({success:true , msg:'Please Verify More Details',res:event});

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false , msg:"some error occured"});
    }
}

