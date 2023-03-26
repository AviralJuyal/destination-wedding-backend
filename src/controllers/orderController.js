const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

exports.createOrder = async (req,res)=>{
    try {
        let order = orderModel.create(req.body);
        res.status(200).send({success: true , msg:"order created successfully !"});
    } catch (error) {
        console.log(error)  
        success =false;
        res.status(500).send(success , "some error occured"); 
    }
}

exports.ordersOfUser = async (req, res)=>{
    try {
        //user not found
        let user = userModel.findById(req.user.id);
        if(!user) return res.status(404).send({success:false , msg: "user not found"});

        let orders = orderModel.find({user:req.user.id});
        if(!orders) return res.status(404).send({success:false , msg: "orders not found"});

        return res.status(200).send({success:true , orders  });
    } catch (error) {
        console.log(error)  
        success =false;
        res.status(500).send(success , "some error occured"); 
    }
}

exports.orderDetail = async (req, res)=>{
    try {
        let order = orderModel.find(req.params.id);
        if(!order) return res.status(404).send({success:false , msg: "orders not found"});

        return res.status(200).send({success:true , order  });
    } catch (error) {
        console.log(error)  
        success =false;
        res.status(500).send(success , "some error occured"); 
    }
}

exports.orderUpdate = async(req , res)=>{
    try {
        let order = orderModel.find(req.params.id);
        if(!order) return res.status(404).send({success:false , msg: "order not found"});

        order = orderModel.findByIdAndUpdate(req.params.id , req.body);
        res.status(200).send({success:true , msg: "orders updated" });
    } catch (error) {
        console.log(error)  
        success =false;
        res.status(500).send(success , "some error occured"); 
    }
}

exports.orderDelete = async(req, res) => {
    try {
        let order = orderModel.find(req.params.id);
        if(!order) return res.status(404).send({success:false , msg: "order not found"});

        order = orderModel.findByIdAndDelete(req.params.id);
        res.status(200).send({success:true , msg: "orders deleted" });

    } catch (error) {
        console.log(error)  
        success =false;
        res.status(500).send(success , "some error occured"); 
    }
}