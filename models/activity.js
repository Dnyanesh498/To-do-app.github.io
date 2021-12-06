//require mongoose
const mongoose = require('mongoose');

//creating Schema for activities
const activitySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }

});

const activity = mongoose.model('activity', activitySchema);

//exporting schema
module.exports = activity;