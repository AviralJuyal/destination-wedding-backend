const mongoose = require('mongoose');
const eventModel = require('./eventModel')

const guest = mongoose.Schema({
    eventid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: eventModel,
    },

    phoneNumber:{
     type:Number
    },

    email:{
        type:String,
     //    required:true,
    },
    numberOfPeople:{
        type:Number,
     //    required:true,
    },
   
   peopleDetails:[{
     name:{
          type:String,
     },
     adhaar:{
          videoUrl:{
               type:String
          }
     }
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
   },
   rsvp:{
     default:false,
     type:Boolean
   },


   numberOfChildren:{
     type:Number,
   },
   numberOfAdult:{
     type:Number,
   },
   travelPlan:{
     type:String,
   },
   pickupReq:{
     type:Boolean,
   },
   driverNumber:{
     type:Number,
   },
   driverName:{
    type:String,
   },
   arrival:{
    type:String,
   },
   departure:{
    type:String,
   }

});

// driverName , arrival , departure
// numberOfChildren , numberOfAdult , travelPlan , pickupReq , driverNumber 
// number of people , names of people , your travel itenary along with tickets , photoIds , driver accompanying stay req?
module.exports = mongoose.model('guest', guest);
