const mongoose = require('mongoose');

const products = mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    discount:{
        type:Number
    },
    images:[{
        type:String
    }],
    category:[{
        type:String,
        default:'bridalAccessories',
        enums:['bridalAccessories']
    }],
    colour:[{
        type:String,
        enums:['Yellow', 'red', 'pink', 'orange', 'green', 'blue', 'gold', 'silver', 'purple', 'white']
    }],
    ratings:Number
},{
timestamps:true
});

module.exports = mongoose.model('products', products);