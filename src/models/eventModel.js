const mongoose = require('mongoose');

const event = mongoose.Schema({
    eventOrganiser:{
        type:String,
        // required:true,
    },
    tentativeGuest:{
        type:Number,
        required:true,
    },
    eventType:{
        type: String,
        default:'marriage',
        enum:['marriage']
    },
    card:{
        type:String,
    },
    graphic:{
        type:String,
    },
    desc:{
        type:String,
    },
    title:{
        type:String,
    },
    eventDate:{
        type:String,
    },
    ourEvent:{
        type:Boolean,
        default:false,
    }

});

module.exports = mongoose.model('event', event);

// event organiser , tentative guest , card , graphic , desc , title, event type , enum - marriage , event date  