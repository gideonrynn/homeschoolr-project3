  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
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
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;