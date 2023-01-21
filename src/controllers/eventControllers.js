const eventModel = require('../models/eventModel');

exports.addEvent= async(req,res)=>{
    try {
        await eventModel.create({...req.body})
        res.status(200).json({success:true , msg: "Event Added" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({success:false , msg:"some error occured"});
    }
}

exports.viewEvent = async(req,res)=>{
    try {
        const event = await eventModel.findById(req.params.id);
        if(!event){
            res.status(404).send({success:false, msg:'Not Found'});
        }
        // console.log(event)
        return res.json({success:true , event});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({success:false , msg:"some error occured"});
    }
}

exports.viewAllEvent = async(req,res)=>{
    try {
        const event = await eventModel.find()
        if(!event){
            res.status(404).send({success:false, msg:'Not Found'});
        }
        // console.log(event)
        return res.json({success:true , event});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({success:false , msg:"some error occured"});
    }
}

exports.editEvent = async(req,res)=>{
    try {
        let event = await eventModel.findById(req.params.id);
        if(!event)return res.status(404).send({success:false, msg:"Not Found !!"});

        event= await eventModel.findByIdAndUpdate(req.params.id , req.body);
        res.json({success:true , event});

    } catch (error) {
        console.log(error)
        res.status(500).send({success:false , msg:"some error occured"});
    }
}

exports.deleteEvent = async(req,res)=>{
    try {
        let event = await eventModel.findById(req.params.id);
        if(!event)return res.status(404).send({success:false, msg:"Not Found !!"});

        event = await eventModel.findByIdAndDelete(req.params.id);
        res.json({success:true , msg:'deleted successfully '});

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false , msg:"some error occured"});
    }
}