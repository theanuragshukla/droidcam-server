const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  uid: String,
  created: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
  fname: String,
  lname: String,
  email: String,
  password: String,
  username: String,
});

const tokenSchema = new mongoose.Schema({
  user: String,
  access: String,
  refresh: String,
});
var imageSchema = new mongoose.Schema({
  uid: String,
  img: {
    data: String,
    contentType: String,
  },
});

var storageSchema = new mongoose.Schema({
  uid: String,
  imgs: {
    type: [String],
    validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
  },
  ttlImgs: {
    type: Number,
    default: 0,
  },
});
function arrayLimit(val) {
  return val.length <= 10;
}

module.exports = {
  userSchema: new mongoose.model("user", userSchema, "auth-users"),
  tokenSchema: new mongoose.model("seed", tokenSchema, "auth-seeds"),
  imageSchema: new mongoose.model("image", imageSchema, "tempImages"),
  storageSchema: new mongoose.model("storage", storageSchema, "storage"),
};
