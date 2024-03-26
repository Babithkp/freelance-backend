const mongoose = require("mongoose");



 const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minlength:[5,"Full name cannot be less than 5 characters"]
    },
    email: {
        type: String,
        minlength:[5,"email cannot be less than 5 characters"]
    },
    password:{
        type: String,
        minlength:[5,"password cannot be less than 5 characters"]
    },
    token:{
        type: String,
        default: "20",
    }
})

module.exports = mongoose.model("User", UserSchema);