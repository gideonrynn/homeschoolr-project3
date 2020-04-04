  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  schedule: [{
    title: {
        type: String,
        required: true,
      },
    startDate: {
        type: Date,
        required: true,
      },
    endDate: {
        type: Date,
        required: true,
      },
    id: {
        type: Number,
        required: true,
      },
    location: {
        type: String,
        required: true,
      },
  }]
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;