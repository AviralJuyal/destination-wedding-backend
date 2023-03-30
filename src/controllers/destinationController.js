const destinationModel = require("../models/destinationModel");
const userModel = require("../models/userModel");

exports.addDest = async (req, res) => {
    try {
        let user = await userModel.findById(req.user.id);
        if (!user)
            return res.status(404).send({ success: false, msg: "user not found" });

        let destination = await destinationModel.create(req.body);
        res.status(200).send({ success: true, msg: "destination created successfully !" });

  } catch (error) {
        console.log(error);
        success = false;
        res.status(500).send({success, msg:"some error occured"});
  }
};


exports.viewAllDest= async(req,res)=>{
    try {
        let destination = await destinationModel.find();
        if(!destination)
            res.status(404).send({success:false,msg:'Not Found'});

        res.status(200).send({success:true , destination})
        
    } catch (error) {
        console.log(error);
        success = false;
        res.status(500).send({success, msg:"some error occured"});
    }
}

exports.viewDest = async(req,res)=>{
    try {
        let destination = await destinationModel.findById(req.params.id);
        if(!destination)
            res.status(404).send({success:false,msg:'Not Found'});
        
        res.status(200).send({success:true , destination})
        
    } catch (error) {
        console.log(error);
        success = false;
        res.status(500).send({success, msg:"some error occured"});
    }
}

exports.deleteDest = async(req,res)=>{
    try {
        let destination = await destinationModel.findById(req.params.id);
        if(!destination)
            res.status(404).send({success:false,msg:'Not Found'});

        await destinationModel.findByIdAndDelete(req.params.id);
        res.status(200).send({success:true , msg:"deleted successfully !"})

    } catch (error) {
        console.log(error);
        success = false;
        res.status(500).send({success, msg:"some error occured"});
    }
}

exports.editDest = async(req,res)=>{
    try {
        let user = await userModel.findById(req.user.id);
        if (!user)
            return res.status(404).send({ success: false, msg: "user not found" });
        
        let destination = await destinationModel.findById(req.params.id);
        if(!destination)
                res.status(404).send({success:false,msg:'Not Found'});

        destination = await destinationModel.findByIdAndUpdate(req.params.id , req.body);
        res.status(200).send({success:true,msg:"Updated successfully !"});
    } catch (error) {
        console.log(error);
        success = false;
        res.status(500).send({success, msg:"some error occured"});
    }
}