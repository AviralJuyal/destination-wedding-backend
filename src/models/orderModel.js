const mongoose = require('mongoose');
const userModel = require('./userModel');
const productModel = require('./productModel');

const order = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
    },
    product:[{
        productName:{
            type: mongoose.Schema.Types.ObjectId,
            ref: productModel,
        },
        productQuantity:Number
    }],
    addressId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
    },
    addressType:String,
    DeliveryPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
    },
    DeliveryDate:{
        type:Date
    },
    payment:String,
    deliveryStatus:{
        type:String,
        default:'orderConfirmed',
        enums:["orderConfirmed", "outForDeliver", "delivered","returned"]
    }
},{
timestamps:true
});

module.exports = mongoose.model('orders', order);