const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  id: {
    type: String
  },
  conversation: [
    {
      _id: false,
      username: String,
      message: String
    }
  ]
});

module.exports = Chat = mongoose.model("chat", UserSchema);
