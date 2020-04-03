  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    event: [{
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

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;