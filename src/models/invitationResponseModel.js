const mongoose = require('mongoose')

const invitationResponse = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:Number,
    },
    message:{
        type:String,
    }
},{
    timestamps: true,
  })

module.exports = mongoose.model("invitationResponse" , invitationResponse);