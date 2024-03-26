const mongoose = require("mongoose");

 const ServiceSchema = new mongoose.Schema({
    Title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    rateHr:{
        type: String,
        default:null
    },
    rateWeek:{
        type: String,
        default:null
    },
    thumbnailUrl:{
        type: String,
        default:null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRegistor",
      },
})

module.exports = mongoose.model("Services", ServiceSchema);