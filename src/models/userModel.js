const mongoose = require('mongoose');

const user = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    address:[{
        location:String,
        state:String,
        landmark:String,
        city:String,
        pincode:String,
        addressType:{
            type:String,
            enums:['home', "office", "other"]
        }
    }],
    verified:{
        type:Boolean,
    },
    password:{
        type: String,
        required:true,
    },
    userType:{
        type: String,
        default:'user',
        enum:['admin','user']
    }
},{
timestamps:true
});

module.exports = mongoose.model('user', user);