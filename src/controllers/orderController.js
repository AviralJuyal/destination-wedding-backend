const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

exports.createOrder = async (req,res)=>{
    try {
        let order = await orderModel.create(req.body);
        res.status(200).send({success: true , msg:"order created successfully !"});
    } catch (error) {
        console.log(error)  
        res.status(500).send({success:false , msg:"some error occured"}); 
 
    }
}

exports.ordersOfUser = async (req, res)=>{
    try {
        //user not found
        let user = await userModel.findById(req.user.id);
        if(!user) return res.status(404).send({success:false , msg: "user not found"});
        
        let orders = await orderModel.find({user:req.user.id}).populate('user');
        // console.log(orders)
        return res.status(200).send({success:true , orders  });
        
    } catch (error) {
        console.log(error)  
        
        res.status(500).send({success:false , msg:"some error occured"}); 
    }
}

exports.orderDetail = async (req, res)=>{
    try {
        let order = orderModel.find(req.params.id);
        if(!order) return res.status(404).send({success:false , msg: "orders not found"});

        return res.status(200).send({success:true , order  });
    } catch (error) {
        console.log(error)  
        
        res.status(500).send({success:true , msg:"some error occured"}); 
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
        res.status(500).send({success:true , msg:"some error occured"}); 

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
        res.status(500).send({success:true , msg:"some error occured"});  
    }
}