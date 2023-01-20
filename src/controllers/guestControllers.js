const guestModel = require('../models/guestModel');

exports.addGuest= async(req,res)=>{
    try {
        await guestModel.create({...req.body });
        res.status(200).json({status:true , msg: "guest Added" });
    } catch (error) { 
        console.error(error.message);
        res.status(500).send("some error occured");
    }
}

exports.editGuest = async(req,res)=>{
    try {
        let guest = await guestModel.findById(req.params.id);
        if(!guest)return res.status(404).send("Not Found !!");

        guest = await guestModel.findByIdAndUpdate(req.params.id , req.body);
        res.json(guest );

    } catch (error) {
        console.log(error)
        res.status(500).send("some error occured");
    }
}

exports.viewAllGuest= async(req,res)=>{
    try {
        const guest = await guestModel.find()
        if(!guest){
            res.status(404).send('Not Found');
        }
        
        return res.json(guest);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
}

exports.viewGuest = async(req,res)=>{
    try {
        const guest = await guestModel.findById(req.params.id);
        if(!guest){
            res.status(404).send('Not Found');
        }
        return res.json(guest);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
}

exports.deleteGuest = async(req,res)=>{
    try {
        let guest = await guestModel.findById(req.params.id);
        if(!guest)return res.status(404).send("Not Found !!");

        guest = await guestModel.findByIdAndDelete(req.params.id);
        res.json('deleted successfully ');

    } catch (error) {
        console.log(error);
        res.status(500).send("some error occured");
    }
}