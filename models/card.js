const mongoose = require("mongoose");


 const UserSchema = new mongoose.Schema({
    cardNumber: {
        type: Number,
        minlength:[16,"Full name cannot be less than 5 characters"]
    },
    type: {
        type: String,
        required: true
    },
    expeiry:{
        type: String,
        required: true
    },
    cvc:{
        type: Number,
        minlength:[3,"Full cvc cannot be less than 3 characters"]
    },
    address:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Card", UserSchema);