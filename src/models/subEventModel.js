const mongoose = require('mongoose');
const eventModel = require('./eventModel')

const subEvent = mongoose.Schema({
    eventid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: eventModel,
    },
    card:{
        type:String,
    },
    pics:[{
        type:String,
    }],
    desc:{
        type:String,
    },
    title:{
        type:String,
    },
    eventDate:{
        type:String,
    },
});
module.exports = mongoose.model('sub-event', subEvent);
