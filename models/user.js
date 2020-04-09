  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  parentName: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
  },
  schedule: [{
    title: {
        type: String,
        required: true,
      },
    startDate: {
        type: String,
        required: true,
      },
    endDate: {
        type: String,
        required: true,
      }
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;