const productModel = require("../models/productModel");

exports.createProduct = async(req,res,next) => {
    try {
        let category=[]
        if(!req.body.category) {category.push("bridalAccessories")}
        await productModel.create({...req.body, category})
        res.status(200).send({success:true, msg:"product created successfully!"})
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: "some error occured!" });
    }
}
exports.updateProduct = async(req,res,next) => {
    const {id} = req.params
    try {
        let productToFind = await productModel.findById(id)
        if(!productToFind) return res.status(404).send({success:false, msg:'product not found!'})
        await productModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({success:true, msg:"product updated successfully!"})
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: "some error occured!" });
    }
}
exports.deleteProduct = async(req,res,next) => {
    const {id} = req.params
    try {
        let productToFind = await productModel.findById(id)
        if(!productToFind) return res.status(404).send({success:false, msg:'product not found!'})
        await productModel.findByIdAndDelete(id,req.body)
        res.status(200).send({success:true, msg:"product deleted successfully!"})
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: "some error occured!" });
    }
}
exports.getProducts = async (req,res,next) => {
    try{
        let colour="",category="";
        //filter selection
        if(req.query.colour) colour= req.query.colour;
        if(req.query.category) category= req.query.category;
        let products = await productModel.find({
            category:{ $regex : category , $options:'i' },
            colour:{ $regex : colour , $options:'i' }
        })
        res.status(200).send({success:true, msg:"items fetched successfully!",products})
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: "some error occured!" });
    }
}