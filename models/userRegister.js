const mongoose = require("mongoose");


const UserRegistorSchema = new mongoose.Schema({
  profileUrl: {
    type: String,
  },
  ScreenName: {
    type: String,
    minlength: [5, "Name cannot be less than 5 characters"],
  },
  address: {
    type: String,
    minlength: [5, "address cannot be less than 5 characters"],
  },
  country: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  neigborhood: {
    type: String,
    minlength: [5, "neigborhood cannot be less than 5 characters"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  individual: {
    type: Object,
  },
  company: {
    type: Object,
  },
  verifyDoc: [{
    type: Object,
  }],
  identityFileUrl: [{
    type: String,
  }],
  addressFileUrl: [{
    type: String,
  }],
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Services",
  }],
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
  },
});


module.exports = mongoose.model("UserRegistor", UserRegistorSchema);

