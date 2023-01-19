const mongoose = require('mongoose');

const guest = mongoose.Schema({
    eventid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: eventModel,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    numberOfPeople:{
        type:Number,
        required:true,
    },
    namesOfPeople:[{
        type:String,
   }],

   travelItinerary:{
        type:String,
   },
   photoId:{
        type:String,
   },
   driver:{
        type:Boolean,
   },
   driverStay:{
        type:Boolean,
   }
});
// number of people , names of people , your travel itenary along with tickets , photoIds , driver accompanying stay req?
module.exports = mongoose.model('guest', guest);
