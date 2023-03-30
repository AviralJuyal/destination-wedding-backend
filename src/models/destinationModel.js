const mongoose = require("mongoose");

const destination = mongoose.Schema(
  {
    name: {
      type: String,
    },
    location:{
        type:String,
    },
    description: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    rating:{
        type:String,
    },
    phoneNumber:{
        type:Number,
    },
    website:{
        type:String,
    },
    facilities:{
      type:String,
    },
    reviews:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("destination", destination);

// event organiser , tentative guest , card , graphic , desc , title, event type , enum - marriage , event date
