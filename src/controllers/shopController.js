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
exports.getProductById = async(req,res,next) => {
    const {id} = req.params
    try {
        let productToFind = await productModel.findById(id)
        if(!productToFind) return res.status(404).send({success:false, msg:'product not found!'})
        res.status(200).send({success:true, msg:"product updated successfully!", product: productToFind})
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
        let col = null;
        //filter selection
        if(req.query.colour) {
            colour= req.query.colour;
            col = colour.split(',');
        }
        // console.log(col)
        if(req.query.category) category= req.query.category;
        let products=new Set();
        let temp='';
        if(!col){
            products = await productModel.find();
        }
        else{
            for(e in col){
                temp = await productModel.find({
                    category:{ $regex : category , $options:'i' },
                    colour:{ $regex : col[e] , $options:'i' }
                })
                if(temp.length>0)
                    temp.forEach(e=>{
                        products.add(e);
                    }) 
            }
        }

        let arr = [];
        products.forEach(e=>{
            arr.push(e);
        })
        
        
        res.status(200).send({success:true, msg:"items fetched successfully!",products:arr})
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: "some error occured!" });
    }
}

exports.idProducts = async(req,res) => {
    try {
        const {id} = req.body;
        let arr = [];
        if(id.length>0){
            for(e of id){
                let prod = await productModel.findById(e)
                arr.push(prod);
            }
        }
        res.status(200).send({success:true, msg:"items fetched successfully!",products:arr});
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: "some error occured!" });
    }
}